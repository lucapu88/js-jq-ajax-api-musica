// Eseguire una chiamata ajax all'api di boolean: https://flynn.boolean.careers/exercises/api/array/music che restituisce una lista di 10 dischi musicali.
// Utilizzando handlebars, disegnare in pagina una card per ogni disco.
// BONUS: aggiungere una tendina con i generi: pop, rock, metal e jazz, che permette all'utente di filtrare i dischi visualizzati in base al genere selezionato.
var template_html = $('#myTemplate').html();//recupero il codice html del template
var template_function = Handlebars.compile(template_html);//do in pasto a handlebars il codice html


$.ajax({
  url : 'https://flynn.boolean.careers/exercises/api/array/music',
  method : 'get',
  success : function(data) {
    for (var i = 0; i < data.response; i++) {
      var context = { //creo la variabile con il contenuto che andrà nel template
        imgCopertina : data.poster,
        titolo : data.title,
        artista : data.author,
        anno : data.year
      }
      var disco = template_function(context); // utilizzando la funzione generata da handlebars, creo l'html finale
      $('.dischi-container').append(disco); // infine vado ad appendere nel container il mio template
    }
  },
  error : function(err) {

  }
});
