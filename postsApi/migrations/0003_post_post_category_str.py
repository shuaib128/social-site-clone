# Generated by Django 3.2.9 on 2022-02-24 04:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('postsApi', '0002_auto_20220224_0801'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='post_category_str',
            field=models.CharField(default='Post Title', max_length=1000),
        ),
    ]