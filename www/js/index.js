angular.module('networkApp', ['ngCordova','GoogleLoginService','ionic'])
        .controller('mainCtrl', function($scope, $rootScope, $cordovaNetwork, 

            $cordovaAppVersion,$cordovaDevice,$cordovaDialogs, $cordovaSplashscreen,googleLogin) {
           
                
            document.addEventListener("deviceready", function() {
                console.log($scope.isOnline);

                $rootScope.$on('$cordovaNetwork:online', function(event, networkState) {
                    console.log("went online");
                    $scope.status = "Online";
                    $scope.networkType = $cordovaNetwork.getNetwork();
                    $scope.nType = $scope.networkType;
                });

                $rootScope.$on('$cordovaNetwork:offline', function(event, networkState) {
                    console.log("went offline");
                    $scope.status = "Offline";
                    $scope.networkType = $cordovaNetwork.getNetwork();
                    $scope.nType = $scope.networkType;
                }); 
                $scope.appVersn = AppVersion.version;
                console.log(AppVersion.version);  
                console.log(AppVersion.build); 
                $scope.appBuild = AppVersion.build;
                $scope.get=function()
                {
                $cordovaDialogs.alert($scope.appVersn,'Application Version','ok')
                .then(function() {
                console.log($scope.appVersn);
                });
                } ; 
                $scope.device = $cordovaDevice.getDevice();
                $scope.getDeviceInfo = function(){
                $cordovaDialogs.alert($scope.device,'Device Information','ok')
                .then(function() {
                console.log($scope.device);
                });
                };


                $scope.googleLogin = function () {
                var promise = googleLogin.startLogin();
                promise.then(function (data) {
                    $scope.googleData = data;
                }, function (data) {
                    $scope.googleData = data;
                });
            }

            }, false);
        });