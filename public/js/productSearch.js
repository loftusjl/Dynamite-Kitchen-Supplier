document.addEventListener('DOMContentLoaded', function() { 
	let searchForm = document.getElementById('searchForm');
	searchForm.addEventListener('submit', function(event) {
		let search = document.getElementById('product-text').value;
		event.preventDefault();
		console.log('submit clicked: ', search);
		window.location.replace('/api/products/search/' + search);
		return false;
	}, false);
});