from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from vent import models


class Test(APIView):
    def get(self, request):
        return Response("Hello, world!")
