function createMixins() {

    class Keyboard {

        constructor(manufacturer, responseTime) {
            this.manufacturer = manufacturer;
            this.responseTime = responseTime;
        }
    }

    class Monitor {

        constructor(manufacturer, width, height) {
            this.manufacturer = manufacturer;
            this.width = width;
            this.height = height;
        }
    }

    class Battery {

        constructor(manufacturer, expectedLife) {
            this.manufacturer = manufacturer;
            this.expectedLife = expectedLife;
        }
    }

    class Computer {

        constructor(manufacturer, processorSpeed, RAM, hardDiskSpace) {
            if (new.target === Computer) {
                throw new Error("Abstract class cannot be instantiated directly");
            }

            this.manufacturer = manufacturer;
            this.processorSpeed = processorSpeed;
            this.RAM = RAM;
            this.hardDiskSpace = hardDiskSpace;
        }
    }

    class Laptop extends Computer {

        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.weight = weight;
            this.color = color;
            this.battery = battery;
        }


        get battery() {
            return this._battery;
        }

        set battery(value) {
            if (!(value instanceof Battery)) {
                throw new TypeError("Passed parameter should be an instance of class Battery");
            }

            this._battery = value;
        }
    }

    class Desktop extends Computer {

        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.keyboard = keyboard;
            this.monitor = monitor;
        }


        get keyboard() {
            return this._keyboard;
        }

        set keyboard(value) {
            if (!(value instanceof Keyboard)) {
                throw new TypeError('Passed parameter should be an instance of class Keyboard')
            }

            this._keyboard = value;
        }

        get monitor() {
            return this._monitor;
        }

        set monitor(value) {
            if (!(value instanceof Monitor)) {
                throw new TypeError('Passed parameter should be an instance of class Monitor')
            }

            this._monitor = value;
        }
    }

    function computerQualityMixin(classToExtend) {

        classToExtend.prototype.getQuality = function () {
            return (this.processorSpeed + this.RAM + this.hardDiskSpace) / 3
        };

        classToExtend.prototype.isFast = function () {
            return this.processorSpeed > (this.RAM / 4);
        };

        classToExtend.isRoomy = function () {
            return this.hardDiskSpace > Math.floor(this.RAM * this.processorSpeed);
        };
    }

    function styleMixin(classToExtend) {

        classToExtend.prototype.isFullSet = function () {
            return this.manufacturer === this.keyboard.manufacturer &&
                this.manufacturer === this.monitor.manufacturer;
        };

        classToExtend.prototype.isClassy = function () {
            return this.battery.expectedLife >= 3 &&
                (this.color === 'Silver' || this.color === 'Black') &&
                 this.weight < 3;
        }
    }

    return {
        computerQualityMixin,
        styleMixin
    }
}