from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name
    
class Technique(models.Model):
    technique_name = models.CharField(max_length=150)

    class Meta:
        verbose_name = 'Technique'
        verbose_name_plural = 'Techniques'

    def __str__(self):
        return self.technique_name

class KeyWord(models.Model):
    keywords = models.CharField(max_length=100)

    class Meta:
        verbose_name = 'KeyWord'
        verbose_name_plural = 'KeyWords'

    def __str__(self):
        return self.keywords  

class Ingredients(models.Model):
    ingredients = models.CharField(max_length=200)

    class Meta:
        verbose_name = 'Ingredients'
        
    def __str__(self):
        return self.ingredients



    
class Recipe(models.Model):
    recipe_name = models.CharField(max_length=100)
    category = models.ManyToManyField(Category, verbose_name='Category')
    technique = models.ManyToManyField(Technique, verbose_name='Technique')
    keywords = models.ManyToManyField(KeyWord, verbose_name='KeyWord')
    ingredients = models.ManyToManyField('Ingredients', verbose_name='Ingredients')
    prep_time = models.IntegerField()
    body = models.TextField()
    picture = models.ImageField(upload_to='images/')
    

    class Meta:
        verbose_name = 'Recipe'
        verbose_name_plural = 'Recipes'

    def __str__(self):
        return self.recipe_name

class Favorite(models.Model):
    favorite_recipes = models.ManyToManyField(Recipe)
    current_user = models.ForeignKey(User, related_name='owner', on_delete=models.CASCADE)

    class Meta:
        verbose_name ='Favorite'

    @classmethod
    def favorite(cls, current_user, new_favorite):
        favorite, created = cls.objects.get_or_create(
            current_user = current_user
        )
        favorite.favorite_recipes.add(new_favorite)

    @classmethod
    def unfavorite(cls, current_user, new_favorite):
        favorite, created = cls.objects.get_or_create(
            current_user = current_user
        )
        favorite.favorite_recipes.remove(new_favorite)



    def __str__(self):
        return str(self.favorite_recipes)


    # @classmethod
    # def unfavorite(cls, current_user, cancle_favorite):
    #     cancle_favorite.favorite_recipes.remove(current_user)
    