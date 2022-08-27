'use strict'

//import Renderer from './renderer';

class PlanetRenderer {
    //class PlanetRenderer extends Renderer {
    endpointUrl = 'http://localhost:8080/api/v1/planets';

    constructor(data) {
        //super();
        this.data = data;
        this.fetchData();
    }

    getById(id) {
       let result = this.data.filter(obj => {
            return obj.id === id
        });
        
        return result[0];
    }

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

    async fetchData() {
        let response = await fetch(this.endpointUrl);
        this.data = await response.json();
        this.updateUI();
        this.setPlanetData(3);
  };

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
//export default PlanetRenderer

var planetRenderer = new PlanetRenderer();
