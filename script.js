var APIKey = 'Y5iGrr42MbNPB7CZYUkkwz9uaSLzDaRecvoOXCb9';

$(document).ready(function () {

    var mainDiv = $("#main")[0];

    $.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2019-1-1&camera=navcam&api_key=" + APIKey, function (data) {
        updateDisplay(data.photos[0].img_src);
        // TODO: Handle case when no images
    });

    function updateDisplay(img_src) {
        var element = React.createElement(
            "div",
            null,
            React.createElement("img", { src: img_src })
        );
        ReactDOM.render(element, mainDiv);
    }
});