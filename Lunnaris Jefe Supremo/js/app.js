
var db = firebase.firestore();


//función de registro en la base de datos
//primero se hace el registro de los datos EMAIL y contraseña
//usando el email como id creamos un documento con el resto de los datos y queda ligados al usuario
function registrar() {
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var contra = document.getElementById('contra').value;
    var tipo = document.getElementById('tipo').value;

    console.log(nombre);
    console.log(tipo);

    firebase.auth().createUserWithEmailAndPassword(email, contra)
        .then(function () {
            verificar();
            document.getElementById('nombre').value = "";
            document.getElementById('email').value = "";
            document.getElementById('contra').value = "";
            document.getElementById('tipo').value = "";
        })

        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            // ..
        });

    db.collection("usuarios").doc(email).set({
        nombre: nombre,
        tipoUsuario: tipo,
        correo: email,
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id) = "";
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });

}

//Envía un correo de verificación al correo del usuario

function verificar() {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function () {
        // Email sent.
        console.log('Enviando correo');
    }).catch(function (error) {
        // An error happened.
        console.log('No se puede, no hay tortillas');
    });
}


