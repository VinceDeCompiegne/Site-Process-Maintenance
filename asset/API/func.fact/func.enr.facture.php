<?php

$facture = (urldecode($_GET['facture']) !== null) && !empty(urldecode($_GET['facture'])) ? json_decode(urldecode($_GET['facture'])) : null;
//VAR_DUMP($devis);
include_once('../../../include/constants.inc.php');

$dsn = "mysql:host=" . HOST . ";port=" . PORT . ";dbname=" . DATA;
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
$pdo = new PDO($dsn, USER, PASS, $options);
 

$sql = "INSERT INTO facture (description,id_devis,prix,payer) values(:description,:id_devis,:prix,:payer);";
$pdoStatement = $pdo->prepare($sql);
try {
    $pdoStatement->execute(array(":description" => $facture->description, ":id_devis" => $facture->id_devis, ":prix" => $facture->prix, ":payer" => $facture->payer));
    echo "Save OK ! "; 
} catch (Exception $ex) {
    echo $ex->getMessage();
}

  
 
?>