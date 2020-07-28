const update = document.querySelector('#update-button');

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
            console.log(response);
        })
})