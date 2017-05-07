"""typonaut URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
import myapp.views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', myapp.views.home),
    url(r'^game/$', myapp.views.game),
<<<<<<< HEAD
    url(r'^getquote/$', myapp.views.getQuote),
    url(r'^submit/$', myapp.views.submit),
=======
    url(r'^game/getquote/$', myapp.views.getQuote),
    url(r'^game/submit/$', myapp.views.submit),
    url(r'^highscores/$', myapp.views.highscores),
>>>>>>> 41cd820ce2d29db093b19a76135f35566a5f4b92
]
