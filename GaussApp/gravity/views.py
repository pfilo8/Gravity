from django.shortcuts import render
from django.http import HttpResponse

from .analytics import analytics

from . import models

import json

def api(request):
    companies = models.Company.objects.all()
    data = [{'name': company.name, 'x': company.x, 'y': company.y, 'score': round(analytics.score(company),2)} for company in sorted(companies, key = analytics.score, reverse = True)]
    response = HttpResponse(json.dumps(data), content_type="application/json")
    response["Access-Control-Allow-Origin"] = "*"
    return response

def rcmd(request):
    x = float(request.GET.get('lng', 0))
    y = float(request.GET.get('lat', 0))
    best_nearby_companies = analytics.leaders(x,y)
    data = [{"name":c.name, "avg": c.average_opinion,"opinionsN":c.opinions, "address": c.address, "x":c.x, "y":c.y} for c in best_nearby_companies]
    response = HttpResponse(json.dumps(data), content_type="application/json")
    return response


def index(request):
    return render(request, 'gravity/gravity-field/index.html')
