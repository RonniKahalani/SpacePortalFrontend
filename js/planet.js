'use strict'
/**
 * Handles the Planet UI
 */
class PlanetRenderer {
    endpointUrl = 'http://localhost:8080/api/v1/planets';

    /**
     * Constructor
     */
    constructor() {
        this.data = null;
        this.fetchData();
    }

    /**
     * Fetches Json from REST service endpoint url.
     */
    async fetchData() {

        try {
            let response = await fetch(this.endpointUrl);
            this.data = await response.json();

            // Cool, we got the data, let's save it in local storage.
            indexedStorage.setData(IDB_STORE_PLANETS, this.data);
            // Lets update the page and set a default planet.
            this.updateUI();
            this.setPlanetData(3);    

        } catch(error) {
            // Could not connect, try using the last data, we saved last time we were connected to remote endpoint.
            console.log(`Failed getting data from remote endpoint ${this.endpointUrl}, reading from local storage data.`);
            indexedStorage.getAllPlanets((result) => this.updateFromStorage(result));    
        }
    };

    /**
     * Callback function for returning the local storage data version.
     * @param {*} data 
     */
    updateFromStorage(data) {
        this.data = data;
        this.updateUI();
        this.setPlanetData(3);
    }
    
    /**
     * Updates related UI components
     */
    updateUI() {
        for (let dataIndex in this.data) {
            let entry = this.data[dataIndex];
            let imageUrl = (entry.thumbnailUrl ? entry.thumbnailUrl : entry.imageUrl);

            $('#planet').append(`<div class="col-4 planet mb-3" onMouseOver="planetRenderer.setPlanetData(${dataIndex})"><img class="planet-image rounded-circle" src="../${imageUrl}"><div>${entry.name}</div></div>`);
        }

        let planetDropdown = $("#reservation-planet");
        this.data.forEach(element => {

            planetDropdown.append($("<option />").val(element.id).text(element.name));
        });

        reservationRenderer.setPlanetImage(this.data[0].imageUrl);
    }

    getById(id) {
        let result = this.data.filter(obj => {
            return obj.id === id
        });

        return result[0];
    }

    setPlanetData(index) {
        let entry = this.data[index];
        $("#planet-mass").text(entry.mass);
        $("#planet-diameter").text(entry.diameter);
        $("#planet-density").text(entry.density);
        $("#planet-gravity").text(entry.gravity);
        $("#planet-hoursperday").text(entry.hoursPerDay);
        $("#planet-distance").text(entry.distanceFromSun);
        $("#planet-meantemp").text(entry.meanTemp);
        $("#planet-moons").text(entry.moons);
        $("#top-notes").text(entry.notes);
        $("#planet-name").text(entry.name);

        let typeData = '';
        for (let type in entry.types) {

            typeData += (typeData != '' ? ', ' : '') + entry.types[type].name;
        }
        $("#planet-type").text(typeData);
        $("body").css('background-image', 'url(../' + entry.imageUrl + ')');
        $("body").css('background-repeat', 'no-repeat');
        $("#planet-data").show();
    }
}
var planetRenderer = new PlanetRenderer();
