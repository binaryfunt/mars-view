const APIKey = 'Y5iGrr42MbNPB7CZYUkkwz9uaSLzDaRecvoOXCb9';

const slideAdvanceDelaySec = 10;
const slideAdvanceDelayMilSec = slideAdvanceDelaySec * 1000;
const transitionDurSec = 1;
const transitionDurMilSec = transitionDurSec * 1000;

function wait(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}
function getISOString(date) {
    return date.toISOString().split('T')[0];
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

$(document).ready(() => {

    const mainDiv = $("#main")[0];

    const slideState = {
        date: new Date(2014, 4, 30),
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
            transitionDurSec: transitionDurSec,
            slideAdvanceDelaySec: slideAdvanceDelaySec
        },
        beforeCreate: function() {
            fetchJSON(slideState.date);
        },
        mounted : startSlideshow,
        methods: {
            toggleSlideshow: function() {
                if (slideState.advanceIntervalID) {
                    pauseSlideshow();
                } else {
                    startSlideshow();
                }
            }
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
            pauseSlideshow();
        }
    }

    function advanceSlide() {
        slideTransitionOut().then(() => {
            setData(slideState.photos[slideState.currentSlide]);
            slideTransitionIn().then(() => {
                animateBackground();
                preloadImage();
            });
        });
    }

    function fetchJSON(date) {
        dateString = getISOString(date);
        $.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${dateString}&api_key=${APIKey}`, (data) => {
            if (data.photos.length > 0) {
                slideState.photos = data.photos;
                shuffleArray(slideState.photos);
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
        $("#container").addClass("hiding");
        await wait(transitionDurMilSec);
        $("#container").addClass("hidden");
        $("#container").removeClass("hiding");
        $("#container").css("background-position-y", "100%");
        await wait(100);
    }
    async function slideTransitionIn() {
        $("#info").css("transform", "none");
        $("#container").removeClass("hidden");
        await wait(transitionDurMilSec);
    }
    function animateBackground() {
        $("#container").css("background-position-y", "0%");
    }

    function startSlideshow() {
        slideState.advanceIntervalID = window.setInterval(advanceSlide, slideAdvanceDelayMilSec);
    }
    function pauseSlideshow() {
        clearInterval(slideState.advanceIntervalID);
        slideState.advanceIntervalID = null;
    }

    function preloadImage() {
        slideState.imageBuffer = new Image();
        slideState.imageBuffer.src = slideState.photos[slideState.currentSlide].img_src;
    }
});
