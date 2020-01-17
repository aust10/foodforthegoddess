from rest_framework import serializers
from recipe_app import models

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields =( 
            'name',
        )

class TechniqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Technique
        fields =(
            'technique_name',
        )

class KeyWordSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.KeyWord
        fields =(
            'keywords',
        )

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Recipe
        fields =(
            'recipe_name',
            'category',
            'technique',
            'key_words',
            'prep_time',
            'body',
        )
