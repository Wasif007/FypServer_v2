/*globals $*/

$(".col-1-3").submit(function(){

    var formData = new FormData($(this)[0]);
    console.log($(this).attr("action"));
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