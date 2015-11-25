angular.module('networkApp', ['ngCordova'])
        .controller('mainCtrl', function($scope, $rootScope, $cordovaNetwork, 

            $cordovaAppVersion,$cordovaDevice) {
            

            $cordovaAppVersion,$cordovaDevice,$cordovaDialogs) {
           

            document.addEventListener("deviceready", function() {
                $scope.var = "Thank You";
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
                $scope.appVersn=AppVersion.version;
                console.log(AppVersion.version);  
                console.log(AppVersion.build); 
                $scope.appBuild=AppVersion.build;
                $scope.get=function()
                {
                $cordovaDialogs.alert('Application Version',$scope.appVersn,'ok')
                .then(function() {
                console.log($scope.appVersn);
                });
                } ; 

                $scope.device = $cordovaDevice.getDevice();

            }, false);

        });