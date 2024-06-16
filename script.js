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

    renderChart(investedAmount, estimatedReturns);
}

function renderChart(investedAmount, estimatedReturns) {
    const ctx = document.getElementById('sipChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Invested Amount', 'Estimated Returns'],
            datasets: [{
                data: [investedAmount, estimatedReturns],
                backgroundColor: ['#007bff', '#28a745']
            }]
        },
        options: {
            responsive: true
        }
    });
}
