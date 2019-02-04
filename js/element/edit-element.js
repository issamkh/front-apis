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
});


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



//------------ service pour selectionné l'element à modifier
$( "#loader" ).append('<img src="/loader.gif">');

jQuery.ajax({
    url     : 'http://127.0.0.1:8000/elements/'+id,
    async   : true,
    contentType: "application/json",
    dataType: 'json',
    type    : 'GET'
}).done(function(response) {

    console.log(response);
    $("#loader").hide();
    $("#nom").val(response.nom);
    $("#poids").val(response.poids);
    $("#description").val(response.description);

    //------pour selectionne la categorie deja choisie pour l'element
    $("#categorie > option").each(function() {

        if(this.value == response.categorie.id){

            $("#categorie").val(this.value);

            //--pour sortir de la boucle
            return false;
        }

    });

}).fail(function(xhr, status, error) {
    $("#alert").html("");
    $("#alert").append( status );
    $("#alert").show();
});


//--------------service modification element
$("#alert").hide();
$( "#createForm" ).on( "submit", function( event ) {
    event.preventDefault();

    //----  creation objet json apartir des champs de formulaire
    var nom =  $( '#nom' ).val();
    var poids =  $( '#poids' ).val();
    var description =  $( '#description' ).val();

    //----id de la categorie selectioné
    var idCat= $("#categorie").val();

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
        url     : 'http://127.0.0.1:8000/categorie/'+idCat+'/elements/'+id,
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
