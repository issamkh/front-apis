/**
 * Created by issam on 03/02/19.
 */

//-------service pour creattion nouvelle categorie
$("#alert").hide();
$( "#createForm" ).on( "submit", function( event ) {
    event.preventDefault();


    var nom =  $( '#nom' ).val();
    var priorite =  $( '#priorite' ).val();

    //----  creation objet json apartir des champs de formulaire
    var jsonObject= {
        "nom":nom,
        "priorite" : priorite
    };

    //---- pour convertir l'objet json en string et l'envoyer au webserveur
    var data = JSON.stringify(jsonObject);


    //----- requette POST avec ajax
    jQuery.ajax({
        url     : 'http://127.0.0.1:8000/categories',
        async   : true,
        contentType: "application/json",
        dataType: 'json',
        type    : 'POST',
        data    : data
    }).done(function(response) {
        $("#alert").html("");
        $("#alert").append(JSON.stringify( response ) );
        $("#alert").show();

    }).fail(function(xhr, status, error) {
        $("#alert").html("");
        $("#alert").append( status );
        $("#alert").show();   });
});