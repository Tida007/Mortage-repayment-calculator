import { calculateMortgage } from "./cal.js";

/*  UI related code*/
const resetButton = document.querySelector(".cal_clear");
const result = document.querySelector(".cal_results-result");
const empty = document.querySelector(".cal_results-empty");
const form = document.querySelector(".cal_form");
const mortgageAmount = parseFloat(
    document.getElementById("mortgage-amount").value.replace(/,/g, "")
);

export function initializeValidator() {
    const validator = new JustValidate(".cal_form", {
        errorFieldCssClass: "error",
    });

    validator
        .addField("#mortgage-amount", [
            {
                rule: "required",
                errorMessage: "This field is required",
            },
            {
                rule: "number",
                errorMessage: "Please enter a valid number",
            },
            {
                rule: "minNumber",
                value: 4000,
                errorMessage: "The minimum value is £4,000",
            },
            {
                rule: "maxNumber",
                value: 1000000,
                errorMessage: "The maximum value is £1,000,000",
            },
        ])
        .addField("#mortage-term", [
            {
                rule: "required",
                errorMessage: "This field is required",
            },
            {
                rule: "integer",
                errorMessage: "Please enter a valid number",
            },
            {
                rule: "minNumber",
                value: 5,
                errorMessage: "The minimum number is 5 years",
            },
            {
                rule: "maxNumber",
                value: 40,
                errorMessage: "The maximum number is 40 years",
            },
        ])
        .addField("#interest-rate", [
            {
                rule: "required",
                errorMessage: "This field is required",
            },
            {
                rule: "number",
                errorMessage: "Please enter a valid number",
            },
            {
                rule: "minNumber",
                value: 1,
                errorMessage: "The minimum value is 1%"
            },
            {
                rule: "maxNumber",
                value: 10,
                errorMessage: "The maximum number is 10%",
            },
        ])
        .addRequiredGroup(".radio-group", "This field is required")
    
        .onSuccess((event) => {
            event.preventDefault();

            result.classList.remove("hidden");
            empty.classList.add("hidden");
            calculateMortgage();
        });
    
    resetButton.addEventListener("click", () => {
        result.classList.add("hidden");
        empty.classList.remove("hidden");
        form.reset();
    });
}