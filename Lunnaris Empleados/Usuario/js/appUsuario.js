function cerrar() {
    firebase.auth().signOut()
        .then(function() {
            console.log('Saliendo');
            location.replace('../../index.html')
        })
        .catch(function(error) {
            console.log(error);

        })

}