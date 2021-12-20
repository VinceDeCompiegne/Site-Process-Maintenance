<?php
$user = (urldecode($_GET['user'])!==null) && !empty(urldecode($_GET['user'])) ? htmlspecialchars(urldecode($_GET['user'])): null;
//VAR_DUMP($user);


include_once('../../../include/constants.inc.php');

$dsn = "mysql:host=" . HOST . ";port=" . PORT . ";dbname=" . DATA;
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
$pdo = new PDO($dsn, USER, PASS, $options);

//SELECT
try{
$sql = "SELECT * FROM bon_livraison WHERE (id_client=:id_client);";
$pdoStatement = $pdo->prepare($sql);
$pdoStatement->execute(array(":id_client" => $user));
} catch (Exception $ex) {
    echo $ex->getMessage();
}      
$tab = [];
while ($row = $pdoStatement->fetch()) {
    array_push($tab, array("id_client" => $row['id_client'], "id_bon" => $row['id_bon'], "materiel" => $row['materiel'], "ref_materiel" => $row['ref_materiel'], "date_pris_compte" => $row['date_pris_compte'],"accepter" => $row['accepter']));
}

echo (json_encode($tab));
?>