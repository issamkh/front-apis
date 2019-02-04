/**
 * Created by issam on 03/02/19.
 */

//---------service pour lister les categories
$("#alert").hide();
jQuery.ajax({
    url     : 'http://127.0.0.1:8000/categories',
    async   : true,
    contentType: "application/json",
    dataType: 'json',
    type    : 'GET'
}).done(function(response) {

    //-------- on affiche les categories dans notre select ,
    $.each(response, function(i, val) {
        $( "#categorie" ).append('<option value="'+val.id+'">'+val.nom+'</option>');
    });



}).fail(function(xhr, status, error) {
    alert(status);
    $( "#loader").hide();
});


//------------ service pour creer un element
$( "#createForm" ).on( "submit", function( event ) {
    event.preventDefault();


    var nom =  $( '#nom' ).val();
    var poids =  $( '#poids' ).val();
    var description =  $( '#description' ).val();

    //----id de la categorie selectioné
    var id= $("#categorie").val();

    //----  creation objet json apartir des champs de formulaire
    var jsonObject= {
        "nom":nom,
        "poids" : poids,
        "description" : description
    };

    //---- pour convertir l'objet json en string et l'envoyer au webserveur
    var data = JSON.stringify(jsonObject);


    //----- requette POST avec ajax
    jQuery.ajax({
        url     : 'http://127.0.0.1:8000/categorie/'+id+'/elements',
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