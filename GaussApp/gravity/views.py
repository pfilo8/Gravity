from django.shortcuts import render
from django.http import HttpResponse

from .analytics import analytics

from . import models

import json

def api(request):
    companies = models.Company.objects.all()
    data = [{'name': company.name, 'x': company.x, 'y': company.y, 'score': analytics.score(company)} for company in sorted(companies, key = analytics.score, reverse = True)]
    response = HttpResponse(json.dumps(data), content_type="application/json")
    response["Access-Control-Allow-Origin"] = "*"
    return response


def index(request):
    return render(request, 'gravity/gravity-field/index.html')
