document.addEventListener('DOMContentLoaded', function () {
	// listen for form submission
	let searchForm = document.getElementById('searchForm');
	searchForm.addEventListener('submit', function (event) {
		event.preventDefault();
		// get search text value
		let search = document.getElementById('product-text').value;
		$('tbody').empty();
		$('.progress1').addClass('progress');
		$('.indeterminate1').addClass('indeterminate');

		if (!search) {
			// if search form is empty query search all
			setTimeout(function() {
				$('.progress1').removeClass('progress');
				$('.indeterminate1').removeClass('interminate');
				window.location.replace('/api/products/');
				
			},2000);
		} else {
			// run the search api
			setTimeout(function() {
				$('.progress1').removeClass('progress');
				$('.indeterminate1').removeClass('interminate');
				window.location.replace('/api/products/search/' + search);
			
			},2000);
		}

		return false;
	}, false);
	let clearSearch = document.getElementById('clear');
	clearSearch.addEventListener('click', function (event) {
		event.preventDefault();
		// reset products page
		window.location.replace('/basicuser');
	});

});
	