/*globals $*/


 $(".form input#lg").click(function (e) {
    e.preventDefault();
   
     if( $('.form input#email ').val().length === 0 ) {
   $('.form input#email ').css( "border", "1px solid #FB9E25" ); 
             return;
    }
    if( $('.form input#p ').val().length === 0 ) {
   $('.form input#p ').css( "border", "1px solid #FB9E25" ); 
             return;
    } 
    
   var dataJson= {
	"email":$('.form input#email ').val(),
	"password":$('.form input#p ').val()
	
};



  //  console.log(formData);

    $.ajax({


        url: $('.form').attr("action"),
        type: 'POST',
        data: JSON.stringify(dataJson),
        contentType: 'application/json',
        async: false,
        success: function (data) {
             localStorage.setItem('supervisor_token',data.token);
            window.location.replace("main.html");
             
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("some error" + textStatus);
        },
        cache: false,
       
       // contentType: false,
        processData: false
    });

    return false;
});

$(".form input#sg").click(function (e) {
    e.preventDefault();
    window.location.replace("signup.html");
});