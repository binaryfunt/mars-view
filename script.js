var APIKey = 'Y5iGrr42MbNPB7CZYUkkwz9uaSLzDaRecvoOXCb9';

$(document).ready(function () {

    var mainDiv = $("#main")[0];

    $.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-05-30&camera=navcam&api_key=" + APIKey, function (data) {
        updateDisplay(data.photos[0]);
        // TODO: Handle case when no images
    });

    function updateDisplay(data) {
        var element = React.createElement(
            "div",
            { "class": "container", style: { backgroundImage: "url(" + data.img_src + ")" } },
            React.createElement(
                "div",
                { "class": "info" },
                React.createElement(
                    "span",
                    { id: "capture-date" },
                    data.earth_date
                )
            )
        );
        ReactDOM.render(element, mainDiv);
    }
});
