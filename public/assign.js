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
	"supervisorName":localStorage.getItem('supervisor_Name'),
	"guardName":$('.col-1-3 select#guards ').val(),
	"location":$('.col-1-3 select#location ').val(),
	"guardImageUrl":$('.col-1-3 img').attr("src"),
	"supervisorImageUrl":localStorage.getItem('supervisor_ImageUrl'),
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
          headers: {
        'Content-Type':'application/json'
    },
    dataType: 'json',
        async: false,
         beforeSend: function (xhr) {
        /* Authorization header */
        xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('supervisor_token'));
    },
        success: function (data,textStatus,xhr) {
           alert('Success'+xhr.status);
    
        },
        complete:function (xhr,textStatus){
                if(xhr.status===401)
                window.location.replace('login.html');
                else if(xhr.status===404)
                alert("Some field missing");
                else if(xhr.status===402)
                alert("Error while adding in Database");
        },

        
        cache: false,
       
       // contentType: false,
        processData: false
    });

    return false;
});


