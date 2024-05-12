from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin  # commit 5a59e13


@admin.register(get_user_model())
class UserAdmin(BaseUserAdmin):
    fieldsets = (
        ('Account Information', {
            'fields': (
                ('username', 'email', 'password',),
            )
        },),
        (('Personal Information'), {
            'fields': (
                ('firstname', 'lastname', 'avatar',),
            )
        },),
        (('Permissions'), {
            'fields': (
                ('is_active', 'is_staff', 'is_verified', 'is_superuser',),
                'groups',
                'user_permissions',
            ),
            'classes': ('collapse',)
        },),
        (('Important Dates'), {
            'fields': (
                ('date_joined', 'last_login',),
            ),
            'classes': ('collapse',)
        },),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'firstname', 'lastname', 'password1', 'password2',),
        },),
    )

    list_display = ('username', 'firstname', 'lastname', 'email',)
    ordering = ('username',)
    search_fields = ('username',)
    readonly_fields = ('date_joined', 'last_login',)
