var app = angular.module('aws')

app.service('imageService', function($http) {

    this.getImages = function() {
        return $http.get('/images')
    }
    
    this.uploadImage = function(fileBody, fileObj) {
    
        var fileObj = {
            fileName: fileObj.name,
            fileBody: fileBody,
            fileType: fileObj.type
        }
        
        return $http({
            method: 'POST',
            url: '/images',
            data: fileObj
        })
    }
    
})