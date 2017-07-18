(function solve() {
    let staticId = 0;

    class Record {
        constructor(temperature, humidity, pressure, windSpeed) {
            this.id = staticId++;

            this.temperature = temperature;
            this.humidity = humidity;
            this.pressure = pressure;
            this.windSpeed = windSpeed;
        }

        toString() {
            let result = '';

            result += `Reading ID: ${this.id}\n`;
            result += `Temperature: ${this.temperature}*C\n`;
            result += `Relative Humidity: ${this.humidity}%\n`;
            result += `Pressure: ${this.pressure}hpa\n`;
            result += `Wind Speed: ${this.windSpeed}m/s\n`;

            if (this.temperature < 20 &&
                (this.pressure < 700 || this.pressure > 900) &&
                this.windSpeed > 25) {
                result += `Weather: Stormy`;
            } else {
                result += `Weather: Not stormy`;
            }

            return result;
        }
    }

    return Record;
})()
