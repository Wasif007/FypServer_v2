/*globals $*/

$(".col-1-3").submit(function(){

    var formData = new FormData($(this)[0]);

   // console.log($(this).attr("action"));
    $.ajax({
        
        
        url: $(this).attr("action"),
        type: 'POST',
        data: formData,
        async: false,
        success: function (data,textStatus,xhr) {
           alert('Success'+xhr.status);
    
        },
        complete:function (xhr,textStatus){
                alert(xhr.status);
        },
        cache: false,
        contentType: false,
        processData: false
    });

    return false;
});

 $('.col-1-3 input#preview').change(function(e) {
     var filename = $('input[type=file]').val().split('\\').pop();
        console.log(filename);
         $('.col-1-3 img').attr("src", filename);
 });
