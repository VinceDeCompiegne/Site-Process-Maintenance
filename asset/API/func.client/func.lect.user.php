<?php

include_once('../../../include/constants.inc.php');

$dsn = "mysql:host=" . HOST . ";port=" . PORT . ";dbname=" . DATA;
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
$pdo = new PDO($dsn, USER, PASS, $options);

/*Requete pour savoir si l'utilisateur à déjà fait une commande dans un temps déterminé*/
$sql = "SELECT DISTINCT telephone,user.* FROM user ORDER BY nom;";
try {

$pdoStatement = $pdo->prepare($sql);
$pdoStatement->execute();

} catch (PDOException $err) {

    echo $err->getMessage();

    if ($err->getCode() == "42S02") {
        //CreateTable_user();
    }
}

$tab = [];
while ($row = $pdoStatement->fetch()) {
    array_push($tab, array("id" => $row['id_user'], "nom" => $row['nom'], "prenom" => $row['prenom'], "couriel" => $row['couriel'], "adresse" => $row['adresse'], "code_postale" => $row['code_postale'], "telephone" => $row['telephone']));
}
echo (json_encode($tab));