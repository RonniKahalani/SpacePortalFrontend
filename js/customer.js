'use strict'

class CustomerRenderer {
    endpointUrl = 'http://localhost:8080/api/v1/customers';

    /**
     * Constructor
     */
    constructor(data) {
        this.data = data;
        this.fetchData();
    }

    /**
     * Fetches Json from REST service endpoint url.
     */
    async fetchData() {
        let response = await fetch(this.endpointUrl);
        this.data = await response.json();
        this.updateUI();
        indexedStorage.setData(IDB_STORE_CUSTOMERS, this.data);
    };

    /**
     * Updates related UI components
     */
    updateUI() {
        let customerDropdown = $("#reservation-customer");
        this.data.forEach(element => {
            customerDropdown.append($("<option />").val(element.id).text(element.firstName + " " + element.lastName));

        });
    }

    /**
     * Finds a customer bi id.
     * @param {*} id 
     * @returns customer
     */
        getById(id) {
            let result = this.data.filter(obj => {
                return obj.id === id
            });
    
            return result[0];
        }
}
var customerRenderer = new CustomerRenderer();
