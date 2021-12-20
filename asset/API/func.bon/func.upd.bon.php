<?php

$bon = (urldecode($_GET['bon']) !== null) && !empty(urldecode($_GET['bon'])) ? json_decode(urldecode($_GET['bon'])) : null;
//VAR_DUMP($bon);
include_once('../../../include/constants.inc.php');

$dsn = "mysql:host=" . HOST . ";port=" . PORT . ";dbname=" . DATA;
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
$pdo = new PDO($dsn, USER, PASS, $options);

$sql = "UPDATE  bon_livraison SET materiel=:materiel,ref_materiel=:ref_materiel,accepter=:accepter WHERE (id_client=:id_client) AND (id_bon=:id_bon);";
$pdoStatement = $pdo->prepare($sql);
//VAR_DUMP($bon);


try {
    $pdoStatement->execute(array(":materiel" => $bon->materiel, ":ref_materiel" => $bon->ref_materiel, ":accepter" => $bon->accepter,":id_client" => $bon->id_client,":id_bon" => $bon->id_bon));
} catch (Exception $ex) {
    echo $ex->getMessage();
}
echo "Update OK ! ";
?>