$('.edu-faq .edufaq-q').on('click', function () {
    if ($(this).hasClass('on')) {
        $(this).removeClass('on');
        $(this).next().slideUp();
    } else {
        $('.edu-faq .edufaq-q').removeClass('on');
        $('.edu-faq .edufaq-ans').slideUp();
        $(this).addClass('on');
        $(this).next().slideDown();
    }
});

$('ul.oss-tabs li').click(function () {
    var tab_id = $(this).attr('data-tab');
    $('ul.oss-tabs li').removeClass('active');
    $('.oss-tab-content').removeClass('active');
    $(this).addClass('active');
    $("#" + tab_id).addClass('active');
})
$('.oss-ahm').on('click', function () {
    if ($(this).hasClass('on')) {
        $(this).removeClass('on');
        $(this).next().slideUp();
    } else {
        $(this).addClass('on');
        $(this).next().slideDown();
    }
}); 

$(document).ready(function () {
    $(document).on('click', '.faq-item .faq-question', function () {
        if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active');
        } else {
            $('.faq-item').removeClass('active');
            $(this).parent().addClass('active');
        }
    });
 
    $(document).on('click', '.eifs-item .eifs-head', function () {
        $(this).next('.eifs-body').slideToggle();
        $(this).toggleClass('active');
    });


    // LIVE only digits allowed during typing
    $("[name=mobile]").on("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");
    });
	
	/////////////////// Common Form R.P.  /////////////////////
	
	$(".PortalcontactForm").on("submit", function (e) {
		e.preventDefault();

		var form = $(this);
		var formData = form.serialize();

		// Clear previous error
		$("#form_error_id").html("");

		// Validation
		var name = form.find("[name=name]").val().trim();
		var email = form.find("[name=email]").val().trim();
		var mobile = form.find("[name=mobile]").val().trim();
		var message = form.find("[name=message]").val().trim();

		if (name === "" || email === "" || message === "") {
			$("#form_error_id").html("Please fill all required fields.");
			return false;
		}

		var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailReg.test(email)) {
			$(".eml_err_cls").html("Please enter a valid email address.");
			return false;
		}

		var mobileReg = /^[0-9]+$/;
		if (!mobileReg.test(mobile)) {
			$(".phone_err_cls").html("Please enter digits only in mobile number.");
			return false;
		}
		
		
		var countryCode = $("#country_code").val();
		if (mobile !== "" && countryCode !== '') {
			var err_phone = validateMobile(mobile, countryCode);

			if (err_phone !== '') {
				$("#mobile").focus();
				$(".phone_err_cls").html(err_phone);
				return false;
			} else {
				$(".phone_err_cls").html("");
			}
		}

		form.find("button[type=submit]").prop("disabled", true).text("Sending...");
		
		var root_url = $("#root_url").val();

		$.ajax({
			url: root_url+"ajax_footer_process.php",
			type: "POST",
			data: formData,
			dataType: "json",   
			success: function (response) {
				
				$(".phone_err_cls").html("");
				$(".eml_err_cls").html("");		

				if (response.status === "error") {
					// Show PHP error message
					$("#form_error_id").html(response.message);
					form.find("button[type=submit]").prop("disabled", false).text("Send Message");
					return;
				}
                else
				if (response.status === "success") {
					form.hide();

					var msgBox = `
						<div style="display:flex;align-items:center;gap:15px;padding:20px 25px;background:#f6f8fa;border:1px solid #d0d7de;border-radius:10px;margin-top:20px;animation:fadeSlide .3s ease-out;">
							<div style="width:45px;height:45px;background:#1f883d;color:#fff;font-size:25px;border-radius:50%;display:flex;align-items:center;justify-content:center;">âœ”</div>
							<div>
								<h4 style="margin:0;font-size:20px;color:#1f2328;font-weight:600;">Thank You!</h4>
								<p style="margin:3px 0 0;color:#57606a;font-size:14px;">${response.message}</p>
							</div>
						</div>
						<style>
							@keyframes fadeSlide {
								from {opacity:0; transform:translateY(10px);}
								to {opacity:1; transform:translateY(0);}
							}
						</style>
					`;

					$(msgBox).insertAfter(form);
				}
				else{
					$("#form_error_id").html(response.message);
					form.find("button[type=submit]").prop("disabled", false).text("Send Message");
					return;
				}
			},
			error: function () {
				$("#form_error_id").html("Something went wrong! Please try again.");
				form.find("button[type=submit]").prop("disabled", false).text("Send Message");
			}
		});
	});
	
	////////////////// Contact Us From   R.P.  /////////
	
	$(".WebContactForm").on("submit", function (e) {
		e.preventDefault();

		var form = $(this);
		var formData = form.serialize();

		// Clear previous error
		$("#cont_error_id").html("");

		// Validation
		var name = form.find("[name=your_name]").val().trim();
		var email = form.find("[name=email]").val().trim();
		var mobile = form.find("[name=mobile]").val().trim();
		var phone_time = form.find("[name=phone_time]").val().trim();
		var message = form.find("[name=message]").val().trim();

		if (name === "" || email === "" || phone_time === "" || message === "") {
			$("#cont_error_id").html("Please fill all required fields.");
			return false;
		}

		var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailReg.test(email)) {
			$(".eml_err_cls").html("Please enter a valid email address.");
			return false;
		}

		var mobileReg = /^[0-9]+$/;
		if (!mobileReg.test(mobile)) {
			$(".phone_err_cls").html("Please enter digits only in mobile number.");
			return false;
		}		
		
		var countryCode = $("#country_code").val();
		if (mobile !== "" && countryCode !== '') {
			var err_phone = validateMobile(mobile, countryCode);

			if (err_phone !== '') {
				$("#mobile").focus();
				$(".phone_err_cls").html(err_phone);
				return false;
			} else {
				$(".phone_err_cls").html("");
			}
		}

		form.find("button[type=submit]").prop("disabled", true).text("Sending...");
		
		var root_url = $("#root_url").val();

		$.ajax({
			url: root_url+"ajax_contact_process.php",
			type: "POST",
			data: formData,
			dataType: "json",  
			success: function (response) {
				
				$(".phone_err_cls").html("");
				$(".eml_err_cls").html("");	

				if (response.status === "error") {
					// Show PHP error message
					$("#cont_error_id").html(response.message);
					form.find("button[type=submit]").prop("disabled", false).text("Send Message");
					return;
				}
				else
				if (response.status === "success") {
					form.hide();

					var msgBox = `
						<div style="display:flex;align-items:center;gap:15px;padding:20px 25px;background:#f6f8fa;border:1px solid #d0d7de;border-radius:10px;margin-top:20px;animation:fadeSlide .3s ease-out;">
							<div style="width:45px;height:45px;background:#1f883d;color:#fff;font-size:25px;border-radius:50%;display:flex;align-items:center;justify-content:center;">âœ”</div>
							<div>
								<h4 style="margin:0;font-size:20px;color:#1f2328;font-weight:600;">Thank You!</h4>
								<p style="margin:3px 0 0;color:#57606a;font-size:14px;">${response.message}</p>
							</div>
						</div>
						<style>
							@keyframes fadeSlide {
								from {opacity:0; transform:translateY(10px);}
								to {opacity:1; transform:translateY(0);}
							}
						</style>
					`;

					$(msgBox).insertAfter(form);
				}
				else{
					
					$("#cont_error_id").html(response.message);
					form.find("button[type=submit]").prop("disabled", false).text("Send Message");
					return;
				}
			},
			error: function () {
				$("#cont_error_id").html("Something went wrong! Please try again.");
				form.find("button[type=submit]").prop("disabled", false).text("Send Message");
			}
		});
	});
	
	////////////////////////////
	
	
	////////////////// ERP From   R.P.  /////////
	
	$(".ERPContactForm").on("submit", function (e) {
		e.preventDefault();

		var form = $(this);
		var formData = form.serialize();

		// Clear previous error
		$("#cont_error_id").html("");

		// Validation
		var name = form.find("[name=your_name]").val().trim();		
		var mobile = form.find("[name=mobile]").val().trim();
		var school_name = form.find("[name=school_name]").val().trim();
		if (name === "" || mobile === "" || school_name === "") {
			$("#cont_error_id").html("Please fill all required fields.");
			return false;
		}	
		
		
		var mobileReg = /^[0-9]+$/;
		if (!mobileReg.test(mobile)) {
			$(".phone_err_cls").html("Please enter digits only in mobile number.");
			return false;
		}		
		
		var countryCode = $("#country_code").val();
		if (mobile !== "" && countryCode !== '') {
			var err_phone = validateMobile(mobile, countryCode);

			if (err_phone !== '') {
				$("#mobile").focus();
				$(".phone_err_cls").html(err_phone);
				return false;
			} else {
				$(".phone_err_cls").html("");
			}
		}
		

		form.find("button[type=submit]").prop("disabled", true).text("Sending...");
		
		var root_url = $("#root_url").val();

		$.ajax({
			url: root_url+"ajax_erp_process.php",
			type: "POST",
			data: formData,
			dataType: "json",  
			success: function (response) {
				
				$(".phone_err_cls").html("");		

				if (response.status === "error") {
					// Show PHP error message
					$("#erp_error_id").html(response.message);
					form.find("button[type=submit]").prop("disabled", false).text("Send Message");
					return;
				}
				else
				if (response.status === "success") {
					form.hide();

					var msgBox = `
						<div style="display:flex;align-items:center;gap:15px;padding:20px 25px;background:#f6f8fa;border:1px solid #d0d7de;border-radius:10px;margin-top:20px;animation:fadeSlide .3s ease-out;">
							<div style="width:45px;height:45px;background:#1f883d;color:#fff;font-size:25px;border-radius:50%;display:flex;align-items:center;justify-content:center;">âœ”</div>
							<div>
								<h4 style="margin:0;font-size:20px;color:#1f2328;font-weight:600;">Thank You!</h4>
								<p style="margin:3px 0 0;color:#57606a;font-size:14px;">${response.message}</p>
							</div>
						</div>
						<style>
							@keyframes fadeSlide {
								from {opacity:0; transform:translateY(10px);}
								to {opacity:1; transform:translateY(0);}
							}
						</style>
					`;

					$(msgBox).insertAfter(form);
				}
				else{
					$("#erp_error_id").html(response.message);
					form.find("button[type=submit]").prop("disabled", false).text("Send Message");
					return;
				}
			},
			error: function () {
				$("#erp_error_id").html("Something went wrong! Please try again.");
				form.find("button[type=submit]").prop("disabled", false).text("Send Message");
			}
		});
	});
	
	////////////////////////////
	
	////////////////// ERP From   R.P.  /////////
	
	$(".PortalVideoForm").on("submit", function (e) {
		e.preventDefault();

		var form = $(this);
		var formData = form.serialize();

		// Clear previous error
		$("#video_error_id").html("");

		// Validation
		var name = form.find("[name=name]").val().trim();		
		var mobile = form.find("[name=mobile]").val().trim();
		var email = form.find("[name=email]").val().trim();
		if (mobile == "") {
			$(".phone_err_cls").html("Enter Valid Mobile No.");
			return false;
		}
		if (name === "" || mobile === "" || email === "") {
			$("#video_error_id").html("Please fill all required fields.");
			return false;
		}		
		
		var mobileReg = /^[0-9]+$/;
		if (!mobileReg.test(mobile)) {
			$(".phone_err_cls").html("Please enter digits only in mobile number.");
			return false;
		}
		
		var countryCode = $("#country_code").val();
		if (mobile !== "" && countryCode !== '') {
			var err_phone = validateMobile(mobile, countryCode);

			if (err_phone !== '') {
				$("#mobile").focus();
				$(".phone_err_cls").html(err_phone);
				return false;
			} else {
				$(".phone_err_cls").html("");
			}
		}
		
		var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailReg.test(email)) {
			$(".email_err_cls").html("Please enter a valid email address.");
			return false;
		}		

		form.find("button[type=submit]").prop("disabled", true).text("Sending...");
		
		var root_url = $("#root_url").val();

		$.ajax({
			url: root_url+"ajax_video_process.php",
			type: "POST",
			data: formData,
			dataType: "json",  
			success: function (response) {
				
				$(".phone_err_cls").html("");
				$(".email_err_cls").html("");

				if (response.status === "error") {
					// Show PHP error message
					$("#video_error_id").html(response.message);
					form.find("button[type=submit]").prop("disabled", false).text("Send Message");
					return;
				}
				else
				if (response.status === "success") {
					form.hide();

					var msgBox = `
						<div style="display:flex;align-items:center;gap:15px;padding:20px 25px;background:#f6f8fa;border:1px solid #d0d7de;border-radius:10px;margin-top:20px;animation:fadeSlide .3s ease-out;">
							<div style="width:45px;height:45px;background:#1f883d;color:#fff;font-size:25px;border-radius:50%;display:flex;align-items:center;justify-content:center;">âœ”</div>
							<div>
								<h4 style="margin:0;font-size:20px;color:#1f2328;font-weight:600;">Thank You!</h4>
								<p style="margin:3px 0 0;color:#57606a;font-size:14px;">${response.message}</p>
							</div>
						</div>
						<style>
							@keyframes fadeSlide {
								from {opacity:0; transform:translateY(10px);}
								to {opacity:1; transform:translateY(0);}
							}
						</style>
					`;

					$(msgBox).insertAfter(form);
				}
				else{
					$("#video_error_id").html(response.message);
					form.find("button[type=submit]").prop("disabled", false).text("Send Message");
					return;
				}
			},
			error: function () {
				$("#video_error_id").html("Something went wrong! Please try again.");
				form.find("button[type=submit]").prop("disabled", false).text("Send Message");
			}
		});
	});
	
	////////////////////////////


});

// CRM Pages Form Footer
$(document).ready(function(){
			
		$(".phone_err_cls").html("");
		$(".eml_err_cls").html("");	
		$(".email_err_cls").html("");
	  	$('.wcff-fc').on('focus',function(){
            $(this).parents('.wcff-ifg').addClass('valid');
       	});
       	$('.wcff-fc').on('blur',function(){
            if($(this).val() != ''){
                $(this).parents('.wcff-ifg').addClass('valid');
            } else {
                $(this).parents('.wcff-ifg').removeClass('valid');
            }
       	});
        $("#phoneNumber").on('keydown', function (e) {           
            if ($.inArray(e.keyCode, [86, 46, 8, 9, 27, 13, 110, 190]) !== -1 ||                
                (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||              
                (e.keyCode >= 35 && e.keyCode <= 40)) {             
                return;
            }           
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        }).on('blur', function (e) {
            var val = $(this).val();
            if (val != '0') {
                val = val.replace(/[^0-9]+/g, "")
                $(this).val(val);
            }
        }).intlTelInput({
            geoIpLookup: function (callback) {
                $.get("https://ipinfo.io", function () { }, "jsonp").always(function (resp) {
                    var countryCode = (resp && resp.country) ? resp.country : "";
                    callback(countryCode);
                });
            },
            initialCountry: "in"
        });	        
		       	
	});
	
$("#country_code").on("change", function () {
    if ($(this).val() === "IN-91") {
        $("#mobile").attr("maxlength", "10");
    } else {
        $("#mobile").attr("maxlength", "6");
    }
});


function validateMobile(mobile,countryCode) {  

    var mobileReg = /^[0-9]+$/;
	var error_mesg="";
    // Digits only check
    if (!mobileReg.test(mobile)) {		
		error_mesg ="Please enter digits only in mobile number.";    
    }

    if (countryCode === 'IN-91') {
        // India validation
        if (mobile.length !== 10) {
			error_mesg ="Enter Valid Mobile Number!"; 
        }

        var indiaReg = /^[6-9][0-9]{9}$/;
        if (!indiaReg.test(mobile)) {
			error_mesg ="Invalid mobile number"; 
        }

    } else {
        // Other countries validation
        if (mobile.length < 4) {
			error_mesg ="Mobile number should be at least 4 digits."; 
        }
    }
    return error_mesg; 
}

function validateEmail(email) {
	
    if (email === '') {
        return 'Email ID is required';
    }

    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) {
        return 'Invalid email address';
    }   
}

/* ========== Form placeholder animation (from js/custom.js) ========== */
var $inputItem = $(".js-inputWrapper");
$inputItem.length && $inputItem.each(function() {
    var $this = $(this),
        $input = $this.find(".form_input"),
        placeholderTxt = $input.attr("placeholder"),
        $placeholder;
    $input.after('<span class="placeholder">' + placeholderTxt + "</span>");
    $input.attr("placeholder", "");
    $placeholder = $this.find(".placeholder");
    $input.val().length ? $this.addClass("active") : $this.removeClass("active");
    $input.on("focusout", function() {
        $input.val().length ? $this.addClass("active") : $this.removeClass("active");
    }).on("focus", function() {
        $this.addClass("active");
    });
});

/* ========== Carousel caption animation ========== */
(function($) {
    function doAnimations(elems) {
        var animEndEv = "webkitAnimationEnd animationend";
        elems.each(function() {
            var $this = $(this),
                $animationType = $this.data("animation");
            $this.addClass($animationType).one(animEndEv, function() {
                $this.removeClass($animationType);
            });
        });
    }
    var $myCarousel = $("#carouselFade"),
        $firstAnimatingElems = $myCarousel.find(".carousel-item:first").find("[data-animation ^= 'animated']");
    if ($firstAnimatingElems.length) doAnimations($firstAnimatingElems);
    $myCarousel.on("slide.bs.carousel", function(e) {
        doAnimations($(e.relatedTarget).find("[data-animation ^= 'animated']"));
    });
})(jQuery);

/* ========== Payment method tabs (Paytm / GPay / UPI) ========== */
$(document).ready(function() {
    $('#paytm').click(function(){
        $('#paymentByPaytm').show();
        $('#paymentByGpay').hide();
        $('#paymentByUPI').hide();
    });
    $('#gpay').click(function(){
        $('#paymentByPaytm').hide();
        $('#paymentByGpay').show();
        $('#paymentByUPI').hide();
    });
    $('#upi').click(function(){
        $('#paymentByPaytm').hide();
        $('#paymentByGpay').hide();
        $('#paymentByUPI').show();
    });
});


