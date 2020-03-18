<?php
$data = json_decode(file_get_contents('php://input'), TRUE);
$validation_error = '';
if (isset($data['dato'])) {
    include ('../assets/class/library.php'); 
    $id = (isset($data['dato']['id']) ? $data['dato']['id'] : NULL);
    $tabla=(isset($data['dato']['tabla']) ? $data['dato']['tabla'] : NULL);

    if ($id==NULL || $tabla==NULL) {
        $validation_error = 'Todos los campos son requeridos!';
    }else{
	    // Delete
	     $crud = new Crud();
         $validation_error = $crud->delete($id, $tabla);
    }
    $output = array('error' => $validation_error);     
}
echo json_encode($output);
?>