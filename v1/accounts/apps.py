from django.apps import AppConfig


class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'v1.accounts'

    def ready(self) -> None:
        import v1.accounts.signals
