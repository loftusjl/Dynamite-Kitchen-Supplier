$('#submit-order').on('click', submitOrder);

document.addEventListener('DOMContentLoaded', function() {
	// listen for textbox change
	let qtyReq = document.getElementsByClassName('qtyRequested');
	for (i=0; i < qtyReq.length; i++) {
		let ordId = qtyReq[i].id;
		qtyReq[i].addEventListener('change', function() {
			newVal = getVal(ordId);
			$.ajax({
				headers: {'Content-Type':'application/json'},
				type: 'PUT',
				url: '/api/order/lineitem/' + this.id,
				data: JSON.stringify({
					olQuantity: newVal
				})
			})
				.then(function() {
					window.location.replace('/order');
				});
		});
	}
});
// delete products from order pending
$('.delete').on('click', function () {
	let id = $(this).attr('id');
	$.ajax('/api/supervisor/orderline/' + id, {
		type: 'DELETE'
	}).then(function () {
		window.location.replace('/order');
	});
});
function getVal(id) {
	return document.getElementById(`${id}`).value;
}
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
