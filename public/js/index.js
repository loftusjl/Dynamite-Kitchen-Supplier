// initialize Modals
M.AutoInit();



$('#submit-product').on('click', submitProduct);

function submitProduct(data) {
	let prodID = document.getElementById('prodid').dataset.id;
	data = {
		olQuantity: document.getElementById('amtOrder').value, 
		prodID: prodID
	};
	if ('#product-to-submit') {
		$.ajax({
			headers: {
				'Content-Type': 'application/json'
			},
			type: 'POST',
			url: '/api/order/lineitem',
			data: JSON.stringify(data)
		}).then(function (event) {
			
			console.log('this.id', event);
			window.location.replace('/basicuser');
		});
	} else {
		alert('No items in queue!');
	}
}