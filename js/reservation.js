'use strict'

//import Renderer from './renderer';

class ReservationRenderer {
    //class ReservationRenderer extends Renderer {
    endpointUrl = 'http://localhost:8080/api/v1/reservations';

    constructor(data) {
        //super();
        this.data = data;
        this.fetchData();
    }

    updateUI() {
        /*
        for (let dataIndex in this.data) {
            let entry = this.data[dataIndex];
            let imageUrl = (entry.thumbnailUrl ? entry.thumbnailUrl : entry.imageUrl);
            $('#spaceship').append(`<div class="col-4 spaceship" onMouseOver="spaceshipRenderer.setSpaceshipData(${dataIndex}, true)"><img class="spaceship-image rounded-circle" src="../${imageUrl}"><div>${entry.name}</div></div>`);
        }

        $.each(this.data, function () {
            $("#reservation-spaceship").append($("<option />").val(this.id).text(this.name));
        });
        */
    }

    async fetchData() {
        let response = await fetch(this.endpointUrl);
        this.data = await response.json();
        this.updateUI();
    };

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
//export default ReservarionRenderer

var reservationRenderer = new ReservationRenderer();
