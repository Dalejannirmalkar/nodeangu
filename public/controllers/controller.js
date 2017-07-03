var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh =function(){
$http.get('/contact').then(function(response){

      
    console.log("i got data",response.data);

    $scope.contact=response.data;
    
});
}
refresh();
// $http.get('/contacts').then(successCallback, errorCallback);

// function successCallback(response){
//     //success code
//         console.log("i got data");

//     $scope.contact=response;
// }
// function errorCallback(error){
//     //error code
//     console.log("i got no data");
// }
$scope.addContact=function(){
    var data ={
        name:$scope.contact.name,
        email:$scope.contact.email,
        number:$scope.contact.number
    }

    console.log($scope.contact)
    $http.post('/contact',data).then(function(response){

      
    console.log("i got data",response.data);
refresh();
   // $scope.contact=response.data;
});
}

$scope.remove = function(id){
var id=id;
console.log(id);
    $http.delete('/contact'+id).then(function(response){

      
    console.log("deleted data",response.data);
refresh();
   // $scope.contact=response.data;
});
}
$scope.edit = function(id){
var id=id;
console.log(id);
    $http.get('/contact'+id).then(function(response){

      $scope.contact.name =response.data.name;
       $scope.contact.email =response.data.email;
        $scope.contact.number =response.data.number;
        $scope.contact._id=response.data._id;
    console.log("edited data",response.data);

   // $scope.contact=response.data;
});
}

$scope.update = function(){

console.log($scope.contact._id);
  var data ={
        name:$scope.contact.name,
        email:$scope.contact.email,
        number:$scope.contact.number,
        _id:$scope.contact._id
    }
    $http.put('/contact'+$scope.contact._id,data).then(function(response){

      
    console.log("updATES data",response.data);
refresh();
   // $scope.contact=response.data;
});
}


}]);