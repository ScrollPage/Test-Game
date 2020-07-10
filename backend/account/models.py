from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import PermissionsMixin
from django.core.mail import send_mail
from account.help_funcs import generate_token

class MyAccountManager(BaseUserManager):

    def create_user(self, username,  email, first_name, password = None):
        user = self.model(
            username = username,
            email = self.normalize_email(email),
            first_name = first_name.capitalize(),
        )

        user.is_active = True
        user.set_password(password)
        user.save(using = self._db)

        return user

    def create_superuser(self, username, email, first_name, password = None):
        user = self.create_user(
            username = username,
            email = self.normalize_email(email),
            password = password,
            first_name = first_name,
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True

        user.save(using = self._db)

        return user



class Account(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(verbose_name = 'username', max_length = 20, unique = True)
    email = models.EmailField(verbose_name = 'email', max_length = 60)
    first_name = models.CharField(max_length = 30, default = '')
    date_joined = models.DateTimeField(verbose_name = 'date joined', auto_now_add = True)
    last_login = models.DateTimeField(verbose_name = 'last_login', auto_now = True)
    is_admin = models.BooleanField(default = False)
    is_staff = models.BooleanField(default = False)
    is_superuser = models.BooleanField(default = False)
    avatar = models.ImageField(upload_to='user_avatars/%Y/%m/%d', blank=True)
    is_active = models.BooleanField(default = False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email','first_name',]

    objects = MyAccountManager()

    def __str__(self):
        return self.username

    def get_url(self):
        try:
            return self.avatar.url
        except ValueError:
            return None

class MyToken(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, default = None)
    token = models.CharField(max_length = 100, default = '')
    created = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return self.token


@receiver(post_save, sender = settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance = None, created = False, **kwargs):
    if created:
        if instance.is_superuser is False:
            m = MyToken.objects.create(user = instance)
            m.token = generate_token(instance.first_name)
            send_mail(
                "Подтверждение регистрации",
                f"Перейдите по ссылке, чтобы завершить регистрацию: {settings.DJANGO_DOMEN}/account/authorization_confirm/{m.token}",
                settings.EMAIL_HOST_USER, 
                [instance.email,], 
                fail_silently=False
            )
            m.save()
        Token.objects.create(user = instance)