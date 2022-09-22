'use strict'

var IDB_DATABASE_NAME = "spaceportal";
var IDB_DATABASE_VERSION = 1;
var IDB_STORE_PLANETS = "planets";
var IDB_STORE_SPACESHIPS = "spaceships";
var IDB_STORE_CUSTOMERS = "customers";
var IDB_INDEX_DEFAULT_ID = "id";

class IndexedStorage {

    constructor() {
        this.data = new Map();
        this.ready = false;
        this.db = null;

        if (!window.indexedDB) {
            console.log(`Your browser doesn't support IndexedDB`);
            return;
        }

        this.request = indexedDB.open(IDB_DATABASE_NAME, IDB_DATABASE_VERSION);

        // Triggered when an upgrade is needed.
        this.request.onupgradeneeded = (event) => {
            this.db = this.request.result;
            this.upgrade();
        };

        // Triggered on errors
        this.request.onerror = (event) => {
            console.error(`Database error: ${event.target.error}`);
        };

        // Triggered when getting the success event. The database is ready.
        this.request.onsuccess = (event) => {
            this.db = event.target.result;
            this.ready = true;
            console.log("Database ready.");

            for (let index in this.data) {
                let value = this.data[index];
                console.log("Index = " + index + " value = " + value);
                this.setData(index, value);
            }
        };
    }

    /**
     * Creates/upgrades the database.
     */
    upgrade() {

        console.log(`Creating/upgrading ${IDB_DATABASE_NAME} database v${IDB_DATABASE_VERSION}, please wait...`);

        let planetStore = this.db.createObjectStore(IDB_STORE_PLANETS, {
            autoIncrement: true
        });

        // Create an index on the id property
        planetStore.createIndex(IDB_INDEX_DEFAULT_ID, IDB_INDEX_DEFAULT_ID, {
            unique: true
        });

        let spaceshipStore = this.db.createObjectStore(IDB_STORE_SPACESHIPS, {
            autoIncrement: true
        });

        // Create an index on the id property
        spaceshipStore.createIndex(IDB_INDEX_DEFAULT_ID, IDB_INDEX_DEFAULT_ID, {
            unique: true
        });

        let customerStore = this.db.createObjectStore(IDB_STORE_CUSTOMERS, {
            autoIncrement: true
        });

        // Create an index on the id property
        customerStore.createIndex(IDB_INDEX_DEFAULT_ID, IDB_INDEX_DEFAULT_ID, {
            unique: true
        });

        console.log("Successfully created/upgraded spaceportal database");
    }

    /**
     * Sets the data for a data store.
     * If the database is not ready (currently being created/upgraded), the data is queued,
     * and set when the database is ready.
     * 
     * @param {*} storeName 
     * @param {*} data 
     * @returns 
     */
    setData(storeName, data) {
        console.log(`Setting ${storeName}`);

        if (!this.ready) {
            console.log(`Not ready, quering ${storeName}`);
            this.data[storeName] = data;
            return;
        }
        // create a new transaction
        const txn = this.db.transaction(storeName, 'readwrite');

        // Get the relevant object store
        const store = txn.objectStore(storeName);

        // Iterate through all the data elements and put them in the store.
        data.forEach(element => {
            let foundQuery = store.get(element.id);

            foundQuery.onerror = (event) => {

                //console.log(`Failed to get store data`);
                
            };

            foundQuery.onsuccess = (event) => {
                if (!event.target.result) {
                    
                    let query = store.put(element);
                    
                    query.onsuccess = (event) => {
                        //console.table(event.target.result);
                    };
                    
                    query.onerror = (event) => {
                        //console.log(event.target.errorCode);
                    }
                } else {
                    
                    //console.log(`${element} already exists`);
                }
            };
        });

        // transaction completes
        txn.oncomplete = function () {
            //console.log("Transaction closed.")
        };
    }

    /**
     * Gets a planet by id.
     * 
     * @param {*} id 
     */
    getPlanetById(id) {
        const txn = this.db.transaction(IDB_STORE_PLANETS, 'readonly');
        const store = txn.objectStore(IDB_STORE_PLANETS);

        let query = store.get(id);

        query.onsuccess = (event) => {
            if (!event.target.result) {
                console.log(`The planet with ${id} not found`);
            } else {
                console.table(event.target.result);
            }
        };

        query.onerror = (event) => {
            console.log(event.target.errorCode);
        }

        txn.oncomplete = function () {
        };
    };


    getAllPlanets(callbackFunc) {
        const txn = this.db.transaction(IDB_STORE_PLANETS, "readonly");
        const objectStore = txn.objectStore(IDB_STORE_PLANETS);

        let result = [];
        objectStore.openCursor().onsuccess = (event) => {
            let cursor = event.target.result;
            if (cursor) {
                let planet = cursor.value;
                result[result.length] = planet;
                console.log(planet);
                // continue next record
                cursor.continue();
            }
        };
        // close the database connection
        txn.oncomplete = function () {
            //db.close();
            callbackFunc(result);
        };
    }
    // Customers
    
    /**
     * Gets a customer by id.
     * 
     * @param {*} id 
     */
     getCustomerById(id) {
        const txn = this.db.transaction(IDB_STORE_CUSTOMERS, 'readonly');
        const store = txn.objectStore(IDB_STORE_CUSTOMERS);

        let query = store.get(id);

        query.onsuccess = (event) => {
            if (!event.target.result) {
                console.log(`The customer with ${id} not found`);
            } else {
                console.table(event.target.result);
            }
        };

        query.onerror = (event) => console.log(event.target.errorCode);
        txn.oncomplete = function () {};
    };


    getAllCustomers(callbackFunc) {
        const txn = this.db.transaction(IDB_STORE_CUSTOMERS, "readonly");
        const objectStore = txn.objectStore(IDB_STORE_CUSTOMERS);

        let result = [];
        objectStore.openCursor().onsuccess = (event) => {
            let cursor = event.target.result;
            if (cursor) {
                result[result.length] = cursor.value;
                cursor.continue();
            }
        };
        // close the database connection
        txn.oncomplete = function () {
            //db.close();
            callbackFunc(result);
        };
    }

    // Spaceships
    
    /**
     * Gets a planet by id.
     * 
     * @param {*} id 
     */
     getSpaceshipById(id) {
        const txn = this.db.transaction(IDB_STORE_SPACESHIPS, 'readonly');
        const store = txn.objectStore(IDB_STORE_SPACESHIPS);

        let query = store.get(id);

        query.onsuccess = (event) => {
            if (!event.target.result) {
                console.log(`The spaceship with ${id} not found`);
            } else {
                console.table(event.target.result);
            }
        };

        query.onerror = (event) => console.log(event.target.errorCode);
        txn.oncomplete = function () {};
    };


    getAllSpaceships(callbackFunc) {
        const txn = this.db.transaction(IDB_STORE_SPACESHIPS, "readonly");
        const objectStore = txn.objectStore(IDB_STORE_SPACESHIPS);

        let result = [];
        objectStore.openCursor().onsuccess = (event) => {
            let cursor = event.target.result;
            if (cursor) {
                result[result.length] = cursor.value;
                cursor.continue();
            }
        };
        // close the database connection
        txn.oncomplete = function () {
            //db.close();
            callbackFunc(result);
        };
    }
}
var indexedStorage = new IndexedStorage();