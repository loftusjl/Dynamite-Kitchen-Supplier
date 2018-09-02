$(document).ready(function () {

	edits = [];

	function editUsers() {
		event.preventDefault();


		console.log('edit', this);
		$('#userInfo').empty();

		$.ajax({
			url: 'api/users',
			type: 'GET'
		}).then(function () {
			
			for (let i = 0; i < edits.length; i++) {
				let a = $('<td>');
				let b = $('<input>');
				b.attr('id', `${edit.id}`);


			}
		});

	}

	$('.edit').on('click', editUsers);

});