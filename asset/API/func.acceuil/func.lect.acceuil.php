<?php
//$user = (urldecode($_GET['user'])!==null) && !empty(urldecode($_GET['user'])) ? htmlspecialchars(urldecode($_GET['user'])): null;
//VAR_DUMP($user);


include_once('../../../include/constants.inc.php');

$dsn = "mysql:host=" . HOST . ";port=" . PORT . ";dbname=" . DATA;
$options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
$pdo = new PDO($dsn, USER, PASS, $options);

//SELECT
try{
$sql = "SELECT user.nom as 'nom', user.prenom as 'prenom', facture.prix as 'prix', user.id_user as 'id_user',bon_livraison.id_bon as 'id_bon', bon_livraison.materiel as 'materiel',devis.id_devis as 'id_devis', facture.id_facture as 'id_facture' FROM facture join devis join bon_livraison join user WHERE (facture.id_devis=devis.id_devis) and (devis.id_bon=bon_livraison.id_bon) and (bon_livraison.id_client=user.id_user) AND (payer <> 1);";
$pdoStatement = $pdo->prepare($sql);
$pdoStatement->execute();
} catch (Exception $ex) {
    echo $ex->getMessage();
}   
$tab = [];
while ($row = $pdoStatement->fetch()) {
    array_push($tab, array("nom" => $row['nom'],"prenom" => $row['prenom'],"prix" => $row['prix'],"materiel" => $row['materiel'],"id_user" => $row['id_user'], "id_bon" => $row['id_bon'], "id_devis" => $row['id_devis'], "id_facture" => $row['id_facture']));
}

echo (json_encode($tab));
?>