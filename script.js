// Function to load existing entries from local storage
function loadEntries() {
    const positiveEntries = JSON.parse(localStorage.getItem('positiveEntries')) || [];
    const negativeEntries = JSON.parse(localStorage.getItem('negativeEntries')) || [];

    positiveEntries.forEach(entry => addRow('positive', entry.name, entry.number, true));
    negativeEntries.forEach(entry => addRow('negative', entry.name, entry.number, true));
}

// Function to add a new row to the specified table
function addRow(type, name, number, isExisting = false) {
    const table = document.getElementById(`${type}Table`).getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);

    cell1.innerHTML = `<input type="text" value="${name}" placeholder="Enter Name" ${isExisting ? 'readonly' : ''}>`;
    cell2.innerHTML = `<input type="number" value="${number}" placeholder="Enter Number" ${isExisting ? 'readonly' : ''}>`;
    cell3.innerHTML = '<button class="removeBtn">Remove</button>';

    // Enable the remove button
    newRow.querySelector('.removeBtn').addEventListener('click', function() {
        table.deleteRow(newRow.rowIndex - 1);
    });

    // Only enable the remove button for new rows (editable)
    if (!isExisting) {
        newRow.querySelector('.removeBtn').disabled = false;
    }
}

// Function to toggle edit mode based on login status
function toggleEditMode(isLoggedIn) {
    const addPositiveButton = document.getElementById('addPositive');
    const addNegativeButton = document.getElementById('addNegative');
    const publishChangesButton = document.getElementById('publishChanges');
    const removePublishedChangesButton = document.getElementById('removePublishedChanges');

    // If logged in, enable add buttons and publish/remove buttons
    if (isLoggedIn) {
        addPositiveButton.disabled = false;
        addNegativeButton.disabled = false;
        publishChangesButton.disabled = false;
        removePublishedChangesButton.disabled = false;
    } else {
        addPositiveButton.disabled = true;
        addNegativeButton.disabled = true;
        publishChangesButton.disabled = true;
        removePublishedChangesButton.disabled = true;
    }
}

// Login functionality
document.getElementById('loginBtn').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('loginMessage');

    if (username === 'dev' && password === 'devpassword') {
        message.textContent = 'Login successful!';
        toggleEditMode(true); // Enable editing
    } else {
        message.textContent = 'Incorrect Username or Password!';
    }
});

// Function to add a new editable Positive section
document.getElementById('addPositive').addEventListener('click', function() {
    addRow('positive', '', ''); // Pass empty strings for new entries
});

// Function to add a new editable Negative section
document.getElementById('addNegative').addEventListener('click', function() {
    addRow('negative', '', ''); // Pass empty strings for new entries
});

// Publish Changes functionality
document.getElementById('publishChanges').addEventListener('click', function() {
    const positiveRows = document.getElementById('positiveTable').getElementsByTagName('tbody')[0].rows;
    const negativeRows = document.getElementById('negativeTable').getElementsByTagName('tbody')[0].rows;

    const positiveEntries = [];
    const negativeEntries = [];

    // Store positive entries
    for (let row of positiveRows) {
        const name = row.cells[0].querySelector('input').value;
        const number = row.cells[1].querySelector('input').value;
        if (name && number) {
            positiveEntries.push({ name, number });
        }
    }

    // Store negative entries
    for (let row of negativeRows) {
        const name = row.cells[0].querySelector('input').value;
        const number = row.cells[1].querySelector('input').value;
        if (name && number) {
            negativeEntries.push({ name, number });
        }
    }

    // Save to local storage
    localStorage.setItem('positiveEntries', JSON.stringify(positiveEntries));
    localStorage.setItem('negativeEntries', JSON.stringify(negativeEntries));
});

// Remove Published Changes functionality
document.getElementById('removePublishedChanges').addEventListener('click', function() {
    localStorage.removeItem('positiveEntries');
    localStorage.removeItem('negativeEntries');
    // Clear the tables
    document.getElementById('positiveTable').getElementsByTagName('tbody')[0].innerHTML = '';
    document.getElementById('negativeTable').getElementsByTagName('tbody')[0].innerHTML = '';
});

// Load entries on page load
window.onload = function() {
    loadEntries();
    toggleEditMode(false); // Start in view mode
};
