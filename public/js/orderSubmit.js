function submitOrder(data) {
    if ('#order-list') {
        $.ajax({
            headers: {
                'Content-Type': 'application/json'
            },
            type: 'POST',
            url: '/api/supervisor/order',
            data: JSON.stringify(data)
        }).then(function (event) {
            console.log(event)
            window.location.replace('/order');
        })
    } else {
        alert('No items in que!');
    }
}

$('#submit-order').on('click', submitOrder);
