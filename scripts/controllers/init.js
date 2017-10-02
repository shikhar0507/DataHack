app.controller('init', function($scope,prisonReligion) {

prisonReligion.getData().then(function(response) {
    console.log(response);
    $scope.result  = response;
})

});