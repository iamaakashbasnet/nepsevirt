# Generated by Django 4.2.3 on 2023-12-07 11:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0006_portfolio_portfolio_worth'),
    ]

    operations = [
        migrations.AddField(
            model_name='portfolio',
            name='portfolio_investment',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=15),
        ),
    ]
