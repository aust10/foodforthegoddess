from django.shortcuts import render
from rest_framework import viewsets

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from recipe_app.models import Category, Technique, KeyWord, Recipe, Ingredients
from .serializers import CategorySerializer, TechniqueSerializer, KeyWordSerializer, RecipeSerializer, IngredientsSerializer

class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self,request):
        content = {'message': 'Hello,World!'}
        return Response(content)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class TechniqueViewSet(viewsets.ModelViewSet):
    queryset = Technique.objects.all()
    serializer_class = TechniqueSerializer

class KeyWordViewSet(viewsets.ModelViewSet):
    queryset = KeyWord.objects.all()
    serializer_class = KeyWordSerializer

class IngredientsViewSet(viewsets.ModelViewSet):
    queryset = Ingredients.objects.all()
    serializer_class = IngredientsSerializer

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer



# Create your views here.
