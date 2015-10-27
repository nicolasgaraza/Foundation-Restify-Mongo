angular.module('application').controller('TodoController', TodoController);

TodoController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'todoService'];
function TodoController($scope, $stateParams, $state, $controller, todoService) {
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	$scope.title = "Welcome to the Future";

	$scope.todos = todoService.getTodos();
	
};