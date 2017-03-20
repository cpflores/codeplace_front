angular.module('adminMdl', [])

.controller('adminCtrl', ['$scope', '$http', 'schoolSrv', 'userSrv', '$state', 'Upload', 'railsServer', 'subscriptionValue', 'requestHeaders', function adminController($scope, $http, schoolSrv, userSrv, $state, Upload, railsServer, subscriptionValue, requestHeaders) {

    //* USER INFO */
    if (localStorage.token) {
        function getCurrentUser() {
            userSrv.getCurrentUser().then(function(userPromiseData) {
                $scope.current_user = userPromiseData;
                console.log("Current user @adminController: ", $scope.current_user);
                if (!$scope.current_user.admin) {
                    $state.go("dashboard");
                }
            }, function errorCallback(error) {
                $state.go("dashboard");
            });
        }
    } else {
        $state.go("dashboard");
    }

    /* CONSTANTS */
    var rails_server_path = railsServer;
    $scope.subscription_price = subscriptionValue;

    /* SCHOOL METRICS */
    $http({
        headers: requestHeaders(),
        method: 'GET',
        url: rails_server_path + '/all_users.json'
    }).then(function successCallback(response) {
        $scope.total_users = response.data;
    });

    $http({
        headers: requestHeaders(),
        method: 'GET',
        url: rails_server_path + '/subscribers.json'
    }).then(function successCallback(response) {
        $scope.total_subscriptions = response.data;
    });

}]);
