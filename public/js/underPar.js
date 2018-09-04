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
function getVal(id) {
	return document.getElementById(`${id}`).value;
}