import math as m

def score(company):
    return company.average_opinion - 0.98/m.sqrt(company.opinions)