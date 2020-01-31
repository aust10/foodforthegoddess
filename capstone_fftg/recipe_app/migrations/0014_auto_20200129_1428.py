# Generated by Django 3.0.2 on 2020-01-29 22:28

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('recipe_app', '0013_auto_20200129_1232'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='favorites',
            field=models.ManyToManyField(blank=True, related_name='favorite', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='Favorite',
        ),
    ]