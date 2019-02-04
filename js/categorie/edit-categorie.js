/**
 * Created by issam on 03/02/19.
 */


//---- pour extraire  le param id apartir de l URL
$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
        .exec(window.location.href);
    if (results == null) {
        return 0;
    }
    return results[1] || 0;
}

var id = $.urlParam('id');



//------------ service pour selectionné la categorie à modifier
$( "#loader" ).append('<img src="/loader.gif">');

//----- requette GET avec ajax
jQuery.ajax({
    url     : 'http://127.0.0.1:8000/categories/'+id,
    async   : true,
    contentType: "application/json",
    dataType: 'json',
    type    : 'GET'
}).done(function(response) {

    $("#loader").hide();
    $("#nom").val(response.nom);
    $("#priorite").val(response.priorite);

});


//--------------service modification categorie
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
        url     : 'http://127.0.0.1:8000/categories/'+id,
        async   : true,
        contentType: "application/json",
        dataType: 'json',
        type    : 'PUT',
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


