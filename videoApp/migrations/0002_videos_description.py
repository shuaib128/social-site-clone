# Generated by Django 3.2.9 on 2022-03-04 09:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('videoApp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='videos',
            name='description',
            field=models.TextField(default='Body'),
        ),
    ]
