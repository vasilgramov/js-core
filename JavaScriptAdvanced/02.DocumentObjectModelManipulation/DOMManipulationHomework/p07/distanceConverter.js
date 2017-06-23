function attachEventsListeners() {
    document.getElementById('convert').addEventListener('click', converter);

    let mapToM = new Map();
    mapToM.set('Kilometers', 1000);
    mapToM.set('Meters', 1);
    mapToM.set('Centimeters', 0.01);
    mapToM.set('Millimeters', 0.001);
    mapToM.set('Miles', 1609.34);
    mapToM.set('Yards', 0.9144);
    mapToM.set('Feet', 0.3048);
    mapToM.set('Inches', 0.0254);

     let names = [
     'Kilometers',
     'Meters',
     'Centimeters',
     'Millimeters',
     'Miles',
     'Yards',
     'Feet',
     'Inches'
     ];

    function converter() {
        let inputDistance = Number(document.getElementById('inputDistance').value);
        let from = names[document.getElementById('inputUnits').selectedIndex];
        inputDistance *= mapToM.get(from);

        let to = names[document.getElementById('outputUnits').selectedIndex];
        inputDistance /= mapToM.get(to);
        document.getElementById('outputDistance').value = inputDistance;
    }
}