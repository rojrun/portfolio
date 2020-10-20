(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').on('click', function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 80
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Loop through .portfolio-item to add pulse effect class
  $(document).ready(function() {
    // window.setInterval(function() {
    //   $('.portfolio-item').each(function() {
    //     setTimeout(function() {
    //       $('.portfolio-item').addClass('pulse');
    //     }, 1500);
    //     $('.portfolio-item').removeClass('pulse');
    //   });
    // }, 3000);
    $('.portfolio-item').each(function() {
      setTimeout(function() {
        $('.portfolio-item').addClass('pulse');
      }, 1500);
      $('.portfolio-item').removeClass('pulse');
    });
  });
  

  // Modal popup function
  $('.portfolio-item').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#username',
    modal: true,
    removalDelay: 500,
    callbacks: {
      beforeOpen: function() {
        
        console.log('beforeOpen: Start of popup initialization');
      },
      open: function() {
  
        console.log('open: Popup is opended');
      },
      beforeClose: function() {
        console.log('beforeClose: Popup close has been initiated');
      },
      close: function() {
        console.log('close: Popup removal initiated (after removalDelay timer finished)');
      },
      afterClose: function() {
        console.log('afterClose: Popup is completely closed');
      }
    },
    midClick: true
  });

  $(document).on('click', '.portfolio-modal-dismiss', function(e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  // Updates Modal Popup Button click event
  $(".updatesModalPopupButton").on("click", function() {
    $.magnificPopup.open({
      items: {
        src: "#updates-modal",
        type: "inline"
      },
      preloader: false,
      modal: true,
      removalDelay: 1600,
      mainClass: "mfp-fade"
    });
  });

  // Updates modal popup
  $.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  }
  $(window).on("scroll", function() {
    if ($("#portfolio .container .row > div:last-child").isInViewport() && $(".updatesModalPopupButton").is(":hidden")) {
      setTimeout(function() {
        $.magnificPopup.open({
          items: {
            src: "#updates-modal",
            type: "inline"
          },
          preloader: false,
          modal: true,
          mainClass: "mfp-fade"
        });
      }, 1000);      
    }   
  });

  // Updates modal icon appears when No Thanks link and close-button is clicked
  $(".showModalIcon").on("click", function() {
    $(".updatesModalPopupButton").fadeIn();
  });
  
  // Floating label headings for the contact form
  $(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
      $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
      $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
  });

})(jQuery); // End of use strict
