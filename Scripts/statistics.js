let charts = []

function createChart() {
    charts.forEach((chart) => {
        chart.destroy()
    })
    charts = []
    document.querySelectorAll('canvas.chart').forEach((canvas) => {
        console.log(canvas.dataset.values)
        let up = (ctx, value) => ctx.p0.parsed.y < ctx.p1.parsed.y ? value : undefined
        let down = (ctx, value) => ctx.p0.parsed.y < ctx.p1.parsed.y ? value : undefined

        const genericOptions = {
            fill: false,
            interaction: {
                intersect: false
            },
            radius: 0,
            responsive: true,
            scales: {
                grid: {
                    borderColor: 'white'
                }
            },
            plugins: {
            legend: {
                display: false
            }
            }
        };

        let data = {
        labels: (canvas.dataset.type == 'daily') ? dailyValues : (canvas.dataset.type == 'weekly') ? weeklyValues : monthyValues,
        datasets: [{
            label: canvas.dataset.title,
            data: canvas.dataset.values.split(','),
            backgroundColor: [
            'rgba(255, 26, 104, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(0, 0, 0, 0.2)'
            ],
            borderColor: [
            'rgba(255, 26, 104, 1)',
            'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 3,
            tension: 0.1,
            segment : {
                borderColor: ctx => up(ctx, 'rgba(75, 192, 192, 1)') || down(ctx, 'rgba(255, 26, 104, 1)')
            },
            spanGaps: true
        }]
        };

        const config = {
        type: 'line',
        data,
        options: genericOptions
        };

        const myChart = new Chart(
            canvas,   
            config
        );
        charts.push(myChart)
    })
}

createChart()

document.querySelectorAll('.tab a').forEach((tab) => {
    let target = tab.href.split('#')[1]
    let mode = target.slice(0, -1)
    let number = target.charAt(target.length-1)
    tab.addEventListener('click', (event) => {
        let canvas = document.querySelector(`#${target} canvas`)
        for (let i = 1; i <= Number(canvas.dataset.tabs); i++) {
            let tempCanvas = document.querySelector(`#${canvas.dataset.chart}${i} canvas`)
            if (tempCanvas.classList.contains('chart')) {
                tempCanvas.classList.remove('chart')
            }
        }
        canvas.classList.add('chart')
        createChart()
        if (mode == 'Earning') {
            let switchText = document.querySelector('.earningSwitchText')
            let label = document.querySelector('.earningSwitchText h4')
            let money = document.querySelector('.earningSwitchText h3')
            let moneyValue = 0
            if (number == '1') {
                label.textContent = label.dataset.one+' Profit'
                money.textContent = money.dataset.one
                moneyValue = Number(money.dataset.one)
            }
            else if (number == '2') {
                label.textContent = label.dataset.two+' Profit'
                money.textContent = money.dataset.two
                moneyValue = Number(money.dataset.two)
            }
            else {
                label.textContent = label.dataset.three+' Profit'
                money.textContent = money.dataset.three
                moneyValue = Number(money.dataset.three)
            }
            if (moneyValue > 0) {
                if (switchText.classList.contains('N')) {
                    switchText.classList.remove('N')
                    switchText.classList.add('P')
                }
            }
            else {
                if (switchText.classList.contains('P')) {
                    switchText.classList.add('N')
                    switchText.classList.remove('P')
                }
            }
        }
        else if (mode == 'GP') {
            let switchText = document.querySelector('.GPSwitchText')
            let label = document.querySelector('.GPSwitchText h4')
            let money = document.querySelector('.GPSwitchText h3')
            let moneyValue = 0
            if (number == '1') {
                label.textContent = label.dataset.one+' Games Played'
                money.textContent = money.dataset.one
                moneyValue = Number(money.dataset.one)
            }
            else if (number == '2') {
                label.textContent = label.dataset.two+' Games Played'
                money.textContent = money.dataset.two
                moneyValue = Number(money.dataset.two)
            }
            else {
                label.textContent = label.dataset.three+' Games Played'
                money.textContent = money.dataset.three
                moneyValue = Number(money.dataset.three)
            }
            if (moneyValue > 0) {
                if (switchText.classList.contains('N')) {
                    switchText.classList.remove('N')
                    switchText.classList.add('P')
                }
            }
            else {
                if (switchText.classList.contains('P')) {
                    switchText.classList.add('N')
                    switchText.classList.remove('P')
                }
            }
        }
    })
})