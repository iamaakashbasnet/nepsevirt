from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Portfolio


@receiver(post_save, sender=get_user_model())
def create_portfolio(sender, instance, created, **kwargs):
    if created:
        Portfolio.objects.create(user=instance)
