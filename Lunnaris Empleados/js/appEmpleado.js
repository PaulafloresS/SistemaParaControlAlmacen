var db = firebase.firestore();
//Función que realiza el inicio de sesión 
function ingreso() {

    /*Aquí se hará el login de los empleados:
    Primero se verifica a través de la función de inicio de sesión que el usuario sea uno valido 
    y esté registrado
    Después se accede a sus datos y se verifica que tipo de usuario es y se le envía a su pantalla correspondiente

    */
    var email1 = document.getElementById('email1').value;
    var contra1 = document.getElementById('contra1').value;
    firebase.auth().signInWithEmailAndPassword(email1, contra1)
        .then((user) => {
            if (user != null) {
                db.collection('usuarios').doc(user.user.email).get().then((docElements) => {
                        if (docElements.exists) {
                            var userType = docElements.data().tipoUsuario
                            switch (userType) {
                                case 'Almacenista':
                                    location.replace('Almacenista/homeAlmacenista.html')

                                    break;
                                case 'Jefe de usuarios':
                                    location.replace('Jefe de usuarios/homeJefeUsuarios.html')

                                    break;
                                case 'Usuario':
                                    location.replace('Usuario/homeUsuario.html')

                                    break;

                                default:
                                    console.log("tipo de usuario desconocido (diferente a los tres programados)")
                                    break;
                            }
                        }
                    })
            }

            // ...
        })
        //Manejador de errores
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
}

//función que sirve para verificar los cambios en caso de que el usuario intente iniciar sesión
function wachador() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('existe un usuario activo')
            iaTeVeoWe(user);
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            //var email = user.email;
            var emailVerified = user.emailVerified;
            //var uid = user.uid;
            // ...
            console.log(user.emailVerified);
        } else {
            console.log('no existe usuario activo')
            contenido.innerHTML = `
            <div class="container mt-4">
            <div class="alert alert-danger" role="alert">
      <h4 class="alert-heading">¡Sesión no iniciada!</h4>
    </div>
        </div>
            `;
        }
    });
}
//Llamado a la función para ejecutarla
wachador();


function iaTeVeoWe(user) {
    var user = user;
    var contenido = document.getElementById('contenido');
    if (user.emailVerified) {
        contenido.innerHTML = `
        <div class="container mt-4">
        <div class="alert alert-success" role="alert">
  <h4 class="alert-heading">¡Bienvenido! ${user.email}...Iniciando sesión</h4>

  <hr>

</div>

        <button onclick="cerrar()" class="btn btn-danger">Cerrar Sesión</button>
    </div>
        `;
    }
}

function cerrar() {
    firebase.auth().signOut()
        .then(function() {
            console.log('Saliendo');
        })
        .catch(function(error) {
            console.log(error);

        })

}