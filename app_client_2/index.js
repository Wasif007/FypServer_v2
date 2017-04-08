/*globals $*/


 $(".form input#lg").click(function (e) {
    e.preventDefault();
$('#names').text('');
  if( $('.form input#email ').val().length === 0 ) {
$('#names').text('Email Required'); 

  return ;
}
  if( $('.form input#p ').val().length === 0 ) {
$('#names').text('Password Required'); 
  return ;
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
            $('#names').text('Invalid Email or Password');
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