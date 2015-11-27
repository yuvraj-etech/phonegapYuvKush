angular.module('networkApp', ['ngCordova','GoogleLoginService','ionic'])
        .controller('mainCtrl', function($scope, $rootScope, $cordovaNetwork, 

            $cordovaAppVersion,$cordovaDevice,$cordovaDialogs, $cordovaSplashscreen,googleLogin, $timeout, $cordovaOauth, $http,$log) {
           
                
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
$timeout(function() {
        //timeout requried to wait for facebook plugin file to load
        try {
            if (window.cordova.platformId == "browser") {
                facebookConnectPlugin.browserInit('547552195393374');
            }
            facebookConnectPlugin.getLoginStatus(function(response) {
                console.log(response);
                if (response.status === 'connected') {
                    console.log('User Already LoggedIn');
                    self.getData();
                   
                } else {
                    console.log('User Not Logged In');
                }
            }, function() {
                console.log('Get Login Status Error');

            });
        }
        catch (e) {

        }
    }, 1000);
    $scope.facebook = function() {
        console.log("yes");
       
        facebookConnectPlugin.login(['public_profile'], function(data) {
            console.log(data);
            self.getData();

        }, function(data) {
            console.log(data);
           
        });
    };
    self.getData = function() {
        facebookConnectPlugin.api('/me', ['public_profile'], function(data) {
            console.log(data);
            $scope.$apply(function() {
                $scope.fb_data = data;

            });
           
            console.log('fb login' + data.id + ',' + data.name);
        });
    };

$scope.logout=function(){
     try {
            if (window.cordova) {
                facebookConnectPlugin.getLoginStatus(function(fbUserObject) {

                    console.log("FB success");
                    console.log(fbUserObject.status);
                    if (fbUserObject.status === 'connected') {
                        facebookConnectPlugin.logout(
                                function() {
                                   
                                   
                                },
                                function() {
                                });
                    }

                }, function(errorObj) {
                    console.log("FB failed" + errorObj);
                });
            }
            else {
                facebookConnectPlugin.getLoginStatus(function(response) {
                    if (response.status === 'connected') {
                        facebookConnectPlugin.logout(function(response) {
                            // user is now logged out
                        });
                    }
                });

            }
        }
        catch (e) {

        }

}
        });