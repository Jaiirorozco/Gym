<?php
include ('../assets/class/library.php'); 
$data = json_decode(file_get_contents('php://input'), TRUE);
if (isset($data['dato'])) {
    $consultas = new Crud();
    $tabla = (isset($data['dato']['tabla']) ? $data['dato']['tabla'] : NULL);
    $id = (isset($data['dato']['id']) ? $data['dato']['id'] : NULL);
    echo $consultas->select("SELECT * from $tabla where id_paciente='".$id."'",'datos'); 
      
}
?>