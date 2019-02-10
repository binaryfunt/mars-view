const APIKey = 'Y5iGrr42MbNPB7CZYUkkwz9uaSLzDaRecvoOXCb9';

const slideAdvanceDelay = 5000;
const transitionDurSec = 1;
const transitionDurMilSec = transitionDurSec * 1000;

function wait(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

$(document).ready(() => {

    const mainDiv = $("#main")[0];

    $.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2016-05-30&camera=navcam&api_key=${APIKey}`, (data) => {
        setData(data.photos[0]);
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
            transitionDurSec: transitionDurSec
        },
        mounted : function() {
            window.setTimeout(advanceSlide, slideAdvanceDelay);
        }
    });

    function setData(data) {
        slide.imgSrc = data .img_src;
        slide.roverName = data.rover.name;
        slide.roverStatus = data.rover.status;
        slide.date = data.earth_date;
        slide.sol = data.sol;
        slide.cameraFullName = data.camera.full_name;
    }

    function advanceSlide() {
        slideTransitionOut().then(() => {
            setData({
              "id": 424905,
              "sol": 1000,
              "camera": {
                "full_name": "Mast Camera"
              },
              "img_src": "http://mars.jpl.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631300503690E01_DXXX.jpg",
              "earth_date": "2015-05-30",
              "rover": {
                "name": "Curiosity",
                "status": "active",
              }
            });
            slideTransitionIn();
        });
    }


    async function slideTransitionOut() {
        $("#info").css("transform", "translateY(100%)");
        $("#container").css("opacity", 0);
        await wait(transitionDurMilSec);
    }
    async function slideTransitionIn() {
        $("#info").css("transform", "none");
        $("#container").css("opacity", 1);
        await wait(transitionDurMilSec);
    }
});
