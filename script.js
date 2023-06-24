document.addEventListener('DOMContentLoaded', () => {
    const rowsList = document.getElementById('rows-list');
    const keyInput = document.getElementById('key-input');
    const valueInput = document.getElementById('value-input');
    const insertButton = document.getElementById('insert-button');

    // Function to fetch and display rows
    const fetchData = () => {
        axios.get('/get')
            .then(response => {
                const rows = response.data;
                rowsList.innerHTML = '';

                rows.forEach(row => {
                    const li = document.createElement('li');
                    const spanKey = document.createElement('span');
                    const spanValue = document.createElement('span');
                    const deleteButton = document.createElement('button');

                    spanKey.innerText = row.key + ': ';
                    spanValue.innerText = row.value;
                    deleteButton.innerText = 'Delete';

                    deleteButton.addEventListener('click', () => deleteRow(row.key));

                    li.appendChild(spanKey);
                    li.appendChild(spanValue);
                    li.appendChild(deleteButton);
                    rowsList.appendChild(li);
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Function to insert a new row
    const insertRow = () => {
        const key = keyInput.value.trim();
        const value = valueInput.value.trim();

        if (key && value) {
            axios.post('/insert', { key, value })
                .then(() => {
                    keyInput.value = '';
                    valueInput.value = '';
                    fetchData();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    // Function to delete a row
    const deleteRow = (key) => {
        axios.post('/delete', { key })
            .then(() => {
                fetchData();
            })
            .catch(error => {
                console.log(error);
            });
    };

    // Fetch initial rows
    fetchData();

    // Event listener for insert button click
    insertButton.addEventListener('click', insertRow);
});
