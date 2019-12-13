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
      var genereSelect = $('.trovaAlbum').val() //creo una var che mi prende il genere selezionato dal select (ovvero il val dell'option)
    if (genereSelect == '') { // se il genere selezionato è uguale ad una stringa vuota, ovvero è impostato su 'Scegli un genere' (che non ha val)
      $('.disco-singolo').fadeIn(); //mostra tutti i div con gli album
    } else { //altrimenti, se è impostato su una delle tipologie di generi (rock metal ecc...)
      $('.disco-singolo').each(function(){ //vado a verificare per ogni singolo div
        var genere = $(this).attr('dataGenere'); //creo una var che mi prende l'attributo del data
        if (genere.toLowerCase() == genereSelect.toLowerCase()) { //se il genere del data attribuito al div è uguale al genere del disco selezionato dal select, allora lo mostro
          $(this).fadeIn();
        } else {
          $(this).fadeOut(); //altrimenti lo nascondo
        }
      });
    }

  });
});
