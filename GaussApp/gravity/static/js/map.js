var mymap = L.map('mapid').setView([51.110, 17.03], 16);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
maxZoom: 18,
id: 'mapbox.streets',
accessToken: 'pk.eyJ1IjoidmljcmFjIiwiYSI6ImNqZzAyY3k4aTMzbGYycXFra2pvOWNiaWwifQ.KBHwh1w_jp0C1XJZGRlkOA'
}).addTo(mymap);


function populateMap(){
    companies = JSON.parse(this.responseText);
    console.log(companies.length);
    companies.forEach((company)=>{
        var circle = L.circle([company.y, company.x], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: company.score * 10
        }).addTo(mymap).bindPopup(company.name);
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