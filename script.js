const APIKey = 'Y5iGrr42MbNPB7CZYUkkwz9uaSLzDaRecvoOXCb9';

const slideAdvanceDelay = 5000;
const slideTransitionDuration = 1;

function wait(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

$(document).ready(() => {

    const mainDiv = $("#main")[0];

    $.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2016-05-30&camera=navcam&api_key=${APIKey}`, (data) => {
        updateDisplay(data.photos[0]);
        // TODO: Handle case when no images
    });

    const slide = new Vue({
        el: '#container',
        data: {
            imgSrc: '',
            roverName: '',
            roverStatus: '',
            date: '',
            sol: '',
            cameraFullName: '',
            slideTransitionDuration: slideTransitionDuration
        },
        mounted : function() {
            window.setTimeout(() => {
                updateDisplay({
                  "id": 424905,
                  "sol": 1000,
                  "camera": {
                    "id": 22,
                    "name": "MAST",
                    "rover_id": 5,
                    "full_name": "Mast Camera"
                  },
                  "img_src": "http://mars.jpl.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631300503690E01_DXXX.jpg",
                  "earth_date": "2015-05-30",
                  "rover": {
                    "id": 5,
                    "name": "Curiosity",
                    "landing_date": "2012-08-06",
                    "launch_date": "2011-11-26",
                    "status": "active",
                    "max_sol": 2314,
                    "max_date": "2019-02-08",
                    "total_photos": 347231,
                    "cameras": [
                      {
                        "name": "FHAZ",
                        "full_name": "Front Hazard Avoidance Camera"
                      },
                      {
                        "name": "NAVCAM",
                        "full_name": "Navigation Camera"
                      },
                      {
                        "name": "MAST",
                        "full_name": "Mast Camera"
                      },
                      {
                        "name": "CHEMCAM",
                        "full_name": "Chemistry and Camera Complex"
                      },
                      {
                        "name": "MAHLI",
                        "full_name": "Mars Hand Lens Imager"
                      },
                      {
                        "name": "MARDI",
                        "full_name": "Mars Descent Imager"
                      },
                      {
                        "name": "RHAZ",
                        "full_name": "Rear Hazard Avoidance Camera"
                      }
                    ]
                  }
                });
            }, slideAdvanceDelay);
        }
    });

    //     componentDidMount() {
    //
    //     }
    //
    //     update(data) {
    //         slideOffBottom('#info').then(() => {
    //             this.setState({
    //                 data: data
    //             });
    //         });
    //     }
    // });

    function updateDisplay(data) {
        slide.imgSrc = data.img_src;
        slide.roverName = data.rover.name;
        slide.roverStatus = data.rover.status;
        slide.date = data.earth_date;
        slide.sol = data.sol;
        slide.cameraFullName = data.camera.full_name;
    }


    async function slideOffBottom(jQuerySelector) {
        $(jQuerySelector).css("transform", "translateY(100%)");
        await wait(slideTransitionDuration);
    }
});
