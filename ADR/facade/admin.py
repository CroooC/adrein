from django.contrib import admin
from facade.models import Game, Functionality, App, Multi_Player

class GameAdmin(admin.ModelAdmin):
    game_display = ('name', 'genre', 'active')

class MultiAdmin(admin.ModelAdmin):
    multi_display = ('name', 'genre', 'active')

class FunctionalityAdmin(admin.ModelAdmin):
    functionality_display = ('name', 'active')

class AppAdmin(admin.ModelAdmin):
    app_display = ('name', 'active')

admin.site.register(Game, GameAdmin)
admin.site.register(Multi_Player, MultiAdmin)
admin.site.register(Functionality, FunctionalityAdmin)
admin.site.register(App, AppAdmin)
