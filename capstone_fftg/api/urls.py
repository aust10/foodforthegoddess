from django.urls import include, path

from .views import CategoryViewSet, TechniqueViewSet, KeyWordViewSet, RecipeViewSet, IngredientsViewSet
# FavoriteViewSet
from rest_framework.routers import DefaultRouter
# from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
from . import views

router = DefaultRouter()
router.register('categories', CategoryViewSet, basename='categories')
router.register('techniques', TechniqueViewSet, basename='techniques')
router.register('keywords', KeyWordViewSet, basename='keywords')
router.register('ingredients', IngredientsViewSet, basename='ingredients')
router.register('recipes', RecipeViewSet, basename='recipes')
router.register('users', views.UserViewSet, basename='users')
urlpatterns = router.urls
# router.register('favorite', FavoriteViewSet,
# basename='favorite')

urlpatterns = [
    path('',include(router.urls)),
    
    
]

# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# urlpatterns += [
#     path('')
# ]
