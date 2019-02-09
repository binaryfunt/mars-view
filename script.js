var APIKey = 'Y5iGrr42MbNPB7CZYUkkwz9uaSLzDaRecvoOXCb9';

$(document).ready(function () {

    var mainDiv = $("#main")[0];

    $.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2016-05-30&camera=navcam&api_key=" + APIKey, function (data) {
        updateDisplay(data.photos[0]);
        // TODO: Handle case when no images
    });

    function MarsImage(props) {
        var data = props.data;
        return React.createElement(
            "div",
            { "class": "container", style: { backgroundImage: "url(" + data.img_src + ")" } },
            React.createElement(
                "div",
                { "class": "info" },
                React.createElement(
                    "span",
                    { id: "rover" },
                    "Rover: " + data.rover.name + " (" + data.rover.status + ")"
                ),
                React.createElement(
                    "span",
                    { id: "capture-date" },
                    "Date captured: " + data.earth_date + " (sol: " + data.sol + ")"
                ),
                React.createElement(
                    "span",
                    { id: "camera" },
                    "Camera: " + data.camera.full_name,
                    " "
                )
            )
        );
    }

    function updateDisplay(data) {
        ReactDOM.render(React.createElement(MarsImage, { data: data }), mainDiv);
    }
});
