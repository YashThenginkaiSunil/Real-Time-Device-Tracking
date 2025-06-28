const socket = io()

if(navigator.geolocation)
{
    navigator.geolocation.watchPosition(
        (position)=>
            {
                const { latitude, longitude} = position.coords
                socket.emit('client-to-server',{latitude, longitude})
            }, 
        (err)=>
            {
                console.log(err);
            },
        {
        enableHighAccuracy:true,
        timeout: 5000, // every 5 sec it will check the location
        maximumAge: 0, // no caching
        })
}

//                      ([latitude, longitude], zoom)
const map = L.map("map").setView([0,0],10)

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{ attribution: "Yash Thenginkai Sunil"}).addTo(map)

const markers ={}

socket.on('server-to-clients', (data)=>{
    const {id, longitude, latitude }= data
    map.setView([latitude, longitude],20)

    // if 'id' key exists in 'marker' object , set Latitude and Longitude
    if(markers[id])
    {
        markers[id].setLatLng([latitude,longitude])
    }
    else // if 'id' key doesn't exists in 'marker' object 
    {
        markers[id]= L.marker([latitude,longitude]).addTo(map)
    }
})

socket.on("user-disconnected", (id)=>{
    if(markers[id])
    {
        map.removeLayer(markers[id])
        delete markers[id] // delete 'id' key n valur from marker object
    }
})
