/*globals $*/

$(".form").submit(function(){

    var formData = new FormData($(this)[0]);
    console.log(formData);
    $.ajax({
        
        
        url: $(this).attr("action"),
        type: 'POST',
        data: formData,
        async: false,
        success: function (data) {
            alert(data);
            console.log(data);
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