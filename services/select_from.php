<?php
include ('../assets/class/library.php'); 
$data = json_decode(file_get_contents('php://input'), TRUE);
if (isset($data['dato'])) {
    $consultas = new Crud();
    $tabla = (isset($data['dato']['tabla']) ? $data['dato']['tabla'] : NULL);
    echo $consultas->select("SELECT * from $tabla ",'datos'); 
      
}
?>