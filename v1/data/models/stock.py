from django.db import models


class Security(models.Model):
    symbol = models.CharField(max_length=100, unique=True)
    securityName = models.CharField(max_length=100)

    class Meta:
        ordering = ['securityName']

    def __str__(self):
        return f"{self.securityName}"


class SecurityData(models.Model):
    security = models.OneToOneField(Security, on_delete=models.CASCADE)
    lastTradedPrice = models.DecimalField(
        default=0.00, max_digits=10, decimal_places=2)
    openPrice = models.DecimalField(
        default=0.00, max_digits=10, decimal_places=2)
    highPrice = models.DecimalField(
        default=0.00, max_digits=10, decimal_places=2)
    lowPrice = models.DecimalField(
        default=0.00, max_digits=10, decimal_places=2)
    previousClose = models.DecimalField(
        default=0.00, max_digits=10, decimal_places=2)

    class Meta:
        ordering = ['security']

    def __str__(self):
        return f"{self.security.securityName}"
