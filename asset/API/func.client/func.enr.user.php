<?php

$user = (urldecode($_GET['user']) !== null) && !empty(urldecode($_GET['user'])) ? json_decode(urldecode($_GET['user'])) : null;
//VAR_DUMP($user);
include_once('../../../include/constants.inc.php');

$dsn = "mysql:host=" . HOST . ";port=" . PORT . ";dbname=" . DATA;
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
$pdo = new PDO($dsn, USER, PASS, $options);
 

$sql = "INSERT INTO user (nom, prenom,couriel,adresse,code_postale,telephone) VALUES (:nom, :prenom,:couriel,:adresse,:code_postale,:telephone)";
$pdoStatement = $pdo->prepare($sql);
try {
    $pdoStatement->execute(array(":nom" => $user->nom, ":prenom" => $user->prenom, ":couriel" => $user->couriel, ":adresse" => $user->adresse, ":code_postale" => $user->postal, ":telephone" => $user->telephone));
    echo "Save OK ! "; 
} catch (Exception $ex) {
    echo $ex->getMessage();
}

  
 
?>