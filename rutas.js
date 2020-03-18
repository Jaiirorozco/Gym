var app = angular.module('rutas', ['ngSanitize', 'ui.router', 'angularjsToast','ui.bootstrap','ngAnimate','ngMaterial','angularjs-gauge','ngMessages', 'material.svgAssetsCache']);

app.config(function($stateProvider, $urlRouterProvider) {
  var states = [{
      name: 'home',
      url: '/home',
      templateUrl: 'views/home.html',
    //   resolve: {
    //     user: function(User) {
    //         console.log('Verificando auntentificacion');
    //         return User.checkAuthentication();
    //     }
    // }  
  },       
  {
      name: 'home.ventas',
      url: '/Ventas',
      templateUrl: 'views/ventas.html'
  },       
  {
      name: 'home.usuarios',
      url: '/Usuarios',
      templateUrl: 'views/usuarios.html'
  },
  {
    name:'home.usuarios.add',
    url: '/add',
    templateUrl: 'views/add-edit.html',
  }, 
  {
    name:'home.historial',
    url: '/historial',
    templateUrl: 'views/historial.html',
  },
  {
    name:'home.ingresos.addin',
    url: '/Nuevo_ingreso',
    templateUrl: 'views/add-ingreso.html',
  },
  {
    name:'home.ingresos',
    url: '/ingresos',
    templateUrl: 'views/ingresos.html',
  },
  {
    name:'home.gastos',
    url: '/gastos',
    templateUrl: 'views/gastos.html',
  },
  {
    name:'home.gastos.add',
    url: '/Nuevo_gasto',
    templateUrl: 'views/add-ingreso.html',
  },
  {
    name: 'login',
    url: '/Iniciar_Sesion ',
    templateUrl: 'views/login.html'
},
  {
    name: 'home.pdf',
    url: '/pdf',
    templateUrl: 'views/pdf.html'
}
]
$urlRouterProvider.otherwise('home');
states.forEach(function(state) {
  $stateProvider.state(state);
});
});
app.run(function($state) {
    $state.go('home')
//   window.myAppErrorLog = [];
//   $state.defaultErrorHandler(function(error) {
//       // This is a naive example of how to silence the default error handler.
//       window.myAppErrorLog.push(error);
//       console.log('Error al autenticar, redirigiendo a login')
//       $state.go('login')
//   });

})

app.factory('User', function($http, $q) {

  var _user = {
      isAuthenticated: false
  };

  function _checkAuthentication() {
      if (!_user.isAuthenticated) {
          throw new Error('NOT_AUTHENTICATED');
      }
      return $q.when(_user)
  };

  function _login() {

      return $http.get('user.json').then(function(res) {
          angular.extend(_user, res.data);
          return _user;
      })
  };

  function _logout() {
      return $http.get('logout.json').then(function(res) {
          angular.extend(_user, res.data);
          return _user;
      })
  };

  return {
      checkAuthentication: _checkAuthentication,
      login: _login,
      logout: _logout
  };

});
