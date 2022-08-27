'use strict'

class Scraper {

    getSpaceflightData() {

        $.post({
            url: 'http://localhost:8080/api/v1/customers',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept ',
                'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
                'Access-Control-Max-Age': '3600'
            },
            data: {
                firstName: "Ronni",
                lastName: "Kahalani"
            },
            success: function (res) {
                var data = $.parseHTML(res);  //<----try with $.parseHTML().
                $(data).find('#content').each(function () {
                    $('#spaceflight').append($(this).html());
                });

            },
            error: function (res) {
                console.log(res);
            }

        });
    }
    getSpaceflightDataOld() {

        $.ajax({
            url: 'http://localhost:8080/api/v1/customers',
            type: 'Get',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept ',
                'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
                'Access-Control-Max-Age': '3600'
            },

            success: function (res) {
                var data = $.parseHTML(res);  //<----try with $.parseHTML().
                $(data).find('#content').each(function () {
                    $('#spaceflight').append($(this).html());
                });

            }
        });
    }
}

var scraper = new Scraper();
//scraper.getSpaceflightData();