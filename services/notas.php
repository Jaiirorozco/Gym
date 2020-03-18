<?php
include ('../assets/class/library.php'); 
$consultas = new Crud();
echo $consultas->select("SELECT * from notas",'datos');
?>