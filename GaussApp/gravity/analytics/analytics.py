import math as m
import numpy as np
from .. import models


def score(company):
    return company.average_opinion - 0.98/m.sqrt(company.opinions)


def calculate_radius(score):
    return (company.score - minscore + 0.2) * 30


def get_direction_versor(position, company_position):
    distance = calculate_distance(position, company_position)
    return (company_position - position)/distance


def calculate_distance(vec1, vec2):
    return (sum((vec2 - vec1)**2))**(1/2)


def vector_length(vec):
    return calculate_distance(np.array([0,0]), vec)


def get_company_position(company):
    return np.array([company.x, company.y])

def leaders(x, y, n = 5):
    companies = models.Company.objects.all()
    position = np.array([x,y])
    scores = []
    
    for company in companies:
        company_position = np.array([company.x, company.y])
        score = company.average_opinion*company.opinions/(calculate_distance(position, company_position))
        scores.append((score,company))
    
    scores.sort()
    return [scores[i][1] for i in range(n)]

def calculate_force(position, company):
    company_position = get_company_position(company)
    distance = calculate_distance(position, company_position)
    return score(company)/distance


def calculate_required_force(position, radius):
    companies = models.Company.objects.all()
    max_force = 0
    for company in companies:
        company_position = np.array([company.x, company.y])
        direction_versor = get_direction_versor(position, company_position)
        direction_vector = direction_versor*radius
        test_position = position + direction_vector
        force = calculate_force(test_position, company)
        if force > max_force:
            max_force = force
    return max_force


def calculate_required_score(x, y, radius):
    position = np.array([x, y])
    required_force = calculate_required_force(position, radius)
    return required_force * radius


def calculate_required_average_opinion(x, y, radius, num_opinions):
    required_score = calculate_required_score(x, y, radius)
    return required_score + 0.98/m.sqrt(num_opinions)
