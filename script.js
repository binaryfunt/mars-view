const APIKey = 'Y5iGrr42MbNPB7CZYUkkwz9uaSLzDaRecvoOXCb9';

$(document).ready(() => {

    const mainDiv = $("#main");

    $.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=navcam&api_key=${APIKey}`, (data) => {
        let img = $('<img />', {
            src: data.photos[0].img_src
        });
        mainDiv.append(img);
    });

});
