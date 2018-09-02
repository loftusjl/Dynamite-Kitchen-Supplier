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

			window.location.replace('/api/orders');
		})
	} else {
		alert('No items in que!');
	}
}

$('#submit-order').on('click', submitOrder);
