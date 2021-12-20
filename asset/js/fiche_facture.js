var nom = document.getElementsByClassName("form_nom")[0];
var prenom = document.getElementsByClassName("form_prenom")[0];
var materiel = document.getElementsByClassName("form_materiel")[0];
var ref_mat = document.getElementsByClassName("form_ref_mat")[0];
var description = document.getElementsByClassName("form_description")[0];
var note = document.getElementsByClassName("form_note")[0];
var prix = document.getElementsByClassName("form_prix")[0];
var date = document.getElementsByClassName("form_date")[0];
var garantie = document.getElementsByClassName("form_garantie")[0];
var payer = document.getElementsByClassName("form_payer")[0];
var msg_retour = document.getElementById("msg_retour");
var numDevis = document.getElementById("numDevis");
var dialog = document.getElementById("favDialog");

var header_facture =  document.getElementById("header_facture");

header_facture.hidden = true;

let user_key = JSON.parse(sessionStorage.getItem("user_key"));
let bon_key = JSON.parse(sessionStorage.getItem("bon_key"));
let devis_key = JSON.parse(sessionStorage.getItem("devis_key"));


var id_devis = null;

document.addEventListener("DOMContentLoaded", (evt) => {

        nom.innerHTML = user_key.nom;
        prenom.innerHTML = user_key.prenom;
        materiel.innerHTML=bon_key.materiel;
        ref_mat.innerHTML=bon_key.ref_materiel;
        description.value = devis_key.description;
        prix.value=devis_key.prix;
        garantie.checked=(devis_key.garantie=="1")?true:false;
 
        lecture();
       
});

request = new XMLHttpRequest();

function lecture() {

    try {

            request.open("GET", "/Site-Process-Maintenance/asset/API/func.fact/func.lect.facture.php?user=" + devis_key.id_devis, true);
            request.setRequestHeader("Content-type", "application/json");
            request.send();
            request.onreadystatechange = function () {

                if ((request.readyState == 4) && ((request.status == 200) || (request.status == 0))) {

                    //msg_retour.innerHTML = request.response;
                    console.log(request.response);


                    let msg = JSON.parse(request.response);


                    if (Object.entries(msg).length != 0) {

                        for (const [key, value1] of Object.entries(msg)) {

                                window.sessionStorage.setItem("facture_key", JSON.stringify(msg[key]));
                                
                                numDevis.textContent = "Facture N° " + msg[key].id_facture;
                                id_facture = msg[key].id_facture;

                                note.value=msg[key].description;
                                date.textContent = msg[key].date_pris_compte;
                                payer.checked = (msg[key].payer==1)?true:false;

                    }   

                }
            }
        }
    } catch (err) {
            console.log(err);
    }

}
var id_facture = null;
let btn = document.getElementById("btn_enr");
btn.addEventListener("click", (evt) => {
    if (id_facture > 0){
        update();
    }else{
        enregistrer();
    }  
});

function enregistrer() {
    if ((materiel.value != "") && (ref_mat.value != "")) {
        try {

            payer_value = (payer.checked == true) ? 1 : 0;

            let tab = {
                "id_devis": devis_key.id_devis,
                "id_facture": "0",
                "description": note.value,
                "prix": prix.value,
                "payer":payer_value
            };

            let str_json = "facture=" + (JSON.stringify(tab));
            console.log(str_json);

            request.open("GET", "/Site-Process-Maintenance/asset/API/func.fact/func.enr.facture.php?" + str_json, true);
            request.setRequestHeader("Content-type", "application/json");
            request.send();
            request.onreadystatechange = function () {

                if ((request.readyState == 4) && ((request.status == 200) || (request.status == 0))) {

                    //msg_retour.innerHTML = request.response;
                    console.log(request.response);
                    lecture();
                }
            }
        } catch (err) {
            console.log(err);
        }

    }
}

function update() {

    if ((materiel.value != "") && (ref_mat.value != "")) {
        
        try {

            payer_value = (payer.checked == true) ? 1 : 0;

            let tab = {
                "id_devis": devis_key.id_devis,
                "id_facture": id_facture,
                "description": note.value,
                "prix": prix.value,
                "payer":payer_value
            };

            let str_json = "facture=" + (JSON.stringify(tab));
            console.log(str_json);

            request.open("GET", "/Site-Process-Maintenance/asset/API/func.fact/func.upd.facture.php?" + str_json, true);
            request.setRequestHeader("Content-type", "application/json");
            request.send();
            request.onreadystatechange = function () {

                if ((request.readyState == 4) && ((request.status == 200) || (request.status == 0))) {

                    //msg_retour.innerHTML = request.response;
                    console.log(request.response);
                    lecture();
                }
            }
        } catch (err) {
            console.log(err);
        }

    }
}