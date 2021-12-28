var nom = document.getElementsByClassName("form_nom")[0];
var prenom = document.getElementsByClassName("form_prenom")[0];
var materiel = document.getElementsByClassName("form_materiel")[0];
var ref_mat = document.getElementsByClassName("form_ref_mat")[0];
var date = document.getElementsByClassName("form_date")[0];
var accepter = document.getElementsByClassName("form_accepter")[0];
var msg_retour = document.getElementById("msg_retour");
var numBon = document.getElementById("numBon");
var dialog = document.getElementById("favDialog");

var header_devis =  document.getElementById("header_devis");
var header_facture =  document.getElementById("header_facture");

header_devis.hidden = true;
header_facture.hidden = true;

let user_key = JSON.parse(sessionStorage.getItem("user_key"));
let bon_key = JSON.parse(sessionStorage.getItem("bon_key"));

nom.innerHTML = user_key.nom;
prenom.innerHTML = user_key.prenom;
var id_bon = null;

let btn = document.getElementById("btn_enr");
btn.addEventListener("click", (evt) => {
    if (id_bon > 0){
        update();
    }else{
        enregistrer();
    }

    
});

accepter.addEventListener("click", (evt) => {
    if (accepter.checked==true){
        materiel.disabled=true;
        ref_mat.disabled=true;
    }else{
        materiel.disabled=false;
        ref_mat.disabled=false;
    }
});

request = new XMLHttpRequest();

function enregistrer() {
    if ((materiel.value != "") && (ref_mat.value != "")) {
        try {

            accepter_value = (accepter.checked == true) ? "1" : "0";

            let tab = {
                "id_client": user_key.id,
                "id_bon": 0,
                "nom": user_key.nom,
                "prenom": user_key.prenom,
                "materiel": materiel.value,
                "ref_materiel": ref_mat.value,
                "accepter": accepter_value
            };

            let str_json = "bon=" + (JSON.stringify(tab));
            console.log(str_json);

            request.open("GET", "/site/Site-Process-Maintenance/asset/API/func.bon/func.enr.bon.php?" + str_json, true);
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

document.addEventListener("DOMContentLoaded", (evt) => {
    lecture();
});

function lecture() {

    try {

            request.open("GET", "/site/Site-Process-Maintenance/asset/API/func.bon/func.lect.bon.php?user=" + user_key.id, true);
            request.setRequestHeader("Content-type", "application/json");
            request.send();
            request.onreadystatechange = function () {

                if ((request.readyState == 4) && ((request.status == 200) || (request.status == 0))) {

                    //msg_retour.innerHTML = request.response;
                    console.log(request.response);


                    let msg = JSON.parse(request.response);


                    if (Object.entries(msg).length != 0) {

                        let div_1 = document.createElement("div");
                        dialog_div.appendChild(div_1);

                        for (const [key, value1] of Object.entries(msg)) {

                            let div_2 = document.createElement("div");
                            div_2.style.display="flex";
                            div_1.appendChild(div_2);

                            let btn_div = document.createElement("button");
                            btn_div.textContent = "select";
                            btn_div.style.marginRight="10px";
                            btn_div.value = msg[key].id;

                            btn_div.addEventListener("click", (evt) => {
                                console.log("bouton : " + msg[key].id_bon + "   ---    " + JSON.stringify(msg[key]));
                                window.sessionStorage.setItem("bon_key", JSON.stringify(msg[key]));
                                dialog.close();
                                materiel.value = msg[key].materiel;
                                ref_mat.value = msg[key].ref_materiel;
                                numBon.textContent = "Bon N° " + msg[key].id_bon;
                                id_bon = msg[key].id_bon;
                                date.textContent = msg[key].date_pris_compte;
                                accepter.checked = (msg[key].accepter==1)?true:false;

                                if (accepter.checked==true){
                                    materiel.disabled=true;
                                    ref_mat.disabled=true;
                                    header_devis.hidden = false;
                                    header_facture.hidden = true;
                                }else{
                                    materiel.disabled=false;
                                    ref_mat.disabled=false;
                                    header_devis.hidden = true;
                                    header_facture.hidden = true;
                                }
                               
                                div_1.remove();
                            });

                            div_2.appendChild(btn_div);


                            let span_div = document.createElement("span");
                            span_div.textContent = msg[key].id_bon + " - " + nom.textContent + " - " + msg[key].materiel+ " - " +   msg[key].date_pris_compte + " ";


                            div_2.appendChild(btn_div);
                            div_2.appendChild(span_div);

                        }
                        
                        let btn_div2 = document.createElement("button");
                        btn_div2.textContent = "Nouveau";
                        btn_div2.style.marginRight="10px";
     
                        btn_div2.addEventListener("click", (evt) => {
                            console.log("nouveau bon");
                            dialog.close();
                            materiel.value = "";
                            ref_mat.value = "";
                            numBon.textContent = "Bon N° " + "";
                            id_bon = null;
                            date.textContent = "";
                            accepter.checked = false;
                   
                            div_1.remove();
                        });

                        div_1.appendChild(btn_div2);

                        dialog.showModal();
                    }   

                }
            }

    } catch (err) {
            console.log(err);
    }

}

function update() {

    if ((materiel.value != "") && (ref_mat.value != "")) {
        
        try {

            accepter_value = (accepter.checked == true) ? 1 : 0;

            let tab = {
                "id_client": user_key.id,
                "id_bon": id_bon,
                "nom": user_key.nom,
                "prenom": user_key.prenom,
                "materiel": materiel.value,
                "ref_materiel": ref_mat.value,
                "accepter": accepter_value
            };

            let str_json = "bon=" + (JSON.stringify(tab));
            console.log(str_json);

            request.open("GET", "/Site-Process-Maintenance/asset/API/func.bon/func.upd.bon.php?" + str_json, true);
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