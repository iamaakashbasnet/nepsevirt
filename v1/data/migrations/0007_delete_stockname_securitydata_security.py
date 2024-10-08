# Generated by Django 4.2.3 on 2024-06-24 06:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("data", "0006_security_securitydata_delete_stockdata"),
        ("portfolio", "0010_alter_portfolio_stocks_alter_position_stock"),
    ]

    operations = [
        migrations.DeleteModel(
            name="StockName",
        ),
        migrations.AddField(
            model_name="securitydata",
            name="security",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE, to="data.security"
            ),
        ),
    ]
