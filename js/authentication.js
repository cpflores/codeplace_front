var authApp = angular.module('authModule', []);

authApp.controller('authCtrl', ['$scope', '$http', '$location', '$state', 'railsServer', 'StoreLoginData', function authController($scope, $http, $location, $state, railsServer, StoreLoginData) {

    var rails_server_path = railsServer;

    $scope.registerUser = function(user_username, user_email, user_password, user_password_confirmation) {
       var credentials = {
           user: {
               username: user_username,
               email: user_email,
               password: user_password,
               password_confirmation: user_password_confirmation
           }
       };
       $http({
           method: 'POST',
           url: rails_server_path + '/users.json',
           data: credentials
       }).then(function successCallback(response) {
           $scope.loginUser(user_email, user_password, false);
       }, function errorCallback(error) {
           $scope.sign_up_status = "alert alert-danger";
           $scope.sign_up_message = "Unable to complete registration";
           fadeAlert("#sign_up_alert");
       });
   }

   function fadeAlert(id) {
       $(id).fadeTo(3000, 0);
   }
   
}]);
