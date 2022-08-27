'use strict'

class ReservationRenderer {
    endpointUrl = 'http://localhost:8080/api/v1/reservations';

    constructor(data) {
        this.data = data;
        this.fetchData();
    }

    async fetchData() {
        let response = await fetch(this.endpointUrl);
        this.data = await response.json();
        this.updateUI();
    };

    updateUI() {}

    setPlanetImage(imageUrl) {
        $('#reservation-planet-image').prop('src', "../" + imageUrl);
    }

    setPlanet(id) {

        let entry = planetRenderer.getById(parseInt(id));
        this.setPlanetImage(entry.imageUrl);
        $('#reservation-planet-notes').text(entry.notes);
    }

    setSpaceshipImage(imageUrl) {
        $('#reservation-spaceship-image').prop('src', "../" + imageUrl);
    }

    setSpaceship(id) {
        let entry = spaceshipRenderer.getById(parseInt(id));
        this.setSpaceshipImage(entry.imageUrl);
        $('#reservation-spaceship-notes').text(entry.notes);
    }
}
var reservationRenderer = new ReservationRenderer();
