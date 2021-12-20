<?php

$devis = (urldecode($_GET['devis']) !== null) && !empty(urldecode($_GET['devis'])) ? json_decode(urldecode($_GET['devis'])) : null;
//VAR_DUMP($bon);
include_once('../../../include/constants.inc.php');

$dsn = "mysql:host=" . HOST . ";port=" . PORT . ";dbname=" . DATA;
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
$pdo = new PDO($dsn, USER, PASS, $options);

$sql = "UPDATE  devis SET description=:description,garantie=:garantie,prix=:prix,accepte=:accepte WHERE (id_devis=:id_devis) AND (id_bon=:id_bon);";
$pdoStatement = $pdo->prepare($sql);
//VAR_DUMP($bon);


try {
    $pdoStatement->execute(array(":description" => $devis->description, ":garantie" => $devis->garantie, ":prix" => $devis->prix,":accepte" => $devis->accepte,":id_devis" => $devis->id_devis,":id_bon" => $devis->id_bon));
    echo "Update OK ! ";
} catch (Exception $ex) {
    echo $ex->getMessage();
}

?>