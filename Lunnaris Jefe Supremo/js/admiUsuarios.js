var db = firebase.firestore();

//Aquí vamos a leer datos de la colección donde están nuestros usuarios y ponerlos en una tabla bonita uwu
var tablaChida = document.getElementById('tablaChida')

db.collection("usuarios").onSnapshot((querySnapshot) => {
    tablaChida.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().tipoUsuario}`);
        tablaChida.innerHTML += `
        <tr>
        <th scope="row">${doc.data().nombre}</th>
        <td>${doc.data().tipoUsuario}</td>
        <td>${doc.id}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar <i class="fas fa-times-circle"></i></button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}')">Editar <i class="far fa-edit"></i></button></td>
    </tr>
        `

    });
});

//Ahora vamos a borrar cosas así como si fueramos Thanos.

function eliminar(id) {
    db.collection("usuarios").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

//En esta parte le vamos a dar el poder de modifcar los datos del usuario :O es como dios pero chido



function editar(id) {
    var washingtonRef = db.collection("usuarios").doc(id);
    return washingtonRef.update({
        nombre: nombre,
        tipoUsuario: tipo,
        correo: email,
    })
        .then(function () {
            console.log("Document successfully updated!");
        })
        .catch(function (error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
}




