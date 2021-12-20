var nom = document.getElementsByClassName("form_nom")[0];
var prenom = document.getElementsByClassName("form_prenom")[0];
var email = document.getElementsByClassName("form_email")[0];
var adresse = document.getElementsByClassName("form_adresse")[0];
var postal = document.getElementsByClassName("form_postal")[0];
var telephone = document.getElementsByClassName("form_telephone")[0];
var msg_retour = document.getElementById("msg_retour");
var dialog = document.getElementById("favDialog");
var dialog_div =  document.getElementById("dialog_div");
var header_bon =  document.getElementById("header_bon");
var header_devis =  document.getElementById("header_devis");
var header_facture =  document.getElementById("header_facture");

header_bon.hidden = true;
header_devis.hidden = true;
header_facture.hidden = true;

let user_key = JSON.parse(sessionStorage.getItem("user_key"));
if (user_key != null){
    nom.value = user_key.nom;
    prenom.value = user_key.prenom;
    email.value = user_key.prenom;
    adresse.value = user_key.adresse;
    postal.value = user_key.code_postale;
    telephone.value = user_key.telephone;
    header_bon.hidden = false;
    header_devis.hidden = true;
    header_facture.hidden = true;
}

var id_user = null;

let btn = document.getElementById("btn_enr");
btn.addEventListener("click", (evt) => {
    if (id_user > 0){
        update();
    }else{
        enregistrer();
    }
});

request = new XMLHttpRequest();

function enregistrer() {
    if ((nom.value != "") && (prenom.value != "") && (telephone.value != ""))
    {
    try {
        let tab = {
            "nom": nom.value,
            "prenom": prenom.value,
            "couriel": email.value,
            "adresse": adresse.value,
            "postal": postal.value,
            "telephone": telephone.value
        };

        var str_json = "user=" + (JSON.stringify(tab));
        console.log(str_json);

        request.open("GET", "/Site-Process-Maintenance/asset/API/func.client/func.enr.user.php?" + str_json, true);
        request.setRequestHeader("Content-type", "application/json");
        request.send();
        request.onreadystatechange = function () {

            if ((request.readyState == 4) && ((request.status == 200) || (request.status == 0))) {

                console.log(request.response);
                msg_retour.innerHTML = request.response;
                lecture();
            }
        }


    } catch (err) {
        console.log(err);
    }
}else{

      
    let div_1 = document.createElement("div");
    dialog_div.appendChild(div_1);

    let div_2 = document.createElement("div");
    div_1.appendChild(div_2); 

    let span_div = document.createElement("span");
    span_div.textContent = "Veuillez remplir les champs obligatoires";
    div_2.appendChild(span_div);

    let div_3 = document.createElement("div");
    div_1.appendChild(div_3); 

    let btn_div = document.createElement("button");
    btn_div.textContent =  "Fermer";
    btn_div.addEventListener("click",(evt)=>{
       dialog.close();
       div_1.remove();
    });
    div_3.appendChild(btn_div);
    dialog.showModal();
}

}

function update() {

    if ((nom.value != "") && (prenom.value != "") && (telephone.value != "")) {
        
        try {

            let tab = {
                "nom": nom.value,
                "prenom": prenom.value,
                "email": email.value,
                "adresse": adresse.value,
                "postal": postal.value,
                "telephone": telephone.value
            };

            let str_json = "user=" + (JSON.stringify(tab));
            console.log(str_json);

            request.open("GET", "/Site-Process-Maintenance/asset/API/func.bon/func.upd.user.php?" + str_json, true);
            request.setRequestHeader("Content-type", "application/json");
            request.send();
            request.onreadystatechange = function () {

                if ((request.readyState == 4) && ((request.status == 200) || (request.status == 0))) {

                    msg_retour.innerHTML = request.response;
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

        request.open("GET", "/Site-Process-Maintenance/asset/API/func.client/func.lect.user.php", true);
        request.setRequestHeader("Content-type", "application/json");
        request.send();
        request.onreadystatechange = function () {

        if ((request.readyState == 4) && ((request.status == 200) || (request.status == 0))) {

                console.log(request.response);
                //msg_retour.innerHTML = request.response;
    
                let msg = JSON.parse(request.response);
      
                let div_1 = document.createElement("div");
                dialog_div.appendChild(div_1);
    
                for (const [key, value1] of Object.entries(msg)) {
      
                      
                        let div_2 = document.createElement("div");
                        div_2.style.display="block";
                        div_1.appendChild(div_2);

                        let btn_div = document.createElement("button");
                        btn_div.style.marginRight="10px";
                        btn_div.textContent =  "select";
                        btn_div.value = msg[key].id;
                        id_user=msg[key].id;

                        btn_div.addEventListener("click",(evt)=>{
                            console.log(msg[key]);
                           window.sessionStorage.setItem("user_key",JSON.stringify(msg[key]));
                           

                           nom.value=msg[key].nom;
                           prenom.value=msg[key].prenom;
                           telephone.value=msg[key].telephone;
                           email.value=msg[key].couriel;
                           adresse.value=msg[key].adresse;
                           postal.value = msg[key].code_postale;

                           header_bon.hidden = false;
                           header_devis.hidden = true;
                           header_facture.hidden = true;

                           dialog.close();
                           div_1.remove();

                        });

                        let span_div = document.createElement("span");
                        span_div.textContent = msg[key].nom +" - "+ msg[key].prenom+" - "+ msg[key].telephone +" ";
                  
                        div_1.appendChild(btn_div);
                        div_1.appendChild(span_div);
                    }
                
                    let btn_div2 = document.createElement("button");
                    btn_div2.textContent = "Nouveau";
                    btn_div2.style.marginRight="10px";
 
                    btn_div2.addEventListener("click", (evt) => {
                        console.log("nouveau bon");
                        dialog.close();

                        nom.value="";
                        prenom.value="";
                        telephone.value="";
                        email.value="";
                        adresse.value="";
                        postal.value ="";

                        id_user = null;

                        header_bon.hidden = true;
                        header_devis.hidden = true;
                        header_facture.hidden = true;
               
                        div_1.remove();
                    });

                    div_1.appendChild(btn_div2);

                    dialog.showModal(); 

                }
        
       
    }
        
    } catch (err) {
            console.log(err);
    }

}