from django.db import models




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

class Recipe(models.Model):
    recipe_name = models.CharField(max_length=100)
    category = models.ManyToManyField(Category, verbose_name='Category')
    technique = models.ManyToManyField(Technique, verbose_name='Technique')
    key_words = models.ManyToManyField(KeyWord, verbose_name='KeyWord')
    prep_time = models.IntegerField()
    body = models.TextField()

    class Meta:
        verbose_name = 'Recipe'
        verbose_name_plural = 'Recipes'

    def __str__(self):
        return self.recipe_name
    