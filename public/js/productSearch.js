document.addEventListener('DOMContentLoaded', function() { 
	// listen for form submission
	let searchForm = document.getElementById('searchForm');
	searchForm.addEventListener('submit', function(event) {
		event.preventDefault();
		// get search text value
		let search = document.getElementById('product-text').value;
		// run the search api
		window.location.replace('/api/products/search/' + search);
		return false;
	}, false);
	let clearSearch = document.getElementById('clear');
	clearSearch.addEventListener('click', function(event) {
		event.preventDefault();
		// reset products page
		window.location.replace('/basicuser');
	});

});