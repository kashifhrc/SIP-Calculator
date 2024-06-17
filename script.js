let pieChart;  // Declare a variable to hold the pie chart instance
let lineChart; // Declare a variable to hold the line chart instance

function calculateSIP() {
    let monthlyInvestment = document.getElementById("monthlyInvestment").value;
    let annualReturn = document.getElementById("annualReturn").value;
    let years = document.getElementById("years").value;

    let monthlyRate = (annualReturn / 100) / 12;
    let months = years * 12;

    let totalValue = monthlyInvestment * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate);
    let investedAmount = monthlyInvestment * months;
    let estimatedReturns = totalValue - investedAmount;

    document.getElementById("investedAmount").innerText = investedAmount.toFixed(2);
    document.getElementById("estimatedReturns").innerText = estimatedReturns.toFixed(2);
    document.getElementById("totalValue").innerText = totalValue.toFixed(2);

    renderPieChart(investedAmount, estimatedReturns);
    renderLineChart(monthlyInvestment, annualReturn, years);
}

function renderPieChart(investedAmount, estimatedReturns) {
    const ctx = document.getElementById('sipPieChart').getContext('2d');
    
    // Destroy the previous chart instance if it exists
    if (pieChart) {
        pieChart.destroy();
    }
    
    // Create a new chart instance
    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Invested Amount', 'Estimated Returns'],
            datasets: [{
                data: [investedAmount, estimatedReturns],
                backgroundColor: ['#007bff', '#28a745'],
                hoverBackgroundColor: ['#0056b3', '#1c7430']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'INR'
                            }).format(context.raw);
                            return label;
                        }
                    }
                },
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });
}

function renderLineChart(monthlyInvestment, annualReturn, years) {
    const ctx = document.getElementById('sipLineChart').getContext('2d');
    
    // Destroy the previous chart instance if it exists
    if (lineChart) {
        lineChart.destroy();
    }

    let labels = [];
    let totalValues = [];
    let investedAmounts = [];

    let monthlyRate = (annualReturn / 100) / 12;
    let totalValue = 0;
    let investedAmount = 0;

    for (let year = 1; year <= years; year++) {
        labels.push(year);
        investedAmount += monthlyInvestment * 12;
        totalValue = monthlyInvestment * (((1 + monthlyRate) ** (year * 12) - 1) / monthlyRate) * (1 + monthlyRate);
        investedAmounts.push(investedAmount);
        totalValues.push(totalValue);
    }

    // Create a new chart instance
    lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Invested Amount',
                    data: investedAmounts,
                    borderColor: '#007bff',
                    fill: false,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#007bff',
                    pointBorderColor: '#007bff',
                    pointHoverRadius: 7,
                    pointHoverBackgroundColor: '#007bff',
                    pointHoverBorderColor: '#007bff'
                },
                {
                    label: 'Total Value',
                    data: totalValues,
                    borderColor: '#28a745',
                    fill: false,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#28a745',
                    pointBorderColor: '#28a745',
                    pointHoverRadius: 7,
                    pointHoverBackgroundColor: '#28a745',
                    pointHoverBorderColor: '#28a745'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Years'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Value (₹)'
                    }
                }
            },
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    });
}
