/*globals $*/

$(".form ").submit(function(e){
    e.preventDefault();
    var formData = new FormData($(this)[0]);
 
    $.ajax({
        
        
        url: $('.form').attr("action"),
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
                window.location.replace("/dashboard");

        },

         error: function(XMLHttpRequest, textStatus, errorThrown) {
     alert("some error");
          },
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
});

$(".form input#lg").click(function(e){
    e.preventDefault();
    window.location.replace("/login");
});

 $('.form input#preview').change(function(e) {
     var filename = $('input[type=file]').val().split('\\').pop();
        console.log(filename);
         $('.form img').attr("src", filename);
 });