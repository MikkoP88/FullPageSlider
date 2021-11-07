var slider = function (sliderBody, sliderElement, sliderAlign, autoSlideChangerOn, autoSlideChangerDelay, autoSlideChangerStopEnd, changeSlideScrollOn, changeSlideKeyOn, changeSlideMouseOn, changeSlideTouchOn, nextPrevButtonOn, nextPrevButtonActiveLook, nextButtonCharacter, previousButtonCharacter,indicatorElement, indicatorElementOn, bottomTextElement, bottomTextElementOn, bottomSlideDelay, activeLookOn, ActiveLookDelay,activePageOn, activePageDelay, bodyColorHeritageOn, addSeparatoCharacter, slideButtonText1, slideButtonText2, slideButtonText3, slideButtonText4, slideButtonText5, slideButtonText6, slideButtonText7, slideButtonText8, slideButtonText9, slideButtonText10) {
   
    var pages = [];
    var currentSlide = 1;
    var bottomSlides = [];
    var currentBottomSlide = 1;
    var isChanging = false;
    var keyUp = { 38: 1, 33: 1 };
    var keyDown = { 40: 1, 34: 1 };

    var init = function () {

        document.getElementById(sliderBody).classList.add('slider_body');

        //This start automatically when everyting is loaded
        window.addEventListener("load", startFuncWhenAllLoaded = function () {

            //Auto changing bottom text element
            setInterval(changeBottomSlide, bottomSlideDelay);

            //Auto changing slides
            if (autoSlideChangerOn == true) {
                setInterval(autoSlideChanger, autoSlideChangerDelay);
            }
        });

        // control scrolling
        if (sliderAlign !== "horizontal" && changeSlideScrollOn == true) {
            whatWheel = 'onwheel' in document.createElement('div') ? 'wheel' : document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';
            window.addEventListener(whatWheel, function (e) {
                var direction = e.wheelDelta || e.deltaY;
                if (navigator.userAgent.indexOf("Firefox") !== -1) {
                    if (direction > 0) {
                        changeSlide(1);
                    } else {
                        changeSlide(-1);
                    }
                }
                else {
                    if (direction > 0) {
                        changeSlide(-1);
                    } else {
                        changeSlide(1);
                    }
                }
            });
        };
        if (sliderAlign !== "horizontal" && changeSlideKeyOn == true) {
            // allow keyboard input
            window.addEventListener('keydown', function (e) {
                if (keyUp[e.keyCode]) {
                    changeSlide(-1);
                } else if (keyDown[e.keyCode]) {
                    changeSlide(1);
                }
            });
        };
        // page change animation is done
        detectChangeEnd() && document.querySelector(sliderElement).addEventListener(detectChangeEnd(), function () {
            if (isChanging) {
                setTimeout(function () {
                    isChanging = false;
                    window.location.hash = document.querySelector('[data-slider-index="' + currentSlide + '"]').id;
                }, 400);
            }
        });

        // set up page and build visual indicators
        document.querySelector(sliderElement).classList.add('slider_for_pages');

        // Adding horizontal setting
        if (sliderAlign == "horizontal") {
            document.querySelector(sliderElement).style.display = "-webkit-box";
        };

        if (indicatorElementOn == true) {
            var replyIndex = 1;
            var index = 1;
            var buttonText;
            [].forEach.call(document.querySelectorAll(sliderElement + ' > *'), function (section) {

                //Create separator element between indicator buttons
                separatorCharacter = addSeparatoCharacter;
                if (replyIndex > 1) {
                    separator = document.createElement("a");
                    separator.innerHTML = (separatorCharacter);
                    document.getElementById(indicatorElement).appendChild(separator);
                    separator.classList.add('separator');
                }
                replyIndex++;

                // Create indicators and page
                indicator = document.createElement('a');
                document.getElementById(indicatorElement).appendChild(indicator);

                indicator.classList.add('slider_indicator');
                indicator.setAttribute('data-slider-target-index', index);
                indicator.setAttribute('id', "slide-" + index);
                indicator.setAttribute('onclick', "gotoSlide(" + index + ")");
                indicator.setAttribute('ontouchstart', "gotoSlide(" + index + ")");
                if (index == 1) { buttonText = slideButtonText1 };
                if (index == 2) { buttonText = slideButtonText2 };
                if (index == 3) { buttonText = slideButtonText3 };
                if (index == 4) { buttonText = slideButtonText4 };
                if (index == 5) { buttonText = slideButtonText5 };
                if (index == 6) { buttonText = slideButtonText6 };
                if (index == 7) { buttonText = slideButtonText7 };
                if (index == 8) { buttonText = slideButtonText8 };
                if (index == 9) { buttonText = slideButtonText9 };
                if (index == 10) { buttonText = slideButtonText10 };

                indicator.innerHTML = (buttonText);
                section.classList.add('slider_page');
                pages.push(section);
                section.setAttribute('data-slider-index', index++);
            });
        };
        // Create Bottom text element
        if (bottomTextElementOn == true) {
            document.querySelector(bottomTextElement).classList.add('slider_for_bottom');

            var bottomIndex = 1;
            [].forEach.call(document.querySelectorAll(bottomTextElement + ' > *'), function (bottomSection) {
                bottomSlides.push(bottomSection);
                bottomSection.setAttribute('bottom-slider-index', bottomIndex++);
            });
            document.querySelector('div[bottom-slider-index = "' + currentBottomSlide + '"]').classList.add('bottom_text--active');

            function changeBottomSlide() {
                if (bottomSlides.length < currentBottomSlide) {
                    currentBottomSlide = 1;
                }
                document.querySelector('div.bottom_text--active').classList.remove('bottom_text--active');
                document.querySelector('div[bottom-slider-index = "' + currentBottomSlide + '"]').classList.add('bottom_text--active');
                currentBottomSlide++;
            };
        }

        // Next and previously buttons
        if (nextPrevButtonOn == true) {
            //Next Slide Button
            nextButton = document.createElement('div');
            document.getElementById(sliderBody).appendChild(nextButton);
            nextButton.classList.add('next_button');
            nextButton.setAttribute('id', "next-button");
            nextButton.setAttribute('onclick', "changeSlide(1)");
            nextButton.setAttribute('ontouchstart', "changeSlide(1)");
            nextButton.innerHTML = nextButtonCharacter;

            //Previous Slide Button
            previousButton = document.createElement('div');
            document.getElementById(sliderBody).appendChild(previousButton);
            previousButton.classList.add('previous_button');
            previousButton.setAttribute('id', "previous-button");
            previousButton.setAttribute('onclick', "changeSlide(-1)");
            previousButton.setAttribute('ontouchstart', "changeSlide(-1)");
            previousButton.innerHTML = previousButtonCharacter;

            updateNextPrevButton();

            if (nextPrevButtonActiveLook == true) {
                nextButton.classList.add('add_active_look');
                previousButton.classList.add('add_active_look');
            }
        };

        //Add active indicator
        if (indicatorElementOn == true) {
            document.querySelector('a[data-slider-target-index = "' + currentSlide + '"]').classList.add('slider_indicator--active');
        }
        //Add active page
        if (activePageOn == true) {
            document.querySelector('div[data-slider-index="' + currentSlide + '"]').classList.add('page_' + currentSlide + '--active');
            var elements = document.getElementsByClassName("add_active_look");
            for (a = 0; a < elements.length; a++) {
                elements[a].classList.add("active_page_" + currentSlide + "");
            };
        };

        //Add Body background color heritage from previously page
        if (bodyColorHeritageOn == true) {
            startPosition = currentSlide + 1;
            document.getElementById(sliderBody).classList.add('page_' + startPosition + '_color');
            oldPosition = startPosition;
        };

        if (changeSlideTouchOn == true) {
            // stuff for touch devices
            var touchStartPos = 0;
            var touchStopPos = 0;
            var touchMinLength = 5;

            document.getElementById(sliderBody).addEventListener('touchstart', function (e) {
                e.preventDefault();
                if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
                    var touch = e.touches[0] || e.changedTouches[0];
                    if (sliderAlign == "vertical" || sliderAlign == undefined) {
                        touchStartPos = touch.pageY;
                    }
                    else if (sliderAlign == "horizontal") {
                        touchStartPos = touch.pageX;
                    }
                }
            });
            document.getElementById(sliderBody).addEventListener('touchend', function (e) {
                e.preventDefault();
                if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
                    var touch = e.touches[0] || e.changedTouches[0];
                    if (sliderAlign == "vertical" || sliderAlign == undefined) {
                        touchStopPos = touch.pageY;
                    }
                    else if (sliderAlign == "horizontal") {
                        touchStopPos = touch.pageX;
                    }
                }
                if (touchStartPos + touchMinLength < touchStopPos) {
                    changeSlide(-1);
                } else if (touchStartPos > touchStopPos + touchMinLength) {
                    changeSlide(1);
                }
            });
        }

        if (changeSlideMouseOn == true) {
            //Mouse drag change slide
            var mouseStartPos = 0;
            var mouseStopPos = 0;
            var mouseMinLength = 5;

            document.getElementById(sliderBody).addEventListener('mousedown', function (e) {
                e.preventDefault();
                if (e.type == 'mousedown' || e.type == 'mousemove' || e.type == 'mouseup' || e.type == 'mouseleave') {
                    if (sliderAlign == "vertical" || sliderAlign == undefined) {
                        mouseStartPos = e.pageY;
                    }
                    else if (sliderAlign == "horizontal") {
                        mouseStartPos = e.pageX;
                    }
                }
            });
            document.getElementById(sliderBody).addEventListener('mouseup', function (e) {
                e.preventDefault();
                if (e.type == 'mousedown' || e.type == 'mousemove' || e.type == 'mouseup' || e.type == 'mouseleave') {
                    if (sliderAlign == "vertical" || sliderAlign == undefined) {
                        mouseStopPos = e.pageY;
                    }
                    else if (sliderAlign == "horizontal") {
                        mouseStopPos = e.pageX;
                    }
                }
                if (mouseStartPos + mouseMinLength < mouseStopPos) {
                    changeSlide(-1);
                } else if (mouseStartPos > mouseStopPos + mouseMinLength) {
                    changeSlide(1);
                }
            });
        };
    };

    var updateNextPrevButton = function () {
        if (currentSlide == pages.length) {
            document.getElementById("next-button").style.display = "none";
        }
        else {
            document.getElementById("next-button").style.display = "";
        }
        if (currentSlide <= 1) {
            document.getElementById("previous-button").style.display = "none";
        }
        else {
            document.getElementById("previous-button").style.display = "";
        }
    };

    // Automatic slide changer
    var autoSlideChanger = function () {
        if (pages.length == currentSlide && autoSlideChangerStopEnd !== true) {
            gotoSlide(1);
        }
        else if (currentSlide < pages.length) {
            changeSlide(1);
        }      
    };

    // Prevent double scrolling
    var detectChangeEnd = function () {
        var transition;
        var e = document.createElement('foobar');
        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        };

        for (transition in transitions) {
            if (e.style[transition] !== undefined) {
                return transitions[transition];
            }
        }
        return true;
    };

    // handle css change
    var changeCss = function (obj, styles) {
        for (var _style in styles) {
            if (obj.style[_style] !== undefined) {
                obj.style[_style] = styles[_style];
            }
        }
    };

    // Go specific slide
    gotoSlide = function (slideNumber) {

        // change slide
        newCurrentSlide = slideNumber;
        isChanging = true;
        transformSlide(newCurrentSlide - 1);        

        changeActiveIndicator(newCurrentSlide);
        activePage(currentSlide, newCurrentSlide);
        activeLook(currentSlide, newCurrentSlide);

        if (currentSlide < slideNumber) {
            newHerigatePosition = slideNumber - 1;
        } else {
            newHerigatePosition = slideNumber + 1;
        }
        bodyColorHeritage(newHerigatePosition);

        //Updating currentSlide value
        currentSlide = slideNumber;

        // Update next and prev button
        updateNextPrevButton();
    };
  
    // handle page/section change
    changeSlide = function (direction) {

        // already doing it or last/first page, staph plz
        if (isChanging || (direction == 1 && currentSlide == pages.length) || (direction == -1 && currentSlide == 1)) {
            return;
        }

        // Change page
        newCurrentSlide = currentSlide + direction;
        isChanging = true;

        transformSlide(newCurrentSlide - 1);

        changeActiveIndicator(newCurrentSlide);
        activePage(currentSlide, newCurrentSlide);
        activeLook(currentSlide, newCurrentSlide);
        bodyColorHeritage(currentSlide);

        //Updating currentSlide value
        currentSlide = newCurrentSlide;

        // Update next and prev button
        updateNextPrevButton();
    };

    // Tranform function move to next slide
    var transformSlide = function (newValue) {
        if (sliderAlign == "vertical" || sliderAlign == undefined) {
            changeCss(document.querySelector(sliderElement), {
                transform: 'translate3d(0, ' + -(newValue) * 100 + '%, 0)'
            });
        }
        else if (sliderAlign == "horizontal") {
            changeCss(document.querySelector(sliderElement), {
                transform: 'translate3d(' + -(newValue) * 100 + '%, 0,  0)'
            });
        }
    };

    //Change active page
    var activePage = function (oldPosition, newPosition) {
        if (activePageOn == true) {
            setTimeout(() => {
                document.querySelector('div.page_' + oldPosition + '--active').classList.remove('page_' + oldPosition + '--active');
                document.querySelector('div[data-slider-index="' + newCurrentSlide + '"]').classList.add('page_' + newPosition + '--active');
            }, activePageDelay);
        }
    };

    //Add Body background color heritage from previously page
    var bodyColorHeritage = function (newPosition) {
        if (bodyColorHeritageOn == true) {
            document.getElementById(sliderBody).classList.remove('page_' + oldPosition + '_color');
            document.getElementById(sliderBody).classList.add('page_' + newPosition + '_color');
            oldPosition = newPosition;
        }
    }

    // Show Active Indicator 
    var changeActiveIndicator = function (newPosition) {
        if (indicatorElementOn == true) {
            document.querySelector('a.slider_indicator--active').classList.remove('slider_indicator--active');
            document.querySelector('a[data-slider-target-index="' + newPosition + '"]').classList.add('slider_indicator--active');
        }
    };

    //Active Look
    var activeLook = function (oldPosition, newPosition) {

        if (activeLookOn == true) {
            setTimeout(() => {
                var elements = document.getElementsByClassName("add_active_look");
                for (a = 0; a < elements.length; a++) {
                    elements[a].classList.remove("active_page_" + oldPosition + "");
                }
                var elements = document.getElementsByClassName("add_active_look");
                for (a = 0; a < elements.length; a++) {
                    elements[a].classList.add("active_page_" + newPosition + "");
                }
            }, ActiveLookDelay);
        }
    }

    // if page is loaded with hash, go to slide
    if (location.hash) {
        setTimeout(function () {
            window.scrollTo(0, 0);
            gotoSlide(1);
        }, 1);
    };

    // we have lift off
    if (document.readyState === 'complete') {
        init();
    } else {
        window.addEventListener('onload', init(), false);
    }
};
