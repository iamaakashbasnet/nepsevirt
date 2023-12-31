from django.apps import AppConfig


class PortfolioConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'v1.portfolio'

    def ready(self) -> None:
        import v1.portfolio.signals
