'use strict'

class SpaceXLaunchRenderer {
    endpointUrl = 'https://api.spacexdata.com/v2/launches';

    constructor() {
        this.data = null;
        this.fetchData();
    }

    async fetchData() {
        let response = await fetch(this.endpointUrl);
        this.data = await response.json();
        this.data.reverse();
        this.updateUI();
    };

    updateUI() {
        for (let dataIndex in this.data) {
            let entry = this.data[dataIndex];

            let target = $('#spacex');
            let success = entry.launch_success;
            let launchDate = new Date(entry.launch_date_utc).toDateString();
            let commonLinkTD = '<td><a class="tiny btn btn-dark" target="_blank" href="';

            let table = `<tr style="vertical-align:middle;"><td style="color:${!success? "#FF0000" : "#00FF00"};font-size:30px;width:5px;">&#8226;</td>
            <td>${entry.mission_name}</td>
            <td>${launchDate}</td>
            <td>${entry.rocket.rocket_name}</td>
            <td title="${entry.launch_site.site_name_long}">${entry.launch_site.site_name}</td>
            ${commonLinkTD + entry.links.video_link}">Video</a></td>
            ${commonLinkTD + entry.links.mission_patch}">Image</a></td>
            ${commonLinkTD + entry.links.wikipedia}">Wikipedia</a></td>
            ${commonLinkTD + entry.links.article_link}">Article</a></td></tr>`;
            
            target.append(table);
        }
        $("#spinner-spacex").hide();
        $("#table-spacex").fadeIn("slow");

    }
}
var spaceXLaunchRenderer = new SpaceXLaunchRenderer();