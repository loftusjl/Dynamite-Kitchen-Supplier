var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var db = require('../models');
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe('GET /api/products', function() {
	// Before each test begins, create a new request server for testing
	// & delete all examples from the db
	beforeEach(function() {
		request = chai.request(server);
		return db.sequelize.sync({ force: true });
	});

	it('should find all examples', function(done) {
		// Add some examples to the db to test with
		db.Product.bulkCreate([
			{ prodCategory: 'First Example', prodName: 'First Description', prodOnHand: 2, prodPAR: 2, prodPrice: 2.99, prodPhoto: 'https://s0.2mdn.net/6241250/Q2-business-3-bundle-120x600.png' },
			{ prodCategory: 'second Example', prodName: 'First Description', prodOnHand: 2, prodPAR: 2, prodPrice: 2.99, prodPhoto: 'https://s0.2mdn.net/6241250/Q2-business-3-bundle-120x600.png' },
			{ prodCategory: 'third Example', prodName: 'First Description', prodOnHand: 2, prodPAR: 2, prodPrice: 2.99, prodPhoto: 'https://s0.2mdn.net/6241250/Q2-business-3-bundle-120x600.png' },
			{ prodCategory: 'fourth Example', prodName: 'First Description', prodOnHand: 2, prodPAR: 2, prodPrice: 2.99, prodPhoto: 'https://s0.2mdn.net/6241250/Q2-business-3-bundle-120x600.png' },
			{ prodCategory: 'fifth Example', prodName: 'First Description', prodOnHand: 2, prodPAR: 2, prodPrice: 2.99, prodPhoto: 'https://s0.2mdn.net/6241250/Q2-business-3-bundle-120x600.png' },

		]).then(function() {
			// Request the route that returns all examples
			request.get('/api/products').end(function(err, res) {
				var responseStatus = res.status;
				var responseBody = res.body;

				// Run assertions on the response

				expect(err).to.be.null;

				expect(responseStatus).to.equal(200);

				expect(responseBody)
					.to.be.an('array')
					.that.has.lengthOf(5);

				expect(responseBody[0])
					.to.be.an('object')
					.that.includes({ prodCategory: 'First Example', prodName: 'First Description', prodOnHand: 2, prodPAR: 2, prodPrice: 2.99, prodPhoto: 'https://s0.2mdn.net/6241250/Q2-business-3-bundle-120x600.png' });

				expect(responseBody[1])
					.to.be.an('object')
					.that.includes({ prodCategory: 'second Example', prodName: 'First Description', prodOnHand: 2, prodPAR: 2, prodPrice: 2.99, prodPhoto: 'https://s0.2mdn.net/6241250/Q2-business-3-bundle-120x600.png' });

				// The `done` function is used to end any asynchronous tests
				done();
			});
		});
	});
});
