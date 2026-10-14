from django.contrib import admin

from .models import Property


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ("slug", "title", "purpose", "neighbourhood", "price", "availability")
    list_filter = ("purpose", "neighbourhood", "availability")
    search_fields = ("slug", "title", "description")
    prepopulated_fields = {"slug": ("title",)}
