'use strict';

(function() {
	// Soldiers Controller Spec
	describe('Soldiers Controller Tests', function() {
		// Initialize global variables
		var SoldiersController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Soldiers controller.
			SoldiersController = $controller('SoldiersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Soldier object fetched from XHR', inject(function(Soldiers) {
			// Create sample Soldier using the Soldiers service
			var sampleSoldier = new Soldiers({
				name: 'New Soldier'
			});

			// Create a sample Soldiers array that includes the new Soldier
			var sampleSoldiers = [sampleSoldier];

			// Set GET response
			$httpBackend.expectGET('soldiers').respond(sampleSoldiers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.soldiers).toEqualData(sampleSoldiers);
		}));

		it('$scope.findOne() should create an array with one Soldier object fetched from XHR using a soldierId URL parameter', inject(function(Soldiers) {
			// Define a sample Soldier object
			var sampleSoldier = new Soldiers({
				name: 'New Soldier'
			});

			// Set the URL parameter
			$stateParams.soldierId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/soldiers\/([0-9a-fA-F]{24})$/).respond(sampleSoldier);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.soldier).toEqualData(sampleSoldier);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Soldiers) {
			// Create a sample Soldier object
			var sampleSoldierPostData = new Soldiers({
				name: 'New Soldier'
			});

			// Create a sample Soldier response
			var sampleSoldierResponse = new Soldiers({
				_id: '525cf20451979dea2c000001',
				name: 'New Soldier'
			});

			// Fixture mock form input values
			scope.name = 'New Soldier';

			// Set POST response
			$httpBackend.expectPOST('soldiers', sampleSoldierPostData).respond(sampleSoldierResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Soldier was created
			expect($location.path()).toBe('/soldiers/' + sampleSoldierResponse._id);
		}));

		it('$scope.update() should update a valid Soldier', inject(function(Soldiers) {
			// Define a sample Soldier put data
			var sampleSoldierPutData = new Soldiers({
				_id: '525cf20451979dea2c000001',
				name: 'New Soldier'
			});

			// Mock Soldier in scope
			scope.soldier = sampleSoldierPutData;

			// Set PUT response
			$httpBackend.expectPUT(/soldiers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/soldiers/' + sampleSoldierPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid soldierId and remove the Soldier from the scope', inject(function(Soldiers) {
			// Create new Soldier object
			var sampleSoldier = new Soldiers({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Soldiers array and include the Soldier
			scope.soldiers = [sampleSoldier];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/soldiers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSoldier);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.soldiers.length).toBe(0);
		}));
	});
}());