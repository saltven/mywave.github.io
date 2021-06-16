


(function($) {
    "use strict"; 

	$(window).on('load', function() {
		var preloaderFadeOutTime = 500;
		function hidePreloader() {
			var preloader = $('.spinner-wrapper');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 500);
		}
		hidePreloader();
	});


    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });

	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
	});

    $(".navbar-nav li a").on("click", function(event) {
    if (!$(this).parent().hasClass('dropdown'))
        $(".navbar-collapse").collapse('hide');
    });

    var imageSlider = new Swiper('.image-slider', {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
		},
        loop: true,
        spaceBetween: 30,
        slidesPerView: 5,
		breakpoints: {
            580: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 20
            },

        }
    });

	var textSlider = new Swiper('.text-slider', {
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		}
    });

    $('.popup-youtube, .popup-vimeo').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/', 
                    id: function(url) {        
                        var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                        if ( !m || !m[1] ) return null;
                        return m[1];
                    },
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/', 
                    id: function(url) {        
                        var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                        if ( !m || !m[5] ) return null;
                        return m[5];
                    },
                    src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                }
            }
        }
    });

	$('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: false, 
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});

    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
    });

    $("#signUpForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            sformError();
            ssubmitMSG(false, "Please fill all fields!");
        } else {
            event.preventDefault();
            ssubmitForm();
        }
    });

    function ssubmitForm() {
		var email = $("#semail").val();
		var name = $("#sname").val();
		var password = $("#spassword").val();
        var terms = $("#sterms").val();
        
        $.ajax({
            type: "POST",
            url: "php/signupform-process.php",
            data: "email=" + email + "&name=" + name + "&password=" + password + "&terms=" + terms, 
            success: function(text) {
                if (text == "success") {
                    sformSuccess();
                } else {
                    sformError();
                    ssubmitMSG(false, text);
                }
            }
        });
	}

    function sformSuccess() {
        $("#signUpForm")[0].reset();
        ssubmitMSG(true, "Sign Up Submitted!");
        $("input").removeClass('notEmpty'); 
    }

    function sformError() {
        $("#signUpForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function ssubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#smsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

    $("#logInForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            lformError();
            lsubmitMSG(false, "Please fill all fields!");
        } else {
            event.preventDefault();
            lsubmitForm();
        }
    });

    function lsubmitForm() {
		var email = $("#lemail").val();
		var password = $("#lpassword").val();
        
        $.ajax({
            type: "POST",
            url: "php/loginform-process.php",
            data: "email=" + email + "&password=" + password, 
            success: function(text) {
                if (text == "success") {
                    lformSuccess();
                } else {
                    lformError();
                    lsubmitMSG(false, text);
                }
            }
        });
	}

    function lformSuccess() {
        $("#logInForm")[0].reset();
        lsubmitMSG(true, "Log In Submitted!");
        $("input").removeClass('notEmpty');
    }

    function lformError() {
        $("#logInForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function lsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#lmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

    $("#newsletterForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            nformError();
            nsubmitMSG(false, "Please fill all fields!");
        } else {
            event.preventDefault();
            nsubmitForm();
        }
    });

    function nsubmitForm() {
		var email = $("#nemail").val();
        var terms = $("#nterms").val();
        $.ajax({
            type: "POST",
            url: "php/newsletterform-process.php",
            data: "email=" + email + "&terms=" + terms, 
            success: function(text) {
                if (text == "success") {
                    nformSuccess();
                } else {
                    nformError();
                    nsubmitMSG(false, text);
                }
            }
        });
	}

    function nformSuccess() {
        $("#newsletterForm")[0].reset();
        nsubmitMSG(true, "Subscribed!");
        $("input").removeClass('notEmpty'); 
    }

    function nformError() {
        $("#newsletterForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function nsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#nmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

    $("#privacyForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            pformError();
            psubmitMSG(false, "Please fill all fields!");
        } else {
            event.preventDefault();
            psubmitForm();
        }
    });

    function psubmitForm() {
		var name = $("#pname").val();
		var email = $("#pemail").val();
        var select = $("#pselect").val();
        var terms = $("#pterms").val();
        
        $.ajax({
            type: "POST",
            url: "php/privacyform-process.php",
            data: "name=" + name + "&email=" + email + "&select=" + select + "&terms=" + terms, 
            success: function(text) {
                if (text == "success") {
                    pformSuccess();
                } else {
                    pformError();
                    psubmitMSG(false, text);
                }
            }
        });
	}

    function pformSuccess() {
        $("#privacyForm")[0].reset();
        psubmitMSG(true, "Request Submitted!");
        $("input").removeClass('notEmpty'); 
    }

    function pformError() {
        $("#privacyForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function psubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#pmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
    
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });

	$(".button, a, button").mouseup(function() {
		$(this).blur();
    });
    
    // $("#contactForm").validator().on("submit", function(event) {
    // 	if (event.isDefaultPrevented()) {
    //         // handle the invalid form...
    //         // cformError();
    //         csubmitMSG(false, "Please fill all fields!");
    //     } else {
    //         // everything looks good!
    //         event.preventDefault();
    //         sendEmail();
    //     }
    // });

    // // contact form
    // function csubmitForm() {
    //     // initiate variables with form content
	// 	var name = $("#cname").val();
	// 	var email = $("#cemail").val();
    //     var message = $("#cmessage").val();
        
    //     $.ajax({
    //         type: "POST",
    //         url: "php/contactForm.php",
    //         data: "name=" + name + "&email=" + email + "&message=" + message, 
    //         success: function(text) {
    //             if (text == "success") {
    //                 cformSuccess();
    //             } else {
    //                 cformError();
    //                 csubmitMSG(false, text);
    //             }
    //         }
    //     });
	// }

    // function cformSuccess() {
    //     $("#contactForm")[0].reset();
    //     csubmitMSG(true, "Message Submitted!");
    //     $("input").removeClass('notEmpty'); // resets the field label after submission
    //     $("textarea").removeClass('notEmpty'); // resets the field label after submission
    // }

    // function cformError() {
    //     $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    //         $(this).removeClass();
    //     });
	// }

    // function csubmitMSG(valid, msg) {
    //     if (valid) {
    //         var msgClasses = "h3 text-center tada animated";
    //     } else {
    //         var msgClasses = "h3 text-center";
    //     }
    //     $("#cmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    // }
    // function sendEmail(){
    //     var name = $("#name");
    //     var email = $("#email");
    //     var body = $("#body");

    //     if(isNotEmpty(name) && isNotEmpty(email) && isNotEmpty(body)){
    //         $.ajax({
    //             url: 'contactForm.php',
    //             method: 'POST',
    //             dataType: 'json',
    //             data: {
    //                 name: name.val(),
    //                 email: email.val(),
    //                 body: body.val()
    //             }, success: function(response){
    //                 $('#contactForm')[0].reset();
    //                 $('.sent-notification').text("Message sent successfully!");
    //             }
    //         });
    //     }
    // }
    // function isNotEmpty(caller){
    //     if(caller.val()==""){
    //         caller.css('border','1px solid red');
    //         return false;
    //     }
    //     else {
    //         caller.css('border', '');
    //         return true;
    //     }
    // }

    // //formspree

    window.addEventListener("DOMContentLoaded", function() {

        var form = document.getElementById("forms");

        var status = document.getElementById("status");
    
        function success() {
            form.reset();
            status.classList.add('success');
            status.innerHTML = "Message sent! You will be contacted shortly.";
        }
    
        function error() {
            status.classList.add('error');
            status.innerHTML = "Oops! There was a problem.";
        }
    
    
        form.addEventListener("submit", function(ev) {
            ev.preventDefault();
            var data = new FormData(form);
            ajax(form.method, form.action, data, success, error);
        });
    });
    
    
        function ajax(method, url, data, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== XMLHttpRequest.DONE) return;
            if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
            } else {
            error(xhr.status, xhr.response, xhr.responseType);
            }
        };
        xhr.send(data);
        }
    



})(jQuery);