// Eseguire una chiamata ajax all'api di boolean: https://flynn.boolean.careers/exercises/api/array/music che restituisce una lista di 10 dischi musicali.
// Utilizzando handlebars, disegnare in pagina una card per ogni disco.
// BONUS: aggiungere una tendina con i generi: pop, rock, metal e jazz, che permette all'utente di filtrare i dischi visualizzati in base al genere selezionato.
$(document).ready(function(){
  var template_html = $('#myTemplate').html();//recupero il codice html del template
  var template_function = Handlebars.compile(template_html);//do in pasto a handlebars il codice html
  $.ajax({
    url : 'https://flynn.boolean.careers/exercises/api/array/music',
    method : 'get',
    success : function(data) {
      var album = data.response //recupero l'array che è nell'url e contiene le proprietà di tutti gli album
      for (var i = 0; i < album.length; i++) {
        var context = { //creo la variabile con il contenuto che andrà nel template
          imgCopertina : album[i].poster,
          titolo : album[i].title,
          artista : album[i].author,
          anno : album[i].year,
          genere : album[i].genre
        }
        var disco = template_function(context); // utilizzando la funzione generata da handlebars, creo l'html finale
        $('.dischi-container').append(disco); // infine vado ad appendere nel container il mio template
      }
    },
    error : function(err) {
      alert('error');
    }
  });
  $('.trovaAlbum').change(function(){ //verifico se il genere dell'album corrisponde al genere selezionato
    $('.disco-singolo').each(function(){ //vado a verificarlo per ogni singolo disco
      var genere = $(this).attr('dataGenere'); //creo una var che mi prende l'attributo del data
      if (genere.toLowerCase() == $('.trovaAlbum').val()) { //se il genere del disco è uguale al genere selezionato nel select allora lo mostro
        $(this).fadeIn();
      } else {
        $(this).fadeOut(); //altrimenti lo nascondo
      }
    });
  });
});
