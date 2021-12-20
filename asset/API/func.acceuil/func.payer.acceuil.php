<?php
$facture = (urldecode($_GET['facture'])!==null) && !empty(urldecode($_GET['facture'])) ? htmlspecialchars(urldecode($_GET['facture'])): null;
//VAR_DUMP($user);

//VAR_DUMP($bon);
include_once('../../../include/constants.inc.php');

$dsn = "mysql:host=" . HOST . ";port=" . PORT . ";dbname=" . DATA;
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
$pdo = new PDO($dsn, USER, PASS, $options);

$sql = "UPDATE facture SET payer=1 WHERE (id_facture=:id_facture);";
$pdoStatement = $pdo->prepare($sql);
//VAR_DUMP($bon);


try {
    $pdoStatement->execute(array(":id_facture" => $facture));
    echo "Payer ! ";
} catch (Exception $ex) {
    echo $ex->getMessage();
}
?>