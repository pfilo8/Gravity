var mymap = L.map('mapid').setView([51.111, 17.034], 16);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
maxZoom: 18,
id: 'mapbox.streets',
accessToken: 'pk.eyJ1IjoidmljcmFjIiwiYSI6ImNqZzAyY3k4aTMzbGYycXFra2pvOWNiaWwifQ.KBHwh1w_jp0C1XJZGRlkOA'
}).addTo(mymap);

var user = 0;

function onMapClick(e) {
    if(user){
        mymap.removeLayer(user);
    }
    user = new L.marker(e.latlng);
    mymap.addLayer(user);
    requrl = "http://localhost:8000/rcmd" + '?' + 'lat=' + e.latlng.lat +  '&' + 'lng=' + e.latlng.lng;
    var req = new XMLHttpRequest();
    req.addEventListener('load', tellUserIfWorthy);
    req.open('GET', requrl);
    req.send();
}

function tellUserIfWorthy(){
    data = JSON.parse(this.responseText);
    console.log("Your needed score is " + data["needed_score"]);
    document.getElementById('score').innerHTML = data["needed_score"];
}

mymap.on('click', onMapClick);


function populateMap(){
    companies = JSON.parse(this.responseText);
    console.log(companies.length);
    minscore = companies[companies.length - 1].score;
    companies.forEach((company)=>{
        var circle = L.circle([company.y, company.x], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: (company.score - minscore + 0.2) * 30,
            className: "gradient"
        }).addTo(mymap).bindPopup("<h1>" + company.name + "</h1>" + '<p>Score: ' + company.score + '</p>');
    })
}


var req = new XMLHttpRequest();
req.addEventListener("load", populateMap);
req.open("GET","http://localhost:8000/api");
req.send();



// var circle = L.circle([51.110, 17.03], {
// color: 'red',
// fillColor: '#f03',
// fillOpacity: 0.5,
// radius: 100
// }).addTo(mymap).bindPopup("I am a circle.");
// circle.bindPopup("I am a circle.");