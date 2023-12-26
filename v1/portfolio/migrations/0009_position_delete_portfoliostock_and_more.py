# Generated by Django 4.2.3 on 2023-12-26 08:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('data', '0005_alter_stockname_options'),
        ('portfolio', '0008_remove_portfolio_portfolio_investment_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Position',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('side', models.CharField(choices=[('LONG', 'Long'), ('SHORT', 'Short')], default='LONG', max_length=5)),
                ('quantity', models.PositiveIntegerField(default=0)),
                ('average_fill_price', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('portfolio', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='portfolio.portfolio')),
                ('stock', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='data.stockname')),
            ],
        ),
        migrations.DeleteModel(
            name='PortfolioStock',
        ),
        migrations.AlterField(
            model_name='portfolio',
            name='stocks',
            field=models.ManyToManyField(through='portfolio.Position', to='data.stockname'),
        ),
    ]
