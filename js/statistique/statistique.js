/**
 * Created by issam on 03/02/19.
 */

jQuery.ajax({
    url     : 'http://127.0.0.1:8000/categories',
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

//--------service pour calculer le poids par categorie

function calculerPoids(){


    $("#divKilo").append('<img src="/loader.gif" width="80px" height="40px">');
    //----id de la categorie selectionné
    var id = $("#categorie").val();

    jQuery.ajax({
        url     : 'http://127.0.0.1:8000/statistique/'+id,
        async   : true,
        contentType: "application/json",
        dataType: 'json',
        type    : 'GET'
    }).done(function(response) {

        $("#divKilo").html('');
        $("#kilos").html(response);

    }).fail(function(xhr, status, error) {
        alert(status);
    });
}