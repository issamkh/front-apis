/**
 * Created by issam on 03/02/19.
 */
//------image de chargement avant la reponse ajax
$( "#loader" ).append('<img src="/loader.gif">');
    //----- service pour selectionner les categories
jQuery.ajax({
    url     : 'http://127.0.0.1:8000/categories',
    async   : true,
    contentType: "application/json",
    dataType: 'json',
    type    : 'GET'
}).done(function(response) {

    $( "#loader").hide();

    //-------- on affiche les categories dans un tableau ,
    $.each(response, function(i, val) {
        $( "#cat" ).append('<tr><td>'+val.nom+'</td><td>'+val.priorite+'</td><td><a class="btn btn-info" href="edit-categorie.html?id='+val.id+'">update</a>' +
        '<a class="btn btn-danger" onclick="deleteCategorie('+val.id+')">delete</a></td></tr>');
    });



}).fail(function(xhr, status, error) {
    alert(status);
    $( "#loader").hide();
});


//--------- service pour supprimer une categorie

 function deleteCategorie(id){

     jQuery.ajax({
         url     : 'http://127.0.0.1:8000/categories/'+id,
         async   : true,
         contentType: "application/json",
         dataType: 'json',
         type    : 'DELETE'
     }).done(function(response) {

         alert("Categorie supprimée avec succée");

         location.reload();

     }).fail(function(xhr, status, error) {
         alert(status);
     });
}