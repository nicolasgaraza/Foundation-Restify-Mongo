angular.module('application').controller('CreateTodoController', CreateTodoController);

CreateTodoController.$inject = ['$scope', '$stateParams', '$state', '$controller', 'todoService'];
function CreateTodoController($scope, $stateParams, $state, $controller, todoService) {
	angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

	

	$scope.title = "Create your TODO";

	$scope.todo = 
	{
		name : '',
		desc : '',
	};


	//$state.go('home')
	
};