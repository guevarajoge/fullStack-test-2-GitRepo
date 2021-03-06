const update = document.querySelector('#update-button');
const deleteButton = document.querySelector('#delete-button');
const messageDiv = document.querySelector('#message');


update.addEventListener('click', _ => {
    //send put request here
    fetch('quotes', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Dark Vadar',
                quote: 'I find your lack of faith disturbing.'
            })
        })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            window.location.reload(true);
        })
})

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Dark Vadar'
            })
        })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            if (response === 'No quote delete') {
                messageDiv.textContent = 'No Dark Vadar quote to delete'
            } else {
                window.location.reload()
            }
        })
        .catch()
})