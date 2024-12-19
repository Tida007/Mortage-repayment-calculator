export function calculateMortgage() {
    let mortgageAmount = parseFloat(
        document.getElementById("mortgage-amount").value
    );
    const mortgageTerm = parseFloat(
        document.getElementById("mortgage-term").value
    );
    const interestRate = parseFloat(
        document.getElementById("interest-rate").value
    );

    const selectedType = document.querySelector(
        'input[name="mortgage-type"]:checked'
    );

    if (
        isNaN(mortgageAmount) ||
        isNaN(mortgageTerm) ||
        isNaN(interestRate) ||
        !selectedType
    ) {
        console.error("invalid input");
        return;
    }

    const interestRatePercent = interestRate / 100;
    const monthlyInterestRate = interestRatePercent / 12;
    const numberOfPayments = mortgageTerm * 12;

    let monthlyPayment = 0;
    let totalPayment = 0;

    if (selectedType.value === "repayment") {
        monthlyPayment =
            (mortgageAmount *
                (monthlyInterestRate *
                    Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
            (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
        totalPayment = monthlyPayment * numberOfPayments;
    } else if (selectedType.value === "interest-only") {
        monthlyPayment = mortgageAmount * monthlyInterestRate;
        totalPayment = monthlyPayment * numberOfPayments + mortgageAmount;
    }

    document.getElementById("monthly-payments").textContent =
        "£" + monthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById("total-payment").textContent =
        "£" + totalPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}