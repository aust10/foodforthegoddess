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

class IngredientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Ingredients
        fields =(
            'ingredients',
        )

class RecipeSerializer(serializers.ModelSerializer):
    ingredient_info = IngredientsSerializer(many=True, read_only=True, source='ingredients')

    keyword_info = KeyWordSerializer(many=True, read_only=True, source='keywords')

    category_info = CategorySerializer(many=True, read_only=True, source='category')

    technique_info = TechniqueSerializer(many=True,read_only=True, source='technique')

    class Meta:
        model = models.Recipe
        fields =(
            'id',
            'recipe_name',
            'category',
            'category_info',
            'technique',
            'technique_info',
            'keywords',
            'keyword_info',
            'prep_time',
            'ingredients',
            'ingredient_info',
            'body',
        )
        # depth = 1
