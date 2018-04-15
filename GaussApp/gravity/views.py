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
    needed_score = analytics.calculate_required_average_opinion(x,y,0.0004, 100)
    if needed_score > 5:
        needed_score = 5
    data = {'needed_score': round(needed_score,2)}
    response = HttpResponse(json.dumps(data), content_type="application/json")
    response["Access-Control-Allow-Origin"] = "*"
    return response


def index(request):
    return render(request, 'gravity/gravity-field/index.html')
