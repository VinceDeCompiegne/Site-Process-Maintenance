<?php

$devis = (urldecode($_GET['devis']) !== null) && !empty(urldecode($_GET['devis'])) ? json_decode(urldecode($_GET['devis'])) : null;
//VAR_DUMP($devis);
include_once('../../../include/constants.inc.php');

$dsn = "mysql:host=" . HOST . ";port=" . PORT . ";dbname=" . DATA;
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
$pdo = new PDO($dsn, USER, PASS, $options);
 

$sql = "INSERT INTO devis (description,prix,garantie,id_bon,accepte) values(:description,:prix,:garantie,:id_bon,:accepte);";
$pdoStatement = $pdo->prepare($sql);
try {
    $pdoStatement->execute(array(":description" => $devis->description, ":prix" => $devis->prix, ":garantie" => $devis->garantie, ":accepte" => $devis->accepte, ":id_bon" => $devis->id_bon));
    echo "Save OK ! "; 
} catch (Exception $ex) {
    echo $ex->getMessage();
}

  
 
?>