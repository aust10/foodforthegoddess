from django.urls import include, path

from .views import CategoryViewSet, TechniqueViewSet, KeyWordViewSet, RecipeViewSet, IngredientsViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='categories')
router.register('techniques', TechniqueViewSet, basename='techniques')
router.register('keywords', KeyWordViewSet, basename='keywords')
router.register('ingredients', IngredientsViewSet, basename='ingredients')
router.register('recipes', RecipeViewSet, basename='recipes')

urlpatterns = [
    path('',include(router.urls))
    
]
