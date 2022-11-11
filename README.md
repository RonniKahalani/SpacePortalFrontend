# SpacePortalFrontend
This project is the frontend to the [SpacePortalBackend](https://github.com/RonniKahalani/SpacePortalBackend) project.
![Frontend](https://user-images.githubusercontent.com/8819076/186982448-eb34f465-60ae-4706-81d6-263b153c9b6c.png)

## Technologies

HTML/CSS (markup design)
-  [index.html](https://github.com/RonniKahalani/SpacePortalFrontend/blob/master/html/index.html)
-  [main.css](https://github.com/RonniKahalani/SpacePortalFrontend/blob/master/css/main.css)

jQuery / ES6 JavaScript (dynamics design)
-   [app.js](https://github.com/RonniKahalani/SpacePortalFrontend/blob/master/js/app.js)
-   [apod.js](https://github.com/RonniKahalani/SpacePortalFrontend/blob/master/js/apod.js)
-   [spacex.js](https://github.com/RonniKahalani/SpacePortalFrontend/blob/master/js/spacex.js)
-   [spaceship.js](https://github.com/RonniKahalani/SpacePortalFrontend/blob/master/js/spaceship.js)
-   [customer.js](https://github.com/RonniKahalani/SpacePortalFrontend/blob/master/js/customer.js)
-   [planet.js](https://github.com/RonniKahalani/SpacePortalFrontend/blob/master/js/planet.js)
-   [iss.js](https://github.com/RonniKahalani/SpacePortalFrontend/blob/master/js/iss.js)
-   [reservation.js](https://github.com/RonniKahalani/SpacePortalFrontend/blob/master/js/reservation.js)
-   [rest-server.js](https://github.com/RonniKahalani/SpacePortalFrontend/blob/master/js/rest-server.js)

jQuery
- [jquery.js](https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.js)

Bootstrap 5 (UI design)
-  [bootstrap.js](https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.js)
-  [bootstrap.css](https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.css)

Node.js (for websocket medie chat for connected browsers)
-  [server.js](https://github.com/RonniKahalani/SpacePortalFrontend/blob/master/js/server.js)
-  [client.js](https://github.com/RonniKahalani/SpacePortalFrontend/blob/master/js/client.js)

## Purpose
A space portal where you can make a reservation wth a speceship to a planet, at a given time period.
The frontend app fetches:
- [APOD data](https://api.wheretheiss.at/v1/satellites/25544), from NASA REST API 
- [Unofficial SpaceX Launch data](https://api.spacexdata.com/v2/launches), from a REST API
- [ISS - International Space Station data](https://api.wheretheiss.at/v1/satellites/25544), from a REST API
- Customer, planet, spaceship and reservation data, from our own backend.

# Starting the WebSocket chat server
- Open a Terminal window in VS Code.
- Navigate to the /js folder.
- Write "node server.js" and the chat server should be running. 
