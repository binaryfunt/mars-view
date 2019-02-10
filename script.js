const APIKey = 'Y5iGrr42MbNPB7CZYUkkwz9uaSLzDaRecvoOXCb9';

const slideAdvanceDelay = 5000;
const transitionDurSec = 1;
const transitionDurMilSec = transitionDurSec * 1000;

function wait(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}
function getISOString(date) {
    return date.toISOString().split('T')[0];
}

$(document).ready(() => {

    const mainDiv = $("#main")[0];

    const slideState = {
        date: new Date(2017, 4, 30),
        photos: [],
        currentSlide: 0,
        imageBuffer: '',
        advanceIntervalID: null
    }

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
        beforeCreate: function() {
            fetchJSON(slideState.date);
        },
        mounted : function() {
            slideState.advanceIntervalID = window.setInterval(advanceSlide, slideAdvanceDelay);
        }
    });

    function setData(data) {
        slide.imgSrc = data .img_src;
        slide.roverName = data.rover.name;
        slide.roverStatus = data.rover.status;
        slide.date = data.earth_date;
        slide.sol = data.sol;
        slide.cameraFullName = data.camera.full_name;

        slideState.currentSlide += 4;
        if (slideState.currentSlide >= slideState.photos.length) {
            clearInterval(slideState.advanceIntervalID);
        }
    }

    function advanceSlide() {
        slideTransitionOut().then(() => {
            setData(slideState.photos[slideState.currentSlide]);
            slideTransitionIn().then(preloadImage);
        });
    }

    function fetchJSON(date) {
        dateString = getISOString(date);
        $.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${dateString}&api_key=${APIKey}`, (data) => {
            if (data.photos.length > 0) {
                slideState.photos = data.photos;
                setData(slideState.photos[slideState.currentSlide]);
                console.log("Photos length: " + slideState.photos.length);
                preloadImage();
            } else {
                console.log("No images for selected date");
            }
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

    function preloadImage() {
        slideState.imageBuffer = new Image();
        slideState.imageBuffer.src = slideState.photos[slideState.currentSlide].img_src;
    }
});
