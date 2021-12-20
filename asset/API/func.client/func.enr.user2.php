<?php

$enregistrement = (urldecode($_GET['enregistrement']) !== null) && !empty(urldecode($_GET['enregistrement'])) ? json_decode(urldecode($_GET['enregistrement'])) : null;
//VAR_DUMP($reservation);
//$enregistrement = json_decode(urldecode($_GET['enregistrement']));

include_once('../../../include/constants.inc.php');

$dsn = "mysql:host=" . HOST . ";port=" . PORT . ";dbname=" . DATA;
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
$pdo = new PDO($dsn, USER, PASS, $options);

/*Requete pour savoir si l'utilisateur à déjà fait une commande dans un temps déterminé*/
$sql = "SELECT * FROM user WHERE ((nom=:nom) AND (prenom=:prenom) AND (telephone=:telephone));";
try {

    $pdoStatement = $pdo->prepare($sql);
    $pdoStatement->execute(array(":nom" => $enregistrement->nom, ":prenom" => $enregistrement->prenom, ":telephone" => $enregistrement->telephone));
} catch (PDOException $err) {

    echo $err->getMessage();

    if ($err->getCode() == "42S02") {
        //CreateTable_user();
    }
}
if ($pdoStatement->rowCount() != 0) {
    $tab = [];
     while ($row = $pdoStatement->fetch()) {
         array_push($tab, array("id" => $row['id_user'], "nom" => $row['nom'], "prenom" => $row['prenom'], "couriel" => $row['couriel'], "adresse" => $row['adresse'], "code_postale" => $row['code_postale'], "telephone" => $row['telephone']));
     }
    echo (json_encode($tab));
} else {
    $sql = "insert into user (nom, prenom,couriel,adresse,code_postale,telephone) values(:nom, :prenom,:couriel,:adresse,:code_postale,:telephone)";
    $pdoStatement = $pdo->prepare($sql);
    try {
        $pdoStatement->execute(array(":nom" => $enregistrement->nom, ":prenom" => $enregistrement->prenom, ":couriel" => $enregistrement->email, ":adresse" => $enregistrement->adresse, ":code_postale" => $enregistrement->postal, ":telephone" => $enregistrement->telephone));
    } catch (Exception $ex) {
        echo $ex->getMessage();
    }

    $sql = "SELECT * FROM user WHERE ((nom=:nom) AND (prenom=:prenom) AND (telephone=:telephone));";
    try {

        $pdoStatement = $pdo->prepare($sql);
        $pdoStatement->execute(array(":nom" => $enregistrement->nom, ":prenom" => $enregistrement->prenom, ":telephone" => $enregistrement->telephone));
    } catch (PDOException $err) {

        echo $err->getMessage();

        if ($err->getCode() == "42S02") {
            //CreateTable_user();
        }
    }
    $tab = [];
    $row = $pdoStatement->fetch();
    array_push($tab, array("id" => $row['id_user'], "nom" => $row['nom'], "prenom" => $row['prenom'], "couriel" => $row['couriel'], "adresse" => $row['adresse'], "code_postale" => $row['code_postale'], "telephone" => $row['telephone']));
    //}
    echo (json_encode($tab));
}
