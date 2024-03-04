function get_median_of_first_week_expenses(expenses) {
    let first_week_expenses = [];

    for (const month in expenses) {
        const days = expenses[month];

        for (const day in days) {
            const date = new Date(`${month}-${day}-2023`);
            if ((date.getDay() === 0 && parseInt(day) <= 7) || (date.getDay() === 1 && parseInt(day) <= 7)) {
                const categories = days[day];
                
                for (const category in categories) {
                    first_week_expenses.push(...categories[category]);
                }
            }
        }
    }

    first_week_expenses.sort((a, b) => a - b);

    const middle = Math.floor(first_week_expenses.length / 2);
    const median = first_week_expenses.length % 2 === 0 ?
                   (first_week_expenses[middle - 1] + first_week_expenses[middle]) / 2 :
                   first_week_expenses[middle];

    return median;
}


$(function() {
    $("#start_date").datepicker();
    $("#end_date").datepicker();

    $("#calculate_median").click(function() {
        const startDate = new Date($("#start_date").val());
        const endDate = new Date($("#end_date").val());
        const expensesInput = $("#expenses").val();
        const expenses = expensesInput.split(",").map(expense => parseFloat(expense.trim()));
        const median = get_median_of_first_week_expenses(startDate, endDate, expenses);
        $("#result").text("Median: " + median);
    });
});

function get_median_of_first_week_expenses(expenses) {
    let first_week_expenses = [];


    for (const month in expenses) {
        const days = expenses[month];

        for (const day in days) {

            if (day === "01" || new Date(`${month}-${day}-2023`).getDay() === 0) {
                const categories = days[day];
                
                for (const category in categories) {
                    first_week_expenses.push(...categories[category]);
                }
            }
        }
    }

    first_week_expenses.sort((a, b) => a - b);

    const middle = Math.floor(first_week_expenses.length / 2);
    const median = first_week_expenses.length % 2 === 0 ?
                   (first_week_expenses[middle - 1] + first_week_expenses[middle]) / 2 :
                   first_week_expenses[middle];

    return median;
}

const expenses = {
    "2023-01": {
        "01": {
            "food": [ 22.11, 43, 11.72, 2.2, 36.29, 2.5, 19 ],
            "fuel": [ 210.22 ]
        },
        "09": {
            "food": [ 11.9 ],
            "fuel": [ 190.22 ]
        }
    },
    "2023-03": {
        "07": {
            "food": [ 20, 11.9, 30.20, 11.9 ]
        },
        "04": {
            "food": [ 10.20, 11.50, 2.5 ],
            "fuel": []
        }
    },
    "2023-04": {}
};

console.log(get_median_of_first_week_expenses(expenses));