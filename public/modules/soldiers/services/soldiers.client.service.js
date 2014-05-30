'use strict';

//Soldiers service used to communicate Soldiers REST endpoints
angular.module('soldiers').factory('Soldiers', ['$resource', function($resource) {
    return $resource('soldiers/:soldierId', {
        soldierId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);