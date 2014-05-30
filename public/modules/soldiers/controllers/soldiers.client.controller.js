'use strict';

// Soldiers controller
angular.module('soldiers').controller('SoldiersController', ['$scope', '$stateParams', '$location', 'Authentication', 'Soldiers',
    function($scope, $stateParams, $location, Authentication, Soldiers) {
        $scope.authentication = Authentication;

        // Create new Soldier
        $scope.create = function() {
        	// Create new Soldier object
            var soldier = new Soldiers({
                name: this.name
            });

            // Redirect after save
            soldier.$save(function(response) {
                $location.path('soldiers/' + response._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

            // Clear form fields
            this.name = '';
        };

        // Remove existing Soldier
        $scope.remove = function(soldier) {
            if (soldier) {
                soldier.$remove();

                for (var i in $scope.soldiers) {
                    if ($scope.soldiers[i] === soldier) {
                        $scope.soldiers.splice(i, 1);
                    }
                }
            } else {
                $scope.soldier.$remove(function() {
                    $location.path('soldiers');
                });
            }
        };

        // Update existing Soldier
        $scope.update = function() {
            var soldier = $scope.soldier;

            soldier.$update(function() {
                $location.path('soldiers/' + soldier._id);
            }, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
        };

        // Find a list of Soldiers
        $scope.find = function() {
            $scope.soldiers = Soldiers.query();
        };

        // Find existing Soldier
        $scope.findOne = function() {
            $scope.soldier = Soldiers.get({
                soldierId: $stateParams.soldierId
            });
        };
    }
]);