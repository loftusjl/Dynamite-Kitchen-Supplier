//submit order, Post to api reload page
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
		
			window.location.replace('/order');
		});
	} else {
		alert('No items in que!');
	}
}
// search for old order line items and display in a modal
function orderHistoryDetail(data) {
	
	let id = $(this).attr('id');

	if ('#order-history') {
		$.ajax({
			headers: {
				'Content-Type': 'application/json'
			},
			type: 'GET',
			url: '/api/orders/summary/' + id,
			data: JSON.stringify(data)
		}).then(function (event) {
			console.log(event)
			for (let i = 0; i < event.length; i++) {
				let a = $('<tr>');
				let b = $('<td>')
				b.text(event[i].prodName);

				$(a).append(b)
				$('#modal-order-history').append(a)
			}
			
		});
	} else {
		alert('No items in que!');
	}
}
$('.order-detail').on('click', orderHistoryDetail);

$('#submit-order').on('click', submitOrder);

// delete products from order pending
$('.delete').on('click', function (event) {
	let id = $(this).attr('id');
	$.ajax("/api/supervisor/orderline/" + id, {
				type: "DELETE"
		}).then(function () {
			window.location.replace('/order');
	});
});

