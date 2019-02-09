import _regeneratorRuntime from "babel-runtime/regenerator";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var APIKey = 'Y5iGrr42MbNPB7CZYUkkwz9uaSLzDaRecvoOXCb9';

var slideAdvanceDelay = 5000;
var slideTransitionDuration = 1;

function wait(delay) {
    return new Promise(function (resolve) {
        return setTimeout(resolve, delay);
    });
}

$(document).ready(function () {
    var slideOffBottom = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(jQuerySelector) {
            return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            $(jQuerySelector).css("transform", "translateY(100%)");
                            _context.next = 3;
                            return wait(slideTransitionDuration);

                        case 3:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function slideOffBottom(_x) {
            return _ref.apply(this, arguments);
        };
    }();

    var mainDiv = $("#main")[0];

    $.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2016-05-30&camera=navcam&api_key=" + APIKey, function (data) {
        updateDisplay(data.photos[0]);
        // TODO: Handle case when no images
    });

    var Slide = function (_React$Component) {
        _inherits(Slide, _React$Component);

        function Slide(props) {
            _classCallCheck(this, Slide);

            var _this = _possibleConstructorReturn(this, (Slide.__proto__ || Object.getPrototypeOf(Slide)).call(this, props));

            _this.state = {
                data: props.data
            };
            return _this;
        }

        _createClass(Slide, [{
            key: "render",
            value: function render() {
                var data = this.state.data;
                return React.createElement(
                    "div",
                    { id: "container", style: { backgroundImage: "url(" + data.img_src + ")" } },
                    React.createElement(
                        "div",
                        { id: "info", style: { transition: slideTransitionDuration + "s transform" } },
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
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                var _this2 = this;

                window.setTimeout(function () {
                    _this2.update({
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
                            "cameras": [{
                                "name": "FHAZ",
                                "full_name": "Front Hazard Avoidance Camera"
                            }, {
                                "name": "NAVCAM",
                                "full_name": "Navigation Camera"
                            }, {
                                "name": "MAST",
                                "full_name": "Mast Camera"
                            }, {
                                "name": "CHEMCAM",
                                "full_name": "Chemistry and Camera Complex"
                            }, {
                                "name": "MAHLI",
                                "full_name": "Mars Hand Lens Imager"
                            }, {
                                "name": "MARDI",
                                "full_name": "Mars Descent Imager"
                            }, {
                                "name": "RHAZ",
                                "full_name": "Rear Hazard Avoidance Camera"
                            }]
                        }
                    });
                }, 5000);
            }
        }, {
            key: "update",
            value: function update(data) {
                var _this3 = this;

                slideOffBottom('#info').then(function () {
                    _this3.setState({
                        data: data
                    });
                });
            }
        }]);

        return Slide;
    }(React.Component);

    function updateDisplay(data) {
        ReactDOM.render(React.createElement(Slide, { data: data }), mainDiv);
    }
});
