$('#submit-product').on('click', submitProduct);



function submitProduct(data) {
    if (this.id) {
        $.ajax({
            headers: {
                'Content-Type': 'application/json'
			},
			type: 'POST',
			url: '/api/order/lineitem',
			data: JSON.stringify(data)
		}).then(function (event) {
            console.log('this.id' + this.id)
		
			// window.location.replace('/order');
		});
	} else {
		alert('No items in que!');
	}
}
