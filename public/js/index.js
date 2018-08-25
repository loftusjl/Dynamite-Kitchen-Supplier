<<<<<<< HEAD
// starting passport.js for login authentication
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(function(username, password, done) {
	User.findOne({ username: username }, function(err, user) {
		if (err) { return done(err); }
		if (!user) {
			return done(null, false, { message: 'Incorrect username.' });
		}
		if (!user.validPassword(password)) {
			return done(null, false, { message: 'Incorrect password.' });
		}
		return done(null, user);
	});
}
));
=======
// Get references to page elements
var $exampleText = $('#example-text');
var $exampleDescription = $('#example-description');
var $submitBtn = $('#submit');
var $exampleList = $('#product-list');


// The API object contains methods for each kind of request we'll make
var API = {
	saveExample: function(example) {
		return $.ajax({
			headers: {
				'Content-Type': 'application/json'
			},
			type: 'POST',
			url: 'api/products',
			data: JSON.stringify(example)
		});
	},
	getExamples: function() {
		return $.ajax({
			url: 'api/products',
			type: 'GET'
		});
	},
	deleteExample: function(id) {
		return $.ajax({
			url: 'api/products/' + id,
			type: 'DELETE'
		});
	}
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
	API.getExamples().then(function(data) {
		var $examples = data.map(function(example) {
			var $a = $('<a>')
				.text(example.text)
				.attr('href', '/example/' + example.id);

			var $li = $('<li>')
				.attr({
					class: 'list-group-item',
					'data-id': example.id
				})
				.append($a);

			var $button = $('<button>')
				.addClass('btn btn-danger float-right delete')
				.text('ｘ');

			$li.append($button);

			return $li;
		});

		$exampleList.empty();
		$exampleList.append($examples);
	});
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
	event.preventDefault();

	var example = {
		text: $exampleText.val().trim(),
		description: $exampleDescription.val().trim()
	};

	if (!(example.text && example.description)) {
		alert('You must enter an example text and description!');
		return;
	}

	API.saveExample(example).then(function() {
		refreshExamples();
	});

	$exampleText.val('');
	$exampleDescription.val('');
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
	var idToDelete = $(this).data('id');
	
	API.deleteExample(idToDelete).then(function() {
		location.reload();
	});
};


// Add event listeners to the submit and delete buttons
$submitBtn.on('click', handleFormSubmit);
$exampleList.on('click', '.delete', handleDeleteBtnClick);
>>>>>>> 6d6ea256593251e2b85cc46a5334339a08e3ecec
