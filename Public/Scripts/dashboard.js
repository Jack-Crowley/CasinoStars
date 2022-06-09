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
labels: weeklyValues,
datasets: [{
    label: 'Weekly Profit',
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
document.querySelector('canvas.chart'),
config
);