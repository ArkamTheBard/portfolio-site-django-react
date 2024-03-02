from django.contrib import admin
from .models import Education, Work, Portfolio, Bio

# Register your models here.
admin.site.register(Education)
admin.site.register(Work)
admin.site.register(Portfolio)
admin.site.register(Bio)