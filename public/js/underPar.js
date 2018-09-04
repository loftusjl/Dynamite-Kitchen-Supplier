document.addEventListener('DOMContentLoaded', function () {
	// listen for textbox change
	let qtyReq = document.getElementsByClassName('qtyRequested');
	for (i = 0; i < qtyReq.length; i++) {
		let ordId = qtyReq[i].id;
		qtyReq[i].addEventListener('change', function () {
			defVal = getDefault(ordId);
			newVal = getVal(ordId);
			prodID = getProdID(ordId);
			olID = getOlID(ordId);
			if (typeof defVal !== 'undefined') {
				$.ajax({
					headers: {
						'Content-Type': 'application/json'
					},
					type: 'PUT',
					url: '/api/order/lineitem/' + olID,
					data: JSON.stringify({
						olQuantity: newVal
					})
				})
					.then(function () {
						window.location.replace('/underpar');
					});
			} else {
				$.ajax({
					headers: {
						'Content-Type': 'application/json'
					},
					type: 'POST',
					url: '/api/order/lineitem/',
					data: JSON.stringify({
						olQuantity: newVal,
						prodID: prodID
					})
				})
					.then(function () {
						window.location.replace('/underpar');
					});
			}

		});
	}
});

function getVal(id) {
	return document.getElementById(`${id}`).value;
}

function getProdID(id) {
	return document.getElementById(`${id}`).dataset.prodid;
}
function getDefault(id) {
	return document.getElementById(`${id}`).defaultValue;
}
function getOlID(id) {
	return document.getElementById(`${id}`).dataset.olid;
}