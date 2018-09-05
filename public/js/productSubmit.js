data = [{
	olQuantity: , 
	prodID: , 
	OrderId:
}]
$('#submit-product').on('click', submitProduct);

function submitProduct(data) {
	console.log('this.id ' + data)
    if ('#product-to-submit') {
		$.ajax({
			headers: {
				'Content-Type': 'application/json'
			},
			type: 'POST',
			url: '/api/order/lineitem',
			data: JSON.stringify(data)
		}).then(function (event) {
			
			console.log('this.id' + event)
			window.location.replace('/basicuser');
		});
	} else {
		alert('No items in que!');
	}
}
