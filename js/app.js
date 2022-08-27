'use strict'
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