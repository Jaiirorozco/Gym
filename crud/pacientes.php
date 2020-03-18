<?php
$data = json_decode(file_get_contents('php://input'), TRUE);
$validation_error = '';
if (isset($data['dato'])) {
    include ('../assets/class/library.php'); 

    $accion = (isset($data['dato']['accion']) ? $data['dato']['accion'] : NULL);
    $tabla = (isset($data['dato']['tabla']) ? $data['dato']['tabla'] : NULL);

    $c = ""; 
    $v = "";
    $m = "";

    foreach ($data['dato'] as $clave => $valor) {
        if($clave=='id' || $clave=='tabla' || $clave=='accion'){

        }else{
            $c=$c.$clave.", ";

            $v=$v."'".$valor."'".", ";
            
            $m=$m.$clave."='".$valor."', ";
        }       
    }
      $c=substr($c, 0, -2);
      $v=substr($v, 0, -2);
      $m=substr($m, 0, -2);
      $crud = new Crud();
      if($accion=='insert'){
          $sql="INSERT INTO $tabla(id, $c) VALUES (null, $v)";
          $validation_error = $crud->insert($sql);
      }elseif($accion=='update'){
        $id = (isset($data['dato']['id']) ? $data['dato']['id'] : NULL);
        $sql="UPDATE $tabla SET $m WHERE id='".$id."'";
        $validation_error = $crud->insert($sql);
      }
    $output = array('error' => $validation_error);     
}  
    echo json_encode($output);
?>