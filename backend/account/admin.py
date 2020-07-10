from django.contrib import admin
from account.models import Account

@admin.register(Account)
class ProductAdmin(admin.ModelAdmin):
	list_display = ('username', 'email', 'first_name', 'date_joined', 'last_login', 'is_admin')