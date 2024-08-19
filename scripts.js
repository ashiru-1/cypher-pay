document.addEventListener('DOMContentLoaded', function () {
    const accountBalanceElement = document.getElementById('account-balance');
    const billForm = document.getElementById('bill-form');
    const transferForm = document.getElementById('transfer-form');
    const transactionList = document.getElementById('transaction-list');
    const currencySelector = document.getElementById('currency');
    const accountSelector = document.getElementById('account');

    // Initial Balances for Checking and Savings in USD
    let balances = {
        checking: 12345.67,
        savings: 6789.01
    };

    // Conversion Rates (1 USD to GBP)
    const usdToGbp = 0.75;

    // Current Currency and Account Type
    let currentCurrency = 'usd';
    let currentAccountType = 'checking';

    // Update Balance Display
    function updateBalanceDisplay() {
        let displayedBalance = balances[currentAccountType];

        if (currentCurrency === 'gbp') {
            displayedBalance *= usdToGbp;
            accountBalanceElement.textContent = `£${displayedBalance.toFixed(2)}`;
        } else {
            accountBalanceElement.textContent = `$${displayedBalance.toFixed(2)}`;
        }
    }

    // Handle Account Switch
    accountSelector.addEventListener('change', function (event) {
        currentAccountType = event.target.value;
        updateBalanceDisplay();
    });

    // Handle Bill Payment
    billForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const billAmount = parseFloat(document.getElementById('amount').value);
        const billType = document.getElementById('bill').value;

        if (!isNaN(billAmount) && billAmount > 0 && billAmount <= balances[currentAccountType]) {
            balances[currentAccountType] -= billAmount;

            const newTransaction = document.createElement('li');
            newTransaction.textContent = `Payment for ${billType.charAt(0).toUpperCase() + billType.slice(1)} - $${billAmount.toFixed(2)}`;
            transactionList.prepend(newTransaction);

            updateBalanceDisplay();
        } else {
            alert('Insufficient funds or invalid amount.');
        }

        billForm.reset();
    });

    // Handle Transfer
    transferForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const transferAmount = parseFloat(document.getElementById('transfer-amount').value);
        const recipient = document.getElementById('transfer-to').value;

        if (!isNaN(transferAmount) && transferAmount > 0 && transferAmount <= balances[currentAccountType]) {
            balances[currentAccountType] -= transferAmount;

            const newTransaction = document.createElement('li');
            newTransaction.textContent = `Transfer to ${recipient} - $${transferAmount.toFixed(2)}`;
            transactionList.prepend(newTransaction);

            updateBalanceDisplay();
        } else {
            alert('Insufficient funds or invalid amount.');
        }

        transferForm.reset();
    });

    // Handle Currency Switch
    currencySelector.addEventListener('change', function (event) {
        currentCurrency = event.target.value;
        updateBalanceDisplay();
    });

    // Initialize
    updateBalanceDisplay();
});
