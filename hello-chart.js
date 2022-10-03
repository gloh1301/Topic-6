let canvas = document.querySelector('#soda-chart')
let ctx = canvas.getContext('2d')

chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Coke", "Pepsi", "Sprite", "Either", "Neither"],
        datasets: [{
            label: 'Number of votes',
            data: [18, 14, 12, 7, 10],   // this is the chart data
            backgroundColor: ['red', 'blue', 'yellowgreen', 'yellow', 'green']
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
