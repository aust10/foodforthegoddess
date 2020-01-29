# Generated by Django 3.0.2 on 2020-01-27 22:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe_app', '0007_recipe_picture'),
    ]

    operations = [
        migrations.CreateModel(
            name='Favorite',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('favorite', models.TextField()),
            ],
            options={
                'verbose_name': 'Favorite',
            },
        ),
        migrations.AddField(
            model_name='recipe',
            name='favorite_recipes',
            field=models.ManyToManyField(to='recipe_app.Favorite', verbose_name='Favorite'),
        ),
    ]
