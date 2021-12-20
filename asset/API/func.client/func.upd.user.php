<?php

$user = (urldecode($_GET['user']) !== null) && !empty(urldecode($_GET['user'])) ? json_decode(urldecode($_GET['user'])) : null;
//VAR_DUMP($bon);
include_once('../../../include/constants.inc.php');

$dsn = "mysql:host=" . HOST . ";port=" . PORT . ";dbname=" . DATA;
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
$pdo = new PDO($dsn, USER, PASS, $options);

$sql = "UPDATE  user SET nom=:nom, prenom=:prenom,couriel=:couriel,adresse=:adresse,code_postale=:code_postale,telephone=:telephone  WHERE (id_user=:id_user);";
$pdoStatement = $pdo->prepare($sql);
//VAR_DUMP($bon);


try {
    $pdoStatement->execute(array(":id_user" => $user->id_user,":nom" => $user->nom,":prenom" => $user->prenom, ":couriel" => $user->couriel, ":adresse" => $user->adresse,":code_postale" => $user->code_postale,":telephone" => $user->telephone));
} catch (Exception $ex) {
    echo $ex->getMessage();
}
echo "Update OK ! ";
?>