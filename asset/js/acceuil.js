var msg_retour = document.getElementById("msg_retour");
var dialog = document.getElementById("favDialog");

var header_bon =  document.getElementById("header_bon");
var header_devis =  document.getElementById("header_devis");
var header_facture =  document.getElementById("header_facture");



document.addEventListener("DOMContentLoaded", (evt) => {

    header_bon.hidden = true;
    header_devis.hidden = true;
    header_facture.hidden = true;

    lecture();
   
});

request = new XMLHttpRequest();
var tab= [];
var objet;
var obj_Pointeur = null;
let index = null;
function lecture() {

try {

        request.open("GET", "/Site-Process-Maintenance/asset/API/func.acceuil/func.lect.acceuil.php", true);
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

                    let h3 = document.createElement("h3");
                    h3.innerHTML="facture en cours";
                    div_1.appendChild(h3);

                    for (const [key, value1] of Object.entries(msg)) {

                        objet = {
                            "id_user":msg[key].id_user,
                            "id_bon":msg[key].id_bon,
                            "id_devis":msg[key].id_devis,
                            "id_facture":msg[key].id_facture
                        }
                        tab.push(objet);

                        let div_2 = document.createElement("div");
                        div_2.style.display="flex";
                        div_1.appendChild(div_2);

                        let btn_div = document.createElement("button");
                        btn_div.textContent = "payer";
                        btn_div.style.marginRight="10px";
                        btn_div.value = tab.length - 1;
                        index=tab.length - 1;

       
                        btn_div.addEventListener("click", (evt) => {
                            let result = null;
                            //console.log("bouton : " + msg[key].id_bon + "   ---    " + JSON.stringify(msg[key]));
                            //window.sessionStorage.setItem("devis_key", JSON.stringify(msg[key]));
                            dialog.close();
                            if (confirm("Voulez vous valider cette facture ?" + 
                            msg[key].nom + " - " + msg[key].prenom + " - " + msg[key].materiel + " - " + msg[key].prix + "€")) {

                                payer(tab[index].id_facture);

                            }
                              
                            div_1.remove();
                            
                        });

                        div_2.appendChild(btn_div);

                        let span_div = document.createElement("span");
                        span_div.textContent = msg[key].nom + " - " + msg[key].prenom + " - " + msg[key].materiel + " - " + msg[key].prix + "€";

                        div_2.appendChild(btn_div);
                        div_2.appendChild(span_div);


                    }

                    let btn_div2 = document.createElement("button");
                    btn_div2.textContent = "fermer";
                    btn_div2.style.marginTop="10px";

                    btn_div2.addEventListener("click", (evt) => {

                        dialog.close();

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

function payer(id) {

    try {
    
            request.open("GET", "/Site-Process-Maintenance/asset/API/func.acceuil/func.payer.acceuil.php?facture=" + id, true);
            request.setRequestHeader("Content-type", "application/json");
            request.send();
            request.onreadystatechange = function () {
    
                if ((request.readyState == 4) && ((request.status == 200) || (request.status == 0))) {
    
                    msg_retour.innerHTML = request.response;
                    console.log(request.response);
    
                    Lecture_facture(id)

                            //lecture(); 
         

            }
        }
    } catch (err) {
        console.log(err);
    }

}

