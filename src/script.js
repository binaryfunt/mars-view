const APIKey = 'Y5iGrr42MbNPB7CZYUkkwz9uaSLzDaRecvoOXCb9';

$(document).ready(() => {

    const mainDiv = $("#main")[0];

    $.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2019-1-1&camera=navcam&api_key=${APIKey}`, (data) => {
        updateDisplay(data.photos[0].img_src);
        // TODO: Handle case when no images
    });

    function updateDisplay(img_src) {
        const element = (
            <div>
                <img src={img_src} />
            </div>
        );
        ReactDOM.render(element, mainDiv);
    }
});
