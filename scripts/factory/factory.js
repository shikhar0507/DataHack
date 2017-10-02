app.factory('prisonReligion', function($http) {
     return  {
         getData : function() {
             return $http.get('http://localhost:3600').then(function(result) {
                 return result.data;
             })
         }
     }
})