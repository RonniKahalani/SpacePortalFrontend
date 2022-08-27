'use strict'

//import Renderer from './renderer';

class CustomerRenderer {
    //class CustomerRenderer extends Renderer {
    endpointUrl = 'http://localhost:8080/api/v1/customers';

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
        let customerDropdown = $("#reservation-customer");
        this.data.forEach(element => {
            customerDropdown.append($("<option />").val(element.id).text(element.firstName + " " + element.lastName));
            
        });
    }

    async fetchData() {
        let response = await fetch(this.endpointUrl);
        this.data = await response.json();
        this.updateUI();
    };
}
//export default CustomerRenderer

var customerRenderer = new CustomerRenderer();
