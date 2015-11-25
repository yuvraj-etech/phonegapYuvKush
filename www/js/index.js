angular.module('networkApp', ['ngCordova']).controller('mainCtrl', function($scope, $rootScope, $cordovaNetwork, $cordovaAppVersion {
            console.log("bammmmmm");
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
                $cordovaAppVersion.getVersionNumber().then(function(version) {
                    console.log(version);
                    $scope.appVersn = version;
                });
                $cordovaAppVersion.getVersionCode().then(function(build) {
                    console.log(build);
                    $scope.appBuild = build;
                });

            }, false);

        });