'use strict'
//import SpaceXLaunchRenderer from "./spacex";
//import ApodRenderer from "./apod";
//import PlanetRenderer from "./planet";

var userId = 'Ronni';

class TabRenderer {
    constructor() {
        
    }

    showTab(tabClass, id) {

        $(`.${tabClass}`).hide();
        $('#' + id).fadeIn();
    }
}

var tabRenderer = new TabRenderer();