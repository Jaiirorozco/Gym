<?php
include ('conection.php'); 
//se usa para backend funciones de mod elim insert a la bbd
class Crud{

    protected $db; 

    public function __construct() 
    {
        $this->db= conexion();
    }
    public function select($sql,$nombre)
    {
        $query=$this->db->query($sql);
        if($query){
            $data = array();
            while($row=$query->fetch_assoc()){
                $data[] = $row;
            }
            return json_encode([$nombre => $data]);

        }else{
            return "Error consultando los datos";
            exit();
            
        }
        $this->db->close();
    }
   

    public function insert($sql)
    {    
        if( $this->db->query($sql)== true ){
            // Get last insert id 
            // $lastid = mysqli_insert_id($this->db);
            // return $lastid;
            return "";
            //echo "Registro insertado correctamente en bd";      
        }else{
           return 'Error en BD';
          }
          $this->db->close();      
       
    }


    public function delete($id, $tabla)
    {
        $sql ="DELETE FROM $tabla WHERE id = '".$id."'";
        if(  $this->db->query($sql)== true ){
            return "";
        }else{
            return 'Error al eliminar en bd';
        }
        $this->db->close(); 
    }



}   

?>
