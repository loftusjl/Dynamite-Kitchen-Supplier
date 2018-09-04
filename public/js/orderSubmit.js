$('#submit-order').on('click', submitOrder);

document.addEventListener('DOMContentLoaded', function() {
	// listen for textbox change
	let qtyReq = document.getElementsByClassName('qtyRequested');
	let nameReq = document.getElementsByClassName('nameEdit');
	let roleReq = document.getElementsByClassName('roleEdit');
	let phoneReq = document.getElementsByClassName('phoneEdit');
	let emailReq = document.getElementsByClassName('emailEdit');
	let passwordReq = document.getElementsByClassName('passwordEdit');

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

	for (i=0; i < nameReq.length; i++) {
		let ordId = nameReq[i].id;
		nameReq[i].addEventListener('change', function() {
			newVal = getVal(ordId);
			$.ajax({
				headers: {'Content-Type':'application/json'},
				type: 'PUT',
				url: '/api/users/edit/' + this.id,
				data: JSON.stringify({
					usName: newVal
					// usPhone: newVal,
					// usStreet: newVal,
					// usCity: newVal,
					// usState: newVal,
					// usZip: newVal,
					// usRole: newVal,
					// usEmail: newVal,
					// usPassword: newVal,
					// usStatus: newVal
				})
			})
				.then(function() {
					window.location.replace('/user');
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
