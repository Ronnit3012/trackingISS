// Tracking International Space Station

// Making Maps & Tiles
const mymap = L.map('issMap').setView([0, 0], 1);  // L means leaflet  // this will set the intial view as at lat=0, long=0 and vision at 1 (which is maximum)
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';  // to add tiles to our map
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';  // this will the actual map on our screen

const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

// Making a marker with a custom icon
const issIcon = L.icon({   // changing the marker icon
    iconUrl: 'ISS.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});

const marker = L.marker([0, 0], {icon: issIcon}).addTo(mymap);   // creating a marker

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';   // Using an api to track ISS which will give lat and long to us

async function getISS() {    // this function will fetch data from the api link and move the marker accordingly
    const response = await fetch(api_url);
    const data = await response.json();
    const { latitude, longitude } = data;   // storing lat and long from the api to a variable data
    // console.log(data);

    // L.marker({ latitude, longitude }).addTo(mymap);
    marker.setLatLng([latitude,longitude]);   // updating marker to a new latitude and longitude

    document.getElementById('lat').textContent = latitude;   // this updates latitude on the screen
    document.getElementById('long').textContent = longitude;   // this updates the longitude on the screen
}

setInterval(() => {    // This will call the function without stopiing hence the location will be uodated after every one sec
    getISS();
}, 1000);