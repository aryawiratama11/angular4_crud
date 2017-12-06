<?php
	require '../db_config.php';
	//print_r($_FILES['avatar']);
    if(!empty($_FILES['avatar'])){
        $ext = pathinfo($_FILES['avatar']['name'],PATHINFO_EXTENSION);
        $image = time().'.'.$ext;
        $id  = $_GET["id"];
        if(move_uploaded_file($_FILES["avatar"]["tmp_name"], __DIR__.'/../images/'.$image))
        {
        	$sql = "UPDATE items SET avatar = '".$image."' WHERE id = '".$id."'";
			$result = $mysqli->query($sql);
        	
	        echo $image." successfully uploaded";
        }
        else{
        	echo "Invalid File or Empty File";
        }
		
    }else{
        echo "Invalid File or Empty File";
    }
?>