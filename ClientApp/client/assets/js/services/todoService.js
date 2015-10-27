angular.module('application').factory('todoService', function($rootScope, $http) {
    var todoService = {};
    todoService.data = {};

    //Gets the list of nuclear weapons
    todoService.getTodos = function() {
    	
        $http.get('http://localhost:8080/todo')
            .then(function(res) {
                todoService.data.todos = res.data.data;
            });

        return todoService.data;
    };

    return todoService;
});
