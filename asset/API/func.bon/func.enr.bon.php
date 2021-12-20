<?php

$bon = (urldecode($_GET['bon']) !== null) && !empty(urldecode($_GET['bon'])) ? json_decode(urldecode($_GET['bon'])) : null;
//VAR_DUMP($bon);
include_once('../../../include/constants.inc.php');

$dsn = "mysql:host=" . HOST . ";port=" . PORT . ";dbname=" . DATA;
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
$pdo = new PDO($dsn, USER, PASS, $options);
 

$sql = "INSERT INTO bon_livraison (id_client,materiel,ref_materiel,accepter) values(:id_client,:materiel,:ref_materiel,:accepter);";
$pdoStatement = $pdo->prepare($sql);
try {
    $pdoStatement->execute(array(":id_client" => $bon->id_client, ":materiel" => $bon->materiel, ":ref_materiel" => $bon->ref_materiel, ":accepter" => $bon->accepter));
} catch (Exception $ex) {
    echo $ex->getMessage();
}

echo "Save OK ! ";   
 
?>