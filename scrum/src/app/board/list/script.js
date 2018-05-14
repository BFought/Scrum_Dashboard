console.log('script');

angular.module('list', [])

.directive('ngSortable', function($document) {
    return {
        restrict: 'A',
        scope: {
            sortOptions: '=ngSortable'
        },
        link: function(scope, elem, attr) {
            $(elem).sortable(scope.sortOptions);
        }
    }
})

.controller('sortCtrl', function($scope) {
    $scope.sortOptions = {
        connectWith: $(".list-box")
    }
})