'use strict'

class SpaceshipRenderer {
    endpointUrl = 'http://localhost:8080/api/v1/spaceships';

    constructor(data) {
        this.data = data;
        this.fetchData();
    }

    async fetchData() {
        try {
            let response = await fetch(this.endpointUrl);
            this.data = await response.json();
        
            // Cool, we got the data, let's save it in local storage.
            indexedStorage.setData(IDB_STORE_SPACESHIPS, this.data);
            // Lets update the page and set a default spaceship.
            this.updateUI();
            this.setSpaceshipData(0, false, false);

        } catch(error) {
            // Could not connect, try using the last data, we saved last time we were connected to remote endpoint.
            console.log(`Failed getting data from remote endpoint ${this.endpointUrl}, reading from local storage data.`);
            indexedStorage.getAllSpaceships((result) => this.updateFromStorage(result));    
        }
    }

    /**
     * Callback function for returning the local storage data version.
     * @param {*} data 
     */
     updateFromStorage(data) {
        this.data = data;
        this.updateUI();
        this.setPlanetData(3);
    }
    
    updateUI() {
        for (let dataIndex in this.data) {
            let entry = this.data[dataIndex];
            let imageUrl = (entry.thumbnailUrl ? entry.thumbnailUrl : entry.imageUrl);
            $('#spaceship').append(`<div class="col-4 spaceship" onMouseOver="spaceshipRenderer.setSpaceshipData(${dataIndex}, true)"><img class="spaceship-image rounded-circle" src="../${imageUrl}"><div>${entry.name}</div></div>`);
        }

        let spaceshipDropdown = $("#reservation-spaceship");
        this.data.forEach(element => {
            spaceshipDropdown.append($("<option />").val(element.id).text(element.name));
        });

        reservationRenderer.setSpaceshipImage(this.data[0].imageUrl);
    }

    getById(id) {
        let result = this.data.filter(obj => {
            return obj.id === id
        });

        return result[0];
    }

    setSpaceshipData(index, imageToo = false, show = true) {
        let entry = this.data[index];
        $("#spaceship-name").text(entry.name);
        $("#spaceship-max-passengers").text(entry.maxPassengers);
        $("#spaceship-max-speed").text(entry.maxSpeed);
        $("#spaceship-max-load").text(entry.maxLoad);
        $("#spaceship-builddate").text(new Date(entry.buildDate).toLocaleDateString());

        if (imageToo) {
            $("#top-notes").text(entry.notes);
            $("body").css('background-image', 'url(../' + entry.imageUrl + ')');
            $("body").css('background-repeat', 'no-repeat');
        }
        if (show) {
            $("#spaceship-data").fadeIn();
        }
    }
}
var spaceshipRenderer = new SpaceshipRenderer();
