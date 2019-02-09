const APIKey = 'Y5iGrr42MbNPB7CZYUkkwz9uaSLzDaRecvoOXCb9';

$(document).ready(() => {

    const mainDiv = $("#main")[0];

    $.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=navcam&api_key=${APIKey}`, (data) => {
        updateDisplay(data.photos[0].img_src);
    });

    function updateDisplay(img_src) {
        const element = React.createElement(
            'img',
            {src: img_src}
        );
        ReactDOM.render(element, mainDiv);
    }
});
