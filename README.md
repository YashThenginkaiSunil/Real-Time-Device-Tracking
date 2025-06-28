🌍 Real-Time Device Tracking:-
This project enables real-time tracking of connected users' geolocations using Socket.IO, HTML5 Geolocation API, and Leaflet.js. It's perfect for building live location dashboards, asset tracking systems, 
or collaborative geo-apps.

🚀 Features:-
📡 Live Location Streaming Uses navigator.geolocation.watchPosition() to monitor the user’s GPS coordinates in real time.
🔄 Bidirectional Communication with Socket.IO Real-time updates are broadcast to all connected clients using WebSockets.
🗺️ Dynamic Map Visualization with Leaflet Users are plotted on an interactive OpenStreetMap-based map with customizable zoom and marker behavior.
❌ User Disconnection Cleanup When a user disconnects, their marker is removed from all clients’ maps instantly.

🛠️ Tech Stack:-
Frontend: HTML, CSS, JavaScript, Leaflet.js
Backend: Node.js, Express, Socket.IO
Other: OpenStreetMap for tiles, Geolocation API for live coordinates

📦 How It Works:-
1.Each connected browser shares its location (after requesting permission).
2.The server receives it and emits it to all other clients.
3.Clients update the map:
       - If the user is new → create a new marker.
       - If the user already exists → update their location.
