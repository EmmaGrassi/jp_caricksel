'use strict';

angular.module('rickheere.jpCaricksel', [])
    .directive('jpCaricksel', [function () {
        return {
        scope : true,
        restrict: 'EA',
        transclude: true,
        link: function (scope, element) {

            var c,
                carousel;

            function Carousel() {
                this.rootElement = element[0];
                this.containerElement = document.createElement('div');

                this.seats = [];
                this.viewTime = 5000;
                this.viewIntervalId = null;
                this.goLeft = document.createElement('div');
                this.goRight = document.createElement('div');

                this.activeAnimation = false;
            }

            c = Carousel.prototype;

            c.init = function() {
                this.addImages();
                this.initContainerElements();
                if (scope.images.length > 1) {
                    this.initControls();
                    this.initAutoScroll();
                }
            };

            c.initContainerElements = function() {
                this.containerElement.className = 'imageContainer';
                this.rootElement.appendChild(this.containerElement);
            };

            c.initControls = function() {
                var self = this;

                this.goLeft.className = 'ctrl ctrlLeft';
                this.goRight.className = 'ctrl ctrlRight';

                this.rootElement.appendChild(this.goLeft);
                this.rootElement.appendChild(this.goRight);

                this.goLeft.addEventListener('click', function() {
                    if (!self.activeAnimation) {
                        self.activeAnimation = true;
                        self.previousSeat();
                    }
                });

                this.goRight.addEventListener('click', function() {
                    if (!self.activeAnimation) {
                        self.activeAnimation = true;
                        self.nextSeat();
                    }
                });
            };

            c.addImages = function() {
                var i = scope.images.length - 1;

                for (i;i >= 0;--i) {
                    this.addImage(scope.images[i], i);
                }
            };

            c.addImage = function(src, index) {
                var img = document.createElement('img');
                    img.className = 'seat';
                    img.src = src;
                    img.setAttribute('data-index', index);

                this.seats[index] = {
                    element: img,
                    position: 100 * index
                };

                img.style.transform = 'translate3d('+(this.seats[index].position)+'%, 0px, 0px)';
                this.containerElement.appendChild(img);
            };

            c.initAutoScroll = function() {
                var self = this;
                this.viewIntervalId = setInterval(function() {
                    self.activeAnimation = true;
                    self.nextSeat();
                }, this.viewTime);
            };

            c.resetAutoScroll = function() {
                clearInterval(this.viewIntervalId);
                this.initAutoScroll();
            };

            c.nextSeat = function() {
                var i = this.seats.length - 1;
                for (i;i >= 0;--i) {
                    this.scroll(this.seats[i], function(p){return p;}, -100, 500);
                }
                this.resetAutoScroll();
            };

            c.previousSeat = function() {

                if (!this.hasSeatLeftOfViewport()) {
                    this.tossSeatToLeft(
                        this.getMostRightSeat()
                    );
                }

                var i = this.seats.length - 1;
                for (i;i >= 0;--i) {
                    this.scroll(this.seats[i], function(p){return p;}, 100, 500);
                }
                this.resetAutoScroll();
            };

            c.animate = function (opts, doneCallback) {

                var start = new Date(),
                    id;

                id = setInterval(function() {
                    var timePassed = new Date() - start,
                        progress = timePassed / opts.duration,
                        delta;

                    if (progress > 1) {
                        progress = 1;
                    }

                    delta = opts.delta(progress);
                    opts.step(delta);

                    if (progress === 1) {
                        clearInterval(id);
                        doneCallback();
                    }
                }, opts.delay || 10);
            };

            c.scroll = function(seat, delta, to, duration) {
                var self = this,
                    nextPosition;

                this.animate({
                    delay: 10,
                    duration: duration || 1000, // 1 sec by default
                    delta: delta,
                    step: function(delta) {
                        nextPosition = to * delta + seat.position;
                        seat.element.style.transform = 'translate3d('+(nextPosition)+'%, 0px, 0px)';
                    }
                }, function done() {
                    seat.position = nextPosition;
                    if (seat.position <= -100) {
                        self.tossSeatToRight(seat);
                    }

                    self.activeAnimation = false;
                });
            };

            c.hasSeatLeftOfViewport = function() {
                var i = this.seats.length - 1;

                for (i;i >= 0;--i) {
                    if (this.seats[i].position <= -100) {
                        return true;
                    }
                }

                return false;
            };

            c.getMostRightSeat = function() {
                var i = this.seats.length - 1,
                    mostRightPosition = 0,
                    mostRight;

                for (i;i >= 0;--i) {
                    if (this.seats[i].position > mostRightPosition) {

                        mostRight = this.seats[i];
                        mostRightPosition = this.seats[i].position;
                    }
                }

                return mostRight;
            };

            c.tossSeatToLeft = function(seat) {
                this.tossSeat(seat, -100);
            };

            c.tossSeatToRight = function(seat) {
                this.tossSeat(seat, (this.seats.length - 1) * 100);
            };


            c.tossSeat = function(seat, percentage) {

                //console.log('seat '+ seat.element.getAttribute('data-index') + 'moet naar andere kant');

                var flipPosition = percentage;

                seat.element.style.transform = 'translate3d('+(flipPosition)+'%, 0px, 0px)';
                seat.position = flipPosition;
            };

            carousel = new Carousel();
            carousel.init();
        }
    };
}]);
