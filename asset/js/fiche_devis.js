var nom = document.getElementsByClassName("form_nom")[0];
var prenom = document.getElementsByClassName("form_prenom")[0];
var materiel = document.getElementsByClassName("form_materiel")[0];
var ref_mat = document.getElementsByClassName("form_ref_mat")[0];
var description = document.getElementsByClassName("form_description")[0];
var prix = document.getElementsByClassName("form_prix")[0];
var date = document.getElementsByClassName("form_date")[0];
var garantie = document.getElementsByClassName("form_garantie")[0];
var accepte = document.getElementsByClassName("form_accepte")[0];
var msg_retour = document.getElementById("msg_retour");
var numDevis = document.getElementById("numDevis");
var dialog = document.getElementById("favDialog");

var header_facture =  document.getElementById("header_facture");

header_facture.hidden = true;

let user_key = JSON.parse(sessionStorage.getItem("user_key"));
let bon_key = JSON.parse(sessionStorage.getItem("bon_key"));

nom.innerHTML = user_key.nom;
prenom.innerHTML = user_key.prenom;
materiel.innerHTML=bon_key.materiel;
ref_mat.innerHTML=bon_key.ref_materiel;

var id_devis = null;

document.addEventListener("DOMContentLoaded", (evt) => {
    lecture();
});

request = new XMLHttpRequest();

function lecture() {

    try {

            request.open("GET", "/Site-Process-Maintenance/asset/API/func.devis/func.lect.devis.php?user=" + bon_key.id_bon, true);
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
                                window.sessionStorage.setItem("devis_key", JSON.stringify(msg[key]));
                                dialog.close();
                                numDevis.textContent = "Devis N° " + msg[key].id_devis;
                                id_devis = msg[key].id_devis;
                                (id_devis>0)?header_facture.hidden = false:header_facture.hidden = true;

                                description.value=msg[key].description;
                                prix.value=msg[key].prix;
                                date.textContent = msg[key].date_pris_compte;
                                garantie.checked = (msg[key].garantie==1)?true:false;

                                accepte.checked = (msg[key].accepte==1)?true:false;

                                if (accepte.checked==true){
                                    description.disabled=true;
                                    prix.disabled=true;
                                }else{
                                    description.disabled=false;
                                    prix.disabled=false;
                                }

                                div_1.remove();
                            });

                            div_2.appendChild(btn_div);


                            let span_div = document.createElement("span");
                            span_div.textContent = msg[key].id_devis + " - " + nom.textContent + " - " + bon_key.materiel + " - " + msg[key].prix + " - " +   msg[key].date_pris_compte + " ";


                            div_2.appendChild(btn_div);
                            div_2.appendChild(span_div);

                        }
                        
                        let btn_div2 = document.createElement("button");
                        btn_div2.textContent = "Nouveau";
                        btn_div2.style.marginRight="10px";
     
                        btn_div2.addEventListener("click", (evt) => {
                            console.log("nouveau bon");
                            dialog.close();
                            numDevis.textContent = "Bon N° " + "";
                            id_devis = null;
                            date.textContent = "";
                            garantie.checked = false;
                   
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

let btn = document.getElementById("btn_enr");
btn.addEventListener("click", (evt) => {
    if (id_devis > 0){
        update();
    }else{
        enregistrer();
    }  
});


accepte.addEventListener("click", (evt) => {
    if (accepte.checked==true){
        description.disabled=true;
        prix.disabled=true;
    }else{
        description.disabled=false;
        prix.disabled=false;
    }
});
function enregistrer() {
    if ((materiel.value != "") && (ref_mat.value != "")) {
        try {

            garantie_value = (garantie.checked == true) ? 1 : 0;
            accepte_value = (accepte.checked == true) ? 1 : 0;

            let tab = {
                "id_devis": "0",
                "id_bon": bon_key.id_bon,
                "description": description.value,
                "prix": prix.value,
                "garantie": garantie_value,
                "accepte":accepte_value
            };

            let str_json = "devis=" + (JSON.stringify(tab));
            console.log(str_json);

            request.open("GET", "/Site-Process-Maintenance/asset/API/func.devis/func.enr.devis.php?" + str_json, true);
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

            garantie_value = (garantie.checked == true) ? 1 : 0;
            accepte_value = (accepte.checked == true) ? 1 : 0;
            let tab = {
                "id_devis": id_devis,
                "id_bon": bon_key.id_bon,
                "description": description.value,
                "prix": prix.value,
                "garantie": garantie_value,
                "accepte":accepte_value
            };

            let str_json = "devis=" + (JSON.stringify(tab));
            console.log(str_json);

            request.open("GET", "/Site-Process-Maintenance/asset/API/func.devis/func.upd.devis.php?" + str_json, true);
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