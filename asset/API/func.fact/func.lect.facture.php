<?php
$user = (urldecode($_GET['user'])!==null) && !empty(urldecode($_GET['user'])) ? htmlspecialchars(urldecode($_GET['user'])): null;
//VAR_DUMP($user);


include_once('../../../include/constants.inc.php');

$dsn = "mysql:host=" . HOST . ";port=" . PORT . ";dbname=" . DATA;
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
$pdo = new PDO($dsn, USER, PASS, $options);

//SELECT
try{
$sql = "SELECT * FROM facture WHERE (id_devis=:id_devis);";
$pdoStatement = $pdo->prepare($sql);
$pdoStatement->execute(array(":id_devis" => $user));
} catch (Exception $ex) {
    echo $ex->getMessage();
}   
$tab = [];
while ($row = $pdoStatement->fetch()) {
    array_push($tab, array("id_facture" => $row['id_facture'], "id_devis" => $row['id_devis'], "description" => $row['description'], "prix" => $row['prix'], "date_pris_compte" => $row['date_pris_compte'],"payer" => $row['payer']));
}

echo (json_encode($tab));
?>