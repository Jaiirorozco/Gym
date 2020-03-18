<?php
function Conexion(){
// Crear conexion a la base de datos con mysqli
$server="localhost"; //127.0.0.1 o Ip v4
$user="root";
$pass="";
$database='aya';


//crear la conexion
$conn= new mysqli($server,$user,$pass,$database);
mysqli_set_charset($conn, "utf8"); //formato utf8
// Revisar conexion
if($conn->connect_error){
	echo "Error al conectar con el servidor de base de datos:".mysqli_connect_errno() . " " .  mysqli_connect_error();
		exit();
}
return $conn;
}



?>