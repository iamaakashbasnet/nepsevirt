from django.contrib import admin
from django.contrib.auth import get_user_model


class UserAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Account Information', {
            'fields': (
                ('email', 'username', 'password',),
            )
        },),
        (('Personal Information'), {
            'fields': (
                ('avatar', 'firstname', 'lastname',),
            )
        },),
        (('Permissions'), {
            'fields': (
                ('is_active', 'is_staff', 'is_admin', 'is_superuser',),
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
            'fields': ('email', 'username', 'firstname', 'lastname', 'password1', 'password2',),
        },),
    )

    readonly_fields = ('date_joined', 'last_login',)
    search_fields = ('username',)
    ordering = ('username',)


admin.site.register(get_user_model(), UserAdmin)
