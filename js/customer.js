'use strict'
/**
 * Handles the Customer UI
 */
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
        try {
            let response = await fetch(this.endpointUrl);
            this.data = await response.json();
        
            // Cool, we got the data, let's save it in local storage.
            indexedStorage.setData(IDB_STORE_CUSTOMERS, this.data);
            // Lets update the page.
            this.updateUI();

        } catch(error) {
            // Could not connect, try using the last data, we saved last time we were connected to remote endpoint.
            console.log(`Failed getting data from remote endpoint ${this.endpointUrl}, reading from local storage data.`);
            indexedStorage.getAllCustomers((result) => this.updateFromStorage(result));    
        }
    };

    /**
     * Callback function for returning the local storage data version.
     * @param {*} data 
     */
         updateFromStorage(data) {
            this.data = data;
            this.updateUI();
        }
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
