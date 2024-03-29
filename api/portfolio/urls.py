from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
# router.register(r'users', views.UserViewSet)
router.register(r'education', views.EducationViewSet)
router.register(r'work', views.WorkViewSet)
router.register(r'portfolio', views.PortfolioViewSet)
router.register(r'bio', views.BioViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
]

urlpatterns += router.urls
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)