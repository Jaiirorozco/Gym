<?php
session_start();
include ('assets/class/conection.php'); 
$conn= conexion();
$form_data = json_decode(file_get_contents("php://input"));
$validation_error = '';

if(empty($form_data->dato->usuario))
{
 $error[] = 'usuario requerido';
}


if(empty($form_data->dato->password))
{
 $error[] = 'Password requerido';
}

// //////////////////////////////
if(empty($error))
{
$usuario = $form_data->dato->usuario;
$pwd=$form_data->dato->password;

 $sql = "SELECT * FROM usuarios WHERE cuenta = '".$usuario."' limit 0,1";

 $result = $conn->query($sql);
 
  if($result->num_rows>0){
    while($row=$result->fetch_array()){
        $pass=password_hash($row['pass'],PASSWORD_DEFAULT);
        if(password_verify($form_data->dato->password, $pass))
        {
         $_SESSION["usuario"] = $row["nombre"].$row["apellidos"];
        
        }
        else
        {
         $validation_error = 'Error en Password';
        
        }
    }
 
  }else {
   $validation_error = 'Error en usuario';
   
  }
 }
else
{
 $validation_error = implode(", ", $error);
}
////////////////////
$output= array('error' => $validation_error);


echo json_encode($output);
// echo $validation_error;
?>