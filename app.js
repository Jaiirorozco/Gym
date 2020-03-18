app.controller('app', ['$scope', '$http', '$state','toast', 'User', function($scope, $http, $state, toast,User) {
    $scope.datos = [];
    $scope.notas = [];
    $scope.pagina="";
    $scope.dato = {};
    $scope.add_title="";
    $scope.loginData = {};
    $scope.user = User;
    $scope.log_in = true;
    $scope.detalle_datos = {};
    $scope.selection="insert";
    $scope.id_paciente="";
    $scope.boton=function(accion){
        $scope.selection="insert"
    }

       // Paginacion
       $scope.currentPage = 1;
       $scope.itemsPerPage = 5;
     
       $scope.pageChanged = function() {
           console.log($scope.currentPage);
       };

    $scope.select_tabla = function(tabla) {
        $scope.dato.tabla=tabla;
        $http.post('services/select_from.php', {
          dato:$scope.dato
      })
      .then(function success(e) {
          $scope.errors = [];
          $scope.datos = e.data.datos;
      }, function error(e) {
          $scope.errors = e.data.errors;
      });
      return $scope.datos;
    };

    $scope.select_tabla_id   = function(tabla, id) {
        $scope.dato.tabla=tabla;
        $scope.dato.id=id;
        $http.post('services/select_from_id.php', {
          dato:$scope.dato
      })
      .then(function success(e) {
          $scope.errors = [];
          $scope.datos = e.data.datos;
      }, function error(e) {
          $scope.errors = e.data.errors;
      });
      return $scope.datos;
    };
   
  
$scope.tooltip=function(){
    $scope.tooltip=tooltip.pop
}

  // modificar
  $scope.edit = function(index,titulo,uisref) {
    $scope.selection="update";
    $scope.add_title=titulo;
    $scope.dato = {};
    $scope.dato = $scope.datos[index];
    $state.go(uisref);
   
};

// eliminar
$scope.delete = function(index, identificador, tabla) {
    $scope.eliminar={};
    $scope.eliminar.id=$scope.datos[index].id;
    $scope.eliminar.tabla=tabla;
    var conf = confirm("¿Realmente quieres eliminar?");
    if (conf == true) {
        $http.post(identificador, {
                dato: $scope.eliminar
            })
            .then(function success(e) {
                if (e.data.error != "") {
                    toast({
                        duration: 2000,
                        message: e.data.error,
                        className: "alert-danger"
                    });  
                } else {
                    $scope.errors = [];
                    $scope.datos.splice(index, 1);
                    toast({
                        duration: 2000,
                        message: "Datos Eliminados!",
                        className: "alert-success"
                    });
                }
            }, function error(e) {
                $scope.errors = e.data.errors;
            });
    }
  };
       // insertar optimizado
       $scope.insert_table = function(tabla, accion,uisref) {
        $scope.dato.tabla=tabla;
        $scope.dato.accion=accion;
        if(tabla=="exploracion_fiisica"){
            $scope.dato.id_paciente=$scope.id_paciente;
        }
        $http.post('crud/pacientes.php', {
                dato: $scope.dato
            })
            .then(function success(e) {
                if (e.data.error != "") {
                    toast({
                        duration: 2000,
                        message: e.data.error,
                        className: "alert-danger"
                    });
                } else {
                    $scope.errors = [];
                    $scope.select_tabla(tabla);                
                    toast({
                        duration: 2000,
                        message: "Operación exitosa!",
                        className: "alert-success"
                    });
  
                }
            }, function error(e) {
                $scope.errors = e.data.errors;
            });
        $scope.dato = {};
        if(uisref=="null"){

        }else{
            $state.go(uisref);
        }
        
       };
         // insertar optimizado
         $scope.insert_table_index = function(tabla, accion,index) {
            $scope.dato=$scope.datos[index];
            $scope.dato.tabla=tabla;
            $scope.dato.accion=accion;
            if(tabla=="exploracion_fiisica"){
                $scope.dato.id_paciente=$scope.id_paciente;
            }
            $http.post('crud/pacientes.php', {
                    dato: $scope.dato
                })
                .then(function success(e) {
                    if (e.data.error != "") {
                        toast({
                            duration: 2000,
                            message: e.data.error,
                            className: "alert-danger"
                        });
                    } else {
                        $scope.errors = [];
                        // $scope.select_tabla(tabla);                
                        // toast({
                        //     duration: 2000,
                        //     message: "Operación exitosa!",
                        //     className: "alert-success"
                        // });
      
                    }
                }, function error(e) {
                    $scope.errors = e.data.errors;
                });
            $scope.dato = {};  
           };

    // Inicio de sesion
    $scope.submitLogin = function() {

        $http.post('login.php', {
                dato: $scope.loginData
            })
            .then(function success(e) {
                if (e.data.error != "") {
                    var conf = confirm(e.data.error);
                } else {
                    $scope.errors = [];
                    $scope.log_in = false;
                    User.login().then(function() {
                        console.log('login success, sending to home')
                        $scope.changeState();
                    });

                    toast({
                        duration: 2000,
                        message: "Bienvenido al sistema",
                        className: "alert-info"
                    });


                }
            }, function error(e) {
                $scope.errors = e.data.errors;
            });


    };
      // cerrar sesion
      $scope.cerrar_sesion = function() {
        $scope.loginData = {};
        
        User.logout().then(function() {
            console.log('Sesion finalizada')
            $state.go('login');
        });
    };


  }]);

   app.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            element.hover(function(){
                // on mouseenter
                element.tooltip('show');
            }, function(){
                // on mouseleave
                element.tooltip('hide');
            });
        }
    };
});

  
  