const API_URL = "http://localhost:3000/api/expenses";
// Get elements from HTML
const expensesTable = document.getElementById("expensesTable");
const totalAmount = document.getElementById("totalAmount");
const expenseCount = document.getElementById("expenseCount");
const highestAmount = document.getElementById("highestAmount");
const highestTitle = document.getElementById("highestTitle");
const filterCategory = document.getElementById("filterCategory");

const expenseForm = document.getElementById("expenseForm");
const titleInput = document.getElementById("titleInput");
const amountInput = document.getElementById("amountInput");
const categoryInput = document.getElementById("categoryInput");
const dateInput = document.getElementById("dateInput");

//Edit Modal
const editExpenseForm = document.getElementById("editExpenseForm");
const editTitle = document.getElementById("editTitle");
const editAmount = document.getElementById("editAmount");
const editCategory = document.getElementById("editCategory");
const editDate = document.getElementById("editDate");


////////////////Spinner
const loadingSpinner = document.getElementById("loadingSpinner");
function showSpinner() {
    loadingSpinner.style.display = "block";
}

function hideSpinner() {
    loadingSpinner.style.display = "none";
}

///////////////////////////////////////

async function getExpenses() {

    showSpinner();

    try {
        const response = await fetch(API_URL); //send get request to backend
        if (!response.ok) {
            throw new Error(" Failed to load expenses");
        }
        const expenses = await response.json();
        displayExpenses(expenses);
        updateSummary(expenses);

    } catch (error) {
        console.error(error);
        alert("Could not connect to the server.Please try again. ");

    }
     hideSpinner();
}

function displayExpenses(expenses) {
    expensesTable.innerHTML = "";
    if (expenses.length === 0) {
        expensesTable.innerHTML = `
        <tr>
         <td  colspan="5" class="text-center">
         No expenses found
         </td>
        </tr>
        `;
    }
    expenses.forEach(expense => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${expense.title}</td>
        <td>${Number(expense.amount).toFixed(2)}</td>
        <td><span class="badge ${getCategoryColor(expense.category)}">${expense.category}</span></td>
        <td>${expense.date}</td>
        <td>
        <button class="btn btn-sm btn-outline-secondary edit-btn" type="button" data-id="${expense.id}" >
         Edit
        </button>
        <button class="btn btn-sm btn-outline-danger"type="button" onclick="deleteExpense(${expense.id})">
         Delete
        </button>
        </td>
        `;
        expensesTable.appendChild(row);

    });

}
document.addEventListener("click", async function (event) {

    if (event.target.classList.contains("edit-btn")) {

        const expenseId = event.target.dataset.id;

        try {
            const response = await fetch(`${API_URL}/${expenseId}`);

            const expense = await response.json();

            if (!response.ok) {
                throw new Error(expense.message || "Failed to load expense");
            }

            editTitle.value = expense.title;
            editAmount.value = expense.amount;
            editCategory.value = expense.category;
            editDate.value = expense.date;

            editExpenseForm.dataset.id = expense.id;

            const modal = new bootstrap.Modal(
                document.getElementById("editExpenseModal")
            );

            modal.show();

        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }
});

editExpenseForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const expenseId = editExpenseForm.dataset.id;

    const updatedExpense = {
        title: editTitle.value.trim(),
        amount: Number(editAmount.value),
        category: editCategory.value,
        date: editDate.value
    };

    if (
        !updatedExpense.title ||
        !updatedExpense.amount ||
        updatedExpense.amount <= 0 ||
        !updatedExpense.category ||
        !updatedExpense.date
    ) {
        alert("Please fill in all fields correctly.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${expenseId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedExpense)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to update expense");
        }

        await getExpenses();

        const modalElement = document.getElementById("editExpenseModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        alert("Expense updated successfully!");

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});


function getCategoryColor(category) {
    if (category === "Food") {
        return "bg-success";
    }
    if (category === "Transport") {
        return "bg-primary";
    }
    if (category === "Bills") {
        return "bg-warning text-dark"
    }
    if (category === "Entertainment") {
        return "bg-info text-dark"
    }
    else {
        return "bg-secondary"
    }
}

function updateSummary(expenses) {
    let total = 0;
    let highest = 0;
    let hieghstExpenseTitle = "";  // Name (Title) of highest expense
    expenses.forEach(expense => {
        const amount = Number(expense.amount);
        total += amount;
        if (amount > highest || hieghstExpenseTitle === "") {
            highest = amount;
            hieghstExpenseTitle = expense.title;
        }
    });
    totalAmount.textContent = total.toFixed(2); //update total
    expenseCount.textContent = expenses.length; //update number of expenses
    highestAmount.textContent = highest.toFixed(2); //update highest of expense
    highestTitle.textContent = hieghstExpenseTitle;
}
getExpenses(); //load expenses

async function addExpense(expense) {
    try {
        const response = await fetch(API_URL, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(expense)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new error(data.message || "Failed to add expense");
        }
        await getExpenses();//reload expenses after adding
        expenseForm.reset(); //clear form after successfully addind
        alert("Expense added successfully");


    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

expenseForm.addEventListener("submit", async function (event) {
    event.preventDefault(); //refuses reload page
    const expense = {
        title: titleInput.value.trim(),
        amount: Number(amountInput.value),
        category: categoryInput.value,
        date: dateInput.value
    };
    if (!expense.title || !expense.amount || expense.amount <= 0 || !expense.category || !expense.date) {
        alert("Please fill all fields correctly.");
        return;
    }
    await addExpense(expense);
});

async function deleteExpense(id) {
    showSpinner();
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "delete"
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to delete expense");
        }
        await getExpenses();
        alert("Expense delete successfully");
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
    hideSpinner();
}

filterCategory.addEventListener("change", async function () {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) { throw new Error("Failed to fetch"); }
        const expenses = await response.json();
        const selectedCategory = filterCategory.value;
        if (selectedCategory === "All") {
            displayExpenses(expenses);
        }
        else {
            const filteredExpense = expenses.filter(expense =>
                expense.category === selectedCategory
            );
            displayExpenses(filteredExpense);
        }

    } catch (error) {
        console.error(error);
        alert("An error occurred while retrieving expenses.");
    }


});
//Dark Mode
const darkModeToggle=document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click",function(){
    document.body.classList.toggle("dark-mode");
    if(document.body.classList.contains("dark-mode")){
        darkModeToggle.textContent="☀";
    }else{darkModeToggle.textContent="🌙"}
});
