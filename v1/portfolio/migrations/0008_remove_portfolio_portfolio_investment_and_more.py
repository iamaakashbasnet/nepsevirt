# Generated by Django 4.2.3 on 2023-12-07 13:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0007_portfolio_portfolio_investment'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='portfolio',
            name='portfolio_investment',
        ),
        migrations.RemoveField(
            model_name='portfolio',
            name='portfolio_worth',
        ),
    ]
