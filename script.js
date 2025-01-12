const expenseForm = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseCategoryInput = document.getElementById('expense-category');
    const expenseList = document.getElementById('expense-list');
    const totalAmountDisplay = document.getElementById('total-amount');

    let expenses = [];

    // Function to render expenses
    function renderExpenses() {
      expenseList.innerHTML = '';
      let totalAmount = 0;

      expenses.forEach((expense, index) => {
        totalAmount += expense.amount;

        const li = document.createElement('li');
        li.innerHTML = `
          <span>${expense.name} (${expense.category}) - Rs ${expense.amount.toFixed(2)}</span>
          <div>
            <button class="edit" data-index="${index}">Edit</button>
            <button class="delete" data-index="${index}">Delete</button>
          </div>
        `;

        expenseList.appendChild(li);
      });

      totalAmountDisplay.textContent = `Rs ${totalAmount.toFixed(2)}`;
    }

    // Add Expense
    expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = expenseNameInput.value.trim();
      const amount = parseFloat(expenseAmountInput.value);
      const category = expenseCategoryInput.value;

      if (name && !isNaN(amount) && amount > 0 && category) {
        expenses.push({ name, amount, category });
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
        expenseCategoryInput.value = '';
        renderExpenses();
      }
    });

    // Edit or Delete Expense
    expenseList.addEventListener('click', (e) => {
      const index = e.target.dataset.index;

      if (e.target.classList.contains('edit')) {
        const expense = expenses[index];
        expenseNameInput.value = expense.name;
        expenseAmountInput.value = expense.amount;
        expenseCategoryInput.value = expense.category;
        expenses.splice(index, 1);
        renderExpenses();
      }

      if (e.target.classList.contains('delete')) {
        expenses.splice(index, 1);
        renderExpenses();
      }
    });

    // Initial Render
    renderExpenses();