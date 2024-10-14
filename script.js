// Login functionality
document.getElementById('loginBtn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('loginMessage');

    if (username === 'Dave','Thomas' && password === 'Dave123Dave','Thomas123Thomas') {
        message.textContent = 'Login successful!';
        document.getElementById('addPositive').disabled = false;
        document.getElementById('removePositive').disabled = false;
        document.getElementById('addNegative').disabled = false;
        document.getElementById('removeNegative').disabled = false;
    } else {
        message.textContent = 'Incorrect Username or Password!';
    }
});

// Function to add rows to Positive table
document.getElementById('addPositive').addEventListener('click', function() {
    const table = document.getElementById('positiveTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);

    cell1.innerHTML = '<input type="text" placeholder="Enter Name">';
    cell2.innerHTML = '<input type="number" placeholder="Enter Number">';
});

// Function to remove rows from Positive table
document.getElementById('removePositive').addEventListener('click', function() {
    const table = document.getElementById('positiveTable').getElementsByTagName('tbody')[0];
    if (table.rows.length > 1) {
        table.deleteRow(-1);
    }
});

// Function to add rows to Negative table
document.getElementById('addNegative').addEventListener('click', function() {
    const table = document.getElementById('negativeTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);

    cell1.innerHTML = '<input type="text" placeholder="Enter Name">';
    cell2.innerHTML = '<input type="number" placeholder="Enter Number">';
});

// Function to remove rows from Negative table
document.getElementById('removeNegative').addEventListener('click', function() {
    const table = document.getElementById('negativeTable').getElementsByTagName('tbody')[0];
    if (table.rows.length > 1) {
        table.deleteRow(-1);
    }
});
