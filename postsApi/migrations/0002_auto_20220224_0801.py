# Generated by Django 3.2.9 on 2022-02-24 02:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('postsApi', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='cat', max_length=1000)),
            ],
        ),
        migrations.AddField(
            model_name='post',
            name='post_category',
            field=models.ManyToManyField(blank=True, null=True, related_name='Category', to='postsApi.Category'),
        ),
    ]
