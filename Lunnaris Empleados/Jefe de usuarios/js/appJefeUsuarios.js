function cerrar() {
    firebase.auth().signOut()
        .then(function() {
            console.log('Saliendo');
            location.replace('../../../index.html')
        })
        .catch(function(error) {
            console.log(error);

        })

}

function cerrar2() {
    firebase.auth().signOut()
        .then(function() {
            console.log('Saliendo');
            location.replace('../../index.html')
        })
        .catch(function(error) {
            console.log(error);

        })

}