let areaCoordinates = [40, -98]  // Array of latitude and longitude
let zoomLevel = 4   // 1 = whole world, 10 = large city, 20 = city blocks

// Create the map
let map = L.map('bridges-map').setView(areaCoordinates, zoomLevel)


// Add the tile layer - roads, streets etc. Without this, nothing to see
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copywrite">OpenStreetMap</a>',
}).addTo(map)

bridges =  [
    {"name": "Verrazano-Narrows Bridge", "city": "New York", "state": "NY", "span": "1298.4", "coordinates": [40.6066, -74.0447] },
    {"name": "Golden Gate Bridge", "city": "San Francisco and Marin", "state": "CA", "span": "1280.2", "coordinates": [37.8199, -122.4783] },
    {"name": "Mackinac Bridge", "city": "Mackinaw and St Ignace", "state": "MI", "span": "1158.0", "coordinates": [45.8174, -84.7278] },
    {"name": "George Washington Bridge", "city": "New York and New Jersey", "state":  "NY and NJ", "span": "1067.0", "coordinates": [40.8517, -73.9527] },
    {"name": "Tacoma Narrows Bridge", "city": "Tacoma and Kitsap", "state": "WA", "span": "853.44", "coordinates": [47.2690, -122.5517] }
]

bridges.forEach(function(usBridge) {
  let markerText = `${usBridge.name}<br>Span ${usBridge.span}m`
  L.marker(usBridge.coordinates).bindPopup(markerText).addTo(map)
})


let canvas = document.querySelector('#bridge-chart')
let context = canvas.getContext('2d')

chart = new Chart(context, {
    type: 'bar',
    data: {
        labels: [ ],
        datasets: [{
            label: 'Span',
            data: [ ],   // this is the chart data
            backgroundColor: [ ]
        }]
    }, options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
})

let chartColors = [ 'tomato', 'orange', 'dodgerblue', 'mediumseagreen', 'slateblue', 'violet' ]

bridges.forEach(function addToChart(usBridge) {

    let name = usBridge.name
    let span = usBridge.span

    // Add data to the label array, and first dataset data array
    chart.data.labels.push(name)
    chart.data.datasets[0].data.push(span)

    // How many colors have been used so far?
    let colorCount = chart.data.datasets[0].backgroundColor.length

    // What's the next color?
    // cycle back to the start of the list, if they've all been used
    let color = chartColors[colorCount % chartColors.length]

    // Push the next color from the chartColor list
    chart.data.datasets[0].backgroundColor.push(color)

    chart.update()
})
