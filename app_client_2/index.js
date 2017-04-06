/*globals $*/


 $(".form input#lg").click(function (e) {
    e.preventDefault();
   
    console.log($('.form input#email ').val());
    console.log($('.form input#p ').val());
    if($.trim($('.form input#email').val()) == ''){
      alert('Input can not be left blank');
      return;
   }
   if($.trim($('.form input#p').val()) == ''){
      alert('Input can not be left blank');
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