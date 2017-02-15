/*globals $*/

$.getJSON($('.row').attr("action"), function (data) {

    $.each(data, function (k, v) {
        var y= 'a' + k;
        console.log(v.imageUrl);
         $('.grid').append('<section class="speaker" >'+

         ' <div class="col-2-3">'+ 

           

           ' <h5>About ' + v.name +'</h5>'+

            '<p> Aaron Irizarry is a Senior Product Designer for Nasdaq OMX, a lover of heavy metal, a foodie, and a master of BBQ arts. You can find some of his thoughts and presentations on the conversation surrounding design over at <a href="'  +                  'http://www.discussingdesign.com/">discussingdesign.com+</a></p> '+

         ' </div><!--' +

          '--><aside class="col-1-3">'+
            '<div class="speaker-info">'+
            '<img id="' +y+'" class="img-circle" src="">'+

             // '<img id="a' + k + '" class="img-circle"  src="' + '$( \'.col-1-3 img.' +k+'\').attr("src", v.imageUrl)' +  '" >' +

              

            '</div>' +
         '</aside>' +

        '</section>');
      
    });
    
      $.each(data, function (k, v) {
              var x= '.col-1-3 img#a'+k; 
       console.log(x);
       $(x).attr("src", v.imageUrl);
      });
});