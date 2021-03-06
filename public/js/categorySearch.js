$(document).ready(function () {
	// small array of category ids to use for search
	catBtn = [
		'Produce',
		'Meat',
		'Grocery',
		'Seafood',
		'Dairy',
		'Beverage',
		'Alcohol',
		'Equipment'
	];
	// function to render dropdown categories
	function renderChoices() {

		$('#dropdown1').empty();

		for (let i = 0; i < catBtn.length; i++) {
			let a = $('<li>');
			a.attr('id', `${catBtn[i]}`);
			a.addClass('left category');
			a.attr('data-name', catBtn[i]);
			a.text(catBtn[i]);
			$('#dropdown1').append(a);
		}
	}

	renderChoices();
	// jquery event listener to call search based on category selected
	$('.category').on('click', function (event) {
		event.preventDefault();
		$('tbody').empty()
		let search = $(this).attr('id');
		
		$('.progress1').addClass('progress');
		$('.indeterminate1').addClass('indeterminate');
		
		setTimeout(function() {
			$('.progress1').removeClass('progress');
			$('.indeterminate1').removeClass('interminate');
			window.location.replace('/api/products/category/' + search);
		},2000);
	});
});

