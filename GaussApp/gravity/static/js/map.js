var mymap = L.map('mapid').setView([51.111, 17.034], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', { attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>', maxZoom: 18, id: 'mapbox.streets', accessToken: 'pk.eyJ1IjoidmljcmFjIiwiYSI6ImNqZzAyY3k4aTMzbGYycXFra2pvOWNiaWwifQ.KBHwh1w_jp0C1XJZGRlkOA' }).addTo(mymap);

var user = 0;
var highlighted = [];

function onMapClick(e) {
    if(user){
        mymap.removeLayer(user);
    }
    user = new L.marker(e.latlng);
    mymap.addLayer(user);
    requrl = `/rcmd?lat=${e.latlng.lat}&lng=${e.latlng.lng}`;
    var req = new XMLHttpRequest();
    req.addEventListener('load', updateSidebar);
    req.open('GET', requrl);
    req.send();
}

function clearChilds(elt){
    while (elt.firstChild) {
        elt.removeChild(elt.firstChild);
    }
}

function clearHighlighted(){
    for(let h of highlighted){
        mymap.removeLayer(h);
    }
    highlighted = [];
}

function highlightOnMap(company){
    let c = L.circle([company.y, company.x], {
        color: 'green',
        fillOpacity: 1,
        radius: 50
    }).addTo(mymap)
    highlighted.push(c);
}


function formatOpinion(company){
    company["reviews"] = `${company.opinionsN}/${company.avg}`;
    return company;
}

function updateSidebar(){
    clearChilds(document.getElementById("leaders"));
    data = JSON.parse(this.responseText);
    clearHighlighted();
    data.map(highlightOnMap);
    data.map(formatOpinion).map(makeLeaderElt).map(appendToLeaders);
}

function makeLeaderElt(company){
    let leaderElt = document.createElement("div");
    leaderElt.className = "leader";
    for (let attr of ["name", "reviews","address"]) {
        let p = document.createElement("p");
        p.className = attr;
        p.appendChild(document.createTextNode(company[attr]));
        leaderElt.appendChild(p)
    }
    return leaderElt;

}

function appendToLeaders(companyElt){
    document.getElementById('leaders').appendChild(companyElt);
}



function populateMap(){
    companies = JSON.parse(this.responseText);
    console.log(companies.length);
    minscore = companies[companies.length - 1].score;
    companies.forEach((company)=>{
        var circle = L.circle([company.y, company.x], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 1,
            radius: (company.score - minscore + 0.2) * 12
        }).addTo(mymap).bindPopup("<h1>" + company.name + "</h1>" + '<p>Score: ' + company.score + '</p>');
    })
}

mymap.on('click', onMapClick);
var req = new XMLHttpRequest();
req.addEventListener("load", populateMap);
req.open("GET","/api");
req.send();

