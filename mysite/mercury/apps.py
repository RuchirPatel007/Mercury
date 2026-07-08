from django.apps import AppConfig

class MercuryConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'mercury'
    def ready(self):
        print("APP READY!")
        import mercury.signals