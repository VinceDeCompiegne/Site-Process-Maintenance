<?php
$user = (urldecode($_GET['user'])!==null) && !empty(urldecode($_GET['user'])) ? htmlspecialchars(urldecode($_GET['user'])): null;
//VAR_DUMP($user);


include_once('../../../include/constants.inc.php');

$dsn = "mysql:host=" . HOST . ";port=" . PORT . ";dbname=" . DATA;
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
$pdo = new PDO($dsn, USER, PASS, $options);

//SELECT
try{
$sql = "SELECT * FROM devis WHERE (id_bon=:id_bon);";
$pdoStatement = $pdo->prepare($sql);
$pdoStatement->execute(array(":id_bon" => $user));
} catch (Exception $ex) {
    echo $ex->getMessage();
}   
$tab = [];
while ($row = $pdoStatement->fetch()) {
    array_push($tab, array("id_devis" => $row['id_devis'], "id_bon" => $row['id_bon'], "description" => $row['description'], "prix" => $row['prix'], "date_pris_compte" => $row['date_pris_compte'],"garantie" => $row['garantie'],"accepte" => $row['accepte']));
}

echo (json_encode($tab));
?>