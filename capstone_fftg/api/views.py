from django.shortcuts import render
from rest_framework import viewsets

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters

from recipe_app.models import Category, Technique, KeyWord, Recipe, Ingredients
# Favorite
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated

from .serializers import CategorySerializer, TechniqueSerializer, KeyWordSerializer, RecipeSerializer, IngredientsSerializer, UserSerializer
# FavoriteSerializer

class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self,request):
        content = {'message': 'Hello,World!'}
        return Response(content)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

class TechniqueViewSet(viewsets.ModelViewSet):
    queryset = Technique.objects.all()
    serializer_class = TechniqueSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['technique_name']


class KeyWordViewSet(viewsets.ModelViewSet):
    queryset = KeyWord.objects.all()
    serializer_class = KeyWordSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['keywords']

class IngredientsViewSet(viewsets.ModelViewSet):
    queryset = Ingredients.objects.all()
    serializer_class = IngredientsSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['ingredients']

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['ingredients__ingredients', 'technique__technique_name','category__name', 'keywords__keywords']


def post(self, request):
    form = self.form_class(request.POST)

    if form.is_valid():

        user = form.save(commit=False)
        username = form.cleaned_data['username']
        password = form.cleaned_data['password']
        user.set_password(password)
        user.save()    
        return render(request, self.template_name, {'form': form})


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
# class FavoriteViewSet(viewsets.ModelViewSet):
#     queryset = Favorite.objects.all()
#     serializer_class = FavoriteSerializer
    
    
# def change_favorite(request, instruction, pk):
#     favorite= Favorite.objects.get(pk=pk)
#     if instruction = 'favorite':
#         Favorite.favorite(register.favorite, favorite)



# Create your views here.
