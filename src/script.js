const APIKey = 'Y5iGrr42MbNPB7CZYUkkwz9uaSLzDaRecvoOXCb9';

$(document).ready(() => {

    const mainDiv = $("#main")[0];

    $.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-05-30&camera=navcam&api_key=${APIKey}`, (data) => {
        updateDisplay(data.photos[0]);
        // TODO: Handle case when no images
    });

    function updateDisplay(data) {
        const element = (
            <div class="container" style={{backgroundImage: "url(" + data.img_src + ")"}}>
                <div class="info">
                    <span id="capture-date">{data.earth_date}</span>
                </div>
            </div>
        );
        ReactDOM.render(element, mainDiv);
    }
});
