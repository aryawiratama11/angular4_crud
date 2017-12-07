<?php
	require '../db_config.php';
			
    if(!empty($_FILES['avatar'])){
        //$ext = pathinfo($_REQUEST['name'],PATHINFO_EXTENSION);
        $fileData = pathinfo($_REQUEST['name']);
        $fileName = $fileData['filename'];
        $ext = $fileData['extension'];
        $image = $fileName . '_' .time().'.'.$ext;
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