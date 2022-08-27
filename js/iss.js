'use strict'

//import Renderer from './renderer';

class ISSRenderer {
    //class ISSRenderer extends Renderer {
    endpointUrl = 'https://api.wheretheiss.at/v1/satellites/25544';

    constructor(data) {
        //super();
        this.data = data;
        this.fetchData();
        setInterval(this.doAutoFetch, 500)
    }

    showMap() {

        let url = `https://www.google.com/maps/@?api=1&map_action=map&center=${this.data.latitude},${this.data.longitude}&zoom=0&basemap=satellite&embedded=true`;
        window.open(url,'_blank');
    }
    doAutoFetch() {
        if ($('#iss-autofetch').prop('checked')) {
            issRenderer.fetchData();
        }
    }

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

    async fetchData() {
        let response = await fetch(this.endpointUrl);
        this.data = await response.json();
        this.updateUI();
    };
}
//export default ISSRenderer

var issRenderer = new ISSRenderer();