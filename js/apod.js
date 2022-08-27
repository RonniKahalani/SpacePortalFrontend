'use strict'

class ApodRenderer {
    endpointUrl = 'https://api.nasa.gov/planetary/apod?api_key=0xBWwWrQ3fosBO3mfognfipbqRDMeWUQb40DxwcS&start_date=2022-05-28';

    /**
     * Constructor
     */
    constructor() {
        this.data = null;
        this.dataIndex = 0;
        this.fetchData();
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
        this.updateButtonStates();
        this.updateStatus();
        this.updateCard();
        $("#spinner-apod").hide();

    }

    /**
     * Updates a card
     */
    updateCard() {
        $('#spinner').fadeOut();

        let entry = this.data[this.dataIndex];
        const url = entry.url.toLowerCase();
 
        let tag =(entry.media_type.toLowerCase() == "image") ? "img" : "iframe";
        let media = `<${tag} class="media" style="width:600px;height:500px;" src="${entry.url}">`;
 
        $('#apod-card-media').html(media);
        $('#apod-card-title').text(entry.title);
        $('#apod-card-text').text(entry.explanation);
        $('#apod-card-date').text(entry.date);
        $('#apod-card-anchor').on('click', (e) => {
            window.open( entry.hdurl ? entry.hdurl : entry.url, '_blank');
        });
        $('#apod-card').fadeIn("slow");

    }

    endsWithAny(value, ends) {

        for (let end in ends) {
            if (value.endsWith(ends[end])) return true;
        }
        return false;
    }

    updateButtonStates() {
    
    }

    updateStatus() {
        $("#status").text((this.dataIndex + 1) + " of " + this.data.length).removeClass("connecting");
    }

    prev() {
        if (this.data && this.data.length > 0) {
            this.dataIndex -= this.dataIndex > 0 ? 1 : 0;
            this.updateUI();
        }
        return this.data[this.dataIndex];
    }

    next() {
        if (this.data && this.data.length > 0) {
            this.dataIndex += (this.dataIndex < this.data.length - 1) ? 1 : 0;
            this.updateUI();
        }
        return this.data[this.dataIndex];
    }
}
var apodRenderer = new ApodRenderer();