document.addEventListener('DOMContentLoaded', function(event) { 
	event.preventDefault();
	console.log(search);
	let searchForm = document.getElementById('searchForm');
	searchForm.addEventListener('submit', function() {
		let search = document.getElementById('product-text').value;
		console.log('submit clicked: ', search);
		window.location.replace('/api/products/search/' + search);
		return false;
	}, false);
});