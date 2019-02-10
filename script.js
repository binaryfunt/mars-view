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

    let photos;
    let currentSlide = 0;
    let imageBuffer;
    let slideAdvanceIntervalID;



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
            fetchJSON(new Date(2015, 8, 1));
        },
        mounted : function() {
            slideAdvanceIntervalID = window.setInterval(advanceSlide, slideAdvanceDelay);
        }
    });

    function setData(data) {
        slide.imgSrc = data .img_src;
        slide.roverName = data.rover.name;
        slide.roverStatus = data.rover.status;
        slide.date = data.earth_date;
        slide.sol = data.sol;
        slide.cameraFullName = data.camera.full_name;

        currentSlide += 4;
        if (currentSlide >= photos.length) {
            clearInterval(slideAdvanceIntervalID);
        }
    }

    function advanceSlide() {
        slideTransitionOut().then(() => {
            setData(photos[currentSlide]);
            slideTransitionIn().then(() => {
                preloadImage(photos[currentSlide].img_src);
            });
        });
    }

    function fetchJSON(date) {
        dateString = getISOString(date);
        $.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${dateString}&api_key=${APIKey}`, (data) => {
            photos = data.photos;
            setData(photos[currentSlide]);
            console.log(photos.length);
            // TODO: Handle case when no images
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

    function preloadImage(url) {
        imageBuffer = new Image();
        imageBuffer.src = url;
    }
});
