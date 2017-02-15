/*globals $*/

$.getJSON($('.col-1-3 select#guards').attr("action"), function (data) {

    $.each(data, function (k, v) {
        $('.col-1-3 select#guards').append('<option name="' + v.name + '">' + v.name + '</option>');
    });
    $('.col-1-3 select#guards').click(function () {
        var x = $('option:selected', this).text();
        $.each(data, function (k, v) {

            if (x == v.name) {
                $('.col-1-3 input#email').val(v.email);
                $('.col-1-3 img').attr("src", v.imageUrl);
            }
        });

    });
});

 $(".col-1-3").submit(function (e) {
    e.preventDefault();
   
  
   var dataJson= {
	"supervisorName":"Wasif",
	"guardName":$('.col-1-3 select#guards ').val(),
	"location":$('.col-1-3 select#location ').val(),
	"guardImageUrl":$('.col-1-3 img').attr("src"),
	"supervisorImageUrl":"http://res.cloudinary.com/wasif007/image/upload/v1487107545/pingfolder/mczmhut85bjwneq2a1kz.jpg",
	"time":$('.col-1-3 select#time ').val(),
	"guardUsername":$('.col-1-3 input#email ').val()
};

console.log(dataJson);

  //  console.log(formData);

    $.ajax({


        url: $(this).attr("action"),
        type: 'POST',
        data: JSON.stringify(dataJson),
        contentType: 'application/json',
        async: false,
        success: function (data) {
            alert("SUCCESS");
    
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


