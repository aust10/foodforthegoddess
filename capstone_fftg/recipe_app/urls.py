from django.urls import path
from django.views.generic import TemplateView

from . import views

app_name = 'recipe_app'
urlpatterns = [
    path('',TemplateView.as_view(template_name="recipe.html"),
    name="recipe"),
]
