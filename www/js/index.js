angular.module('networkApp',['ngCordova']).controller('mainCtrl', function($scope,$rootScope, $cordovaNetwork) {
console.log("bammmmmm");
    document.addEventListener("deviceready", function () {
  $scope.var="Thank You";
console.log($scope.isOnline);

$rootScope.$on('$cordovaNetwork:online', function(event, networkState){
            console.log("went online");
            $scope.status = "Online";
            $scope.networkType=$cordovaNetwork.getNetwork();
            $scope.nType=$scope.networkType;
          });
 
          $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("went offline");
             $scope.status = "Offline";
             $scope.networkType=$cordovaNetwork.getNetwork();
            $scope.nType=$scope.networkType;
          });

}, false);

});