document.addEventListener('DOMContentLoaded', function() {
	// listen for textbox change
	let prodName = document.getElementsByClassName('prodName');
	for (i=0; i < prodName.length; i++) {
		if (prodName) {console.log('Product ID ', prodName[i].dataset.prodid);}
	}
	let qtyReq = document.getElementsByClassName('qtyRequested');
	for (i=0; i < qtyReq.length; i++) {
		let ordId = qtyReq[i].id;
		qtyReq[i].addEventListener('change', function() {
			newVal = getVal(ordId);
			console.log('prodID: ', getElementById(`order-${this.id}`).dataset.prodid);
			// $.ajax({
			// 	headers: {'Content-Type':'application/json'},
			// 	type: 'PUT',
			// 	url: '/api/order/lineitem/' + this.id,
			// 	data: JSON.stringify({
			// 		olQuantity: newVal,
			// 		prodID: getElementById(`order-${this.id}`).dataset.prodid,

			// 	})
			// })
			// 	.then(function() {
			// 		window.location.replace('/underpar');
			// 	});
		});
	}
});
function getVal(id) {
	return document.getElementById(`${id}`).value;
}