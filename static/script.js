function getLast7DaysData() {
    fetch('/api/covid')
        .then(response => response.json())
        .then(data => {
            displayData(data);
        })
        .catch(error => console.error('Error:', error));
}

function getDataByState() {
    // Get the form and check validity
    var form = document.getElementById('dataForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return; // Stop here if form is not valid
    }

    const state = document.getElementById('states').value;
    const start_date = document.getElementById('start_date').value.replace(/-/g, '');
    const end_date = document.getElementById('end_date').value.replace(/-/g, '');
    if (end_date<start_date){
        alert("End Date cannot be before Start Date")
        return;
    }
    const data = {
        state: state,
        start_date: start_date,
        end_date: end_date
    };

    console.log('Request Data:', data);

    fetch('/api/covid', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json().catch(() => {
            throw new Error('Invalid JSON response');
        });
    })
    .then(data => {
        displayData(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function convertDate(dateString) {
    // Parsing the input string
    console.log(typeof (dateString))
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);

    // Create a new Date object (to display in a readalble format)
    const date = new Date(year, month - 1, day);

    // Options for formatting the date
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    // Return the formatted date
    return date.toLocaleDateString(undefined, options);
}


function displayData(data) {
    const dataDiv = document.getElementById('data');
    let content = "<h2>Results:</h2>";

    content += '<table class="table">';
    content += '<thead class="thead-dark">';
    content += '<tr>';
    content += '<th scope="col">Date</th>';
    content += '<th scope="col">Positive Cases</th>';
    content += '<th scope="col">Negative Cases</th>';
    content += '</tr>';
    content += '</thead>';
    content += '<tbody>';

    // Creating a row for each item
    data.forEach(item => {
        let readableDate = convertDate(item.date.toString());
        content += `<tr>`;
        content += `<td>${readableDate}</td>`;
        content += `<td>${item.positive}</td>`;
        content += `<td>${item.negative}</td>`;
        content += `</tr>`;
    });

    content += '</tbody>';
    content += '</table>';

    // Set the innerHTML of the dataDiv to the newly created table
    dataDiv.innerHTML = content;
}

