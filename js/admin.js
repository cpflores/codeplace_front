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

    /* SCHOOL CRUD ACTIONS */

    /* READ */
    function getSchoolData() {
        schoolSrv.getSchoolData().then(function successCallback(response) {
            $scope.school = response.data;
        });
    }
    getSchoolData();

    /* UPDATE */
    $scope.updateSchoolData = function(name, thumbnail) {
        Upload.upload({
            headers: requestHeaders(),
            url: rails_server_path + '/schools/1.json',
            method: 'PUT',
            fields: { 'school[name]': name, 'school[thumbnail]': thumbnail },
            fileFormDataName: 'school[thumbnail]'
        }).then(function successCallback(response) {
            getSchoolData();
            $scope.updateSchoolData_status = "alert alert-success";
            $scope.updateSchoolData_message = "School info updated";
            fadeAlert("#updateSchoolData_alert");
        }, function errorCallback(error) {
            $scope.updateSchoolData_status = "alert alert-danger";
            $scope.updateSchoolData_message = "Unable to update school info";
            fadeAlert("#updateSchoolData_alert");
        });
    }

    function fadeAlert(id) {
        $(id).fadeTo(3000, 0);
    }
}]);
