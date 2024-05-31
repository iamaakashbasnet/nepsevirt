from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Fund, ProfitLoss


@receiver(post_save, sender=get_user_model())
def create_portfolio(sender, instance, created, **kwargs):
    if created:
        Fund.objects.create(user=instance)
        ProfitLoss.objects.create(user=instance)
