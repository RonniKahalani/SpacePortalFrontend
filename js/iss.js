'use strict'
/**
 * Handles the ISS UI
 */
class ISSRenderer {
    endpointUrl = 'https://api.wheretheiss.at/v1/satellites/25544';

    constructor(data) {
        this.data = data;
        this.fetchData();
        setInterval(this.doAutoFetch, 500)
    }

    /**
     * Fetches Json from REST service endpoint url.
     */
    async fetchData() {
        let response = await fetch(this.endpointUrl);
        this.data = await response.json();
        this.updateUI();
    };

    /**
     * Updates related UI components
     */
    updateUI() {
        $('#iss').append(`<div class="col iss"></div>`);
        $("#iss-latitude").text(this.data.latitude);
        $("#iss-longitude").text(this.data.longitude);
        $("#iss-altitude").text(this.data.altitude);
        $("#iss-velocity").text(this.data.velocity);
        $("#iss-visibility").text(this.data.visibility);
        $("#iss-visibility").text(this.data.visibility);
        $("#iss-footprint").text(this.data.footprint);
        $("#iss-daynum").text(this.data.daynum);
        $("#iss-solar-lon").text(this.data.solar_lon);
        $("#iss-solar-lat").text(this.data.solar_lat);
        $("#iss-units").text(this.data.units);
    }

    /**
     * Shows the ISS position on a Google Map
     */
    showMap() {
        let url = `https://www.google.com/maps/@?api=1&map_action=map&center=${this.data.latitude},${this.data.longitude}&zoom=0&basemap=satellite&embedded=true`;
        window.open(url,'_blank');
    }

    /**
     * Used when auto fetch is active
     */
    doAutoFetch() {
        if ($('#iss-autofetch').prop('checked')) {
            issRenderer.fetchData();
        }
    }
}
var issRenderer = new ISSRenderer();