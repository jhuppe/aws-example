var app = angular.module('aws', [])

app.controller('mainCtrl', function($scope, imageService) {
    (function getImages() {imageService.getImages().then(function(response) {
        $scope.images = response.data;
    })})()
})







