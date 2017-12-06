<?php
	require '../db_config.php';
	$id  = $_GET["id"];
	$path = __DIR__.'/../images/'.$_GET['name'];
	//$post = file_get_contents('php://input');
	//$post = json_decode($post);
	$sql = "UPDATE items SET avatar = Null WHERE id = '".$id."'";
	$result = $mysqli->query($sql);
	if(@unlink($path)) 
	{
		echo "Avatar removed"; 
	}
	else{
		echo "Avatar can't be deleted";
	}
	//$sql = "SELECT * FROM items WHERE id = '".$id."'"; 
	//$result = $mysqli->query($sql);
	//$data = $result->fetch_assoc();
	
	//echo json_encode($data);
// 
?>