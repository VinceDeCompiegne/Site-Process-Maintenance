<?php

$facture = (urldecode($_GET['facture']) !== null) && !empty(urldecode($_GET['facture'])) ? json_decode(urldecode($_GET['facture'])) : null;
//VAR_DUMP($bon);
include_once('../../../include/constants.inc.php');

$dsn = "mysql:host=" . HOST . ";port=" . PORT . ";dbname=" . DATA;
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
$pdo = new PDO($dsn, USER, PASS, $options);

$sql = "UPDATE facture SET description=:description,id_devis=:id_devis,prix=:prix,payer=:payer WHERE (id_facture=:id_facture);";
$pdoStatement = $pdo->prepare($sql);
//VAR_DUMP($bon);


try {
    $pdoStatement->execute(array(":description" => $facture->description, ":id_devis" => $facture->id_devis, ":prix" => $facture->prix,":prix" => $facture->prix,":payer" => $facture->payer,":id_facture" => $facture->id_facture));
    echo "Update OK ! ";
} catch (Exception $ex) {
    echo $ex->getMessage();
}

?>