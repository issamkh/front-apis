/**
 * Created by issam on 03/02/19.
 */

//------image de chargement avant la reponse ajax
$( "#loader" ).append('<img src="/loader.gif">');
//----- service pour selectionner les elements
jQuery.ajax({
    url     : 'http://127.0.0.1:8000/elements',
    async   : true,
    contentType: "application/json",
    dataType: 'json',
    type    : 'GET'
}).done(function(response) {

    $( "#loader").hide();

    //-------- on affiche les elements dans un tableau ,
    $.each(response, function(i, val) {
        $( "#cat" ).append('<tr><td>'+val.nom+'</td><td>'+val.poids+'</td><td>'+val.categorie.nom+'</td><td>'+val.description+'</td><td><a class="btn btn-info" href="edit-element.html?id='+val.id+'">update</a>' +
        '<a class="btn btn-danger" onclick="deleteElement('+val.id+')">delete</a></td></tr>');
    });



}).fail(function(xhr, status, error) {
    alert(status);
    $( "#loader").hide();
});


//--------- service pour supprimer un element

function deleteElement(id){

    jQuery.ajax({
        url     : 'http://127.0.0.1:8000/elements/'+id,
        async   : true,
        contentType: "application/json",
        dataType: 'json',
        type    : 'DELETE'
    }).done(function(response) {

        alert("Element supprimée avec succée");

        location.reload();

    }).fail(function(xhr, status, error) {
        alert(status);
    });
}