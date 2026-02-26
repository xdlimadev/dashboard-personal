let donutChart = null;
let lineChart = null;

async function loadStats() {
    try {
        const response = await fetch(`${API_URL}/tasks/stats.php`, {
            credentials: 'include'
        });
        if (!response.ok) throw new Error('Error al cargar estadísticas');
        
        const data = await response.json();
        createDonutChart(data);
        createLineChart(data);
    } catch (error) {
        console.error('Error cargando estadísticas: ', error)
    }

}

function createDonutChart(data) {
    const ctx = document.getElementById('chart-donut')
    if (donutChart) donutChart.destroy();

    donutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Pendientes', 'En progreso', 'Completadas'],
            datasets: [{
                data: [data.pending, data.progress, data.completed],
                backgroundColor: [
                    'rgba(255, 167, 38, 0.8)',
                    'rgba(66, 165, 245, 0.8)',
                    'rgba(102, 187, 106, 0.8)'
                ],
                borderWidth: 2,
                borderColor: '#FFFFFF',
                hoverBorderWidth: 2,
                hoverBorderColor: '#FFFFFF'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#FFFFFF',
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        padding: 15,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

function createLineChart(data) {
    const ctx = document.getElementById('chart-lines');

    if (lineChart) {
        lineChart.destroy();
    }
    const labels = data.timeline.map(item => {
        const date = new Date(item.date);
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    });

    const counts = data.timeline.map(item => item.count);

    lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tareas completadas',
                data: counts,
                borderColor: '#66BB6A',
                backgroundColor: 'rgba(102, 187, 106, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,  // Curva suave
                pointBackgroundColor: '#66BB6A',
                pointBorderColor: '#FFFFFF',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#FFFFFF',
                        stepSize: 1
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#FFFFFF'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}