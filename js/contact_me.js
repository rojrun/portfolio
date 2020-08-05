$(function() {

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      var formData = new FormData($("form")[0]);
    //   for (var value in formData.values()) {
    //     console.log(value); 
    //  }
      // get values from FORM
      formData.append("name", $("input#name").val());
      formData.append("email", $("input#email").val());
      formData.append("phone", $("input#phone").val());
      // formData.append("uploaded_file", "file", $("input#uploaded_file").val().slice(12));
      formData.append("uploaded_file", $("input#uploaded_file")[0].files[0]);
      formData.append("message", $("textarea#message").val());
    //   for (var value in formData.values()) {
    //     console.log(value); 
    //  }
    // new Response(formData).text().then(console.log);
      // var name = $("input#name").val();
      // var email = $("input#email").val();
      // var phone = $("input#phone").val();
      // var message = $("textarea#message").val();
      // var firstName = formData.name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      // if (firstName.indexOf(' ') >= 0) {
      //   firstName = formData.name.split(' ').slice(0, -1).join(' ');
      // }
      
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      $.ajax({
        url: "././mail/contact_me.php",
        type: "POST",
        // data: {
        //   name: name,
        //   phone: phone,
        //   email: email,
        //   message: message
        // },
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function(response) {
          console.log("success:", response);
          // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
          $('#success > .alert-success').append("<strong>Your message has been sent. </strong>");
          $('#success > .alert-success').append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        },
        error: function(response) {
          console.error("error:", response);
          // Fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
          $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
          $('#success > .alert-danger').append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        },
        complete: function() {
          setTimeout(function() {
            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});

/* This script is based on the javascript code of Roman Feldblum (web.developer@programmer.net)
  Original script : http://javascript.internet.com/forms/format-phone-number.html
  Original script is revised by Eralper Yilmaz (http://www.eralper.com)
  Revised script : http://www.kodyaz.com */
var zChar = new Array(' ', '(', ')', '-', '.');
    var maxphonelength = 13;
    var phonevalue1;
    var phonevalue2;
    var cursorposition;

    function ParseForNumber1(object) {
      phonevalue1 = ParseChar(object.value, zChar);
    }

    function ParseForNumber2(object) {
      phonevalue2 = ParseChar(object.value, zChar);
    }

    function backspacerUP(object, e) {
      if (e) {
        e = e;
      } else {
        e = window.event;
      }
      if (e.which) {
        var keycode = e.which;
      } else {
        var keycode = e.keyCode;
      }
      ParseForNumber1(object);
      if (keycode >= 48) {
        ValidatePhone(object);
      }
    }

    function backspacerDOWN(object, e) {
      if (e) {
        e = e;
      } else {
        e = window.event;
      }
      if (e.which) {
        var keycode = e.which;
      } else {
        var keycode = e.keyCode;
      }
      ParseForNumber2(object);
    }

    function GetCursorPosition() {
      var t1 = phonevalue1;
      var t2 = phonevalue2;
      var bool = false;
      for (i = 0; i < t1.length; i++) {
        if (t1.substring(i, 1) != t2.substring(i, 1)) {
          if (!bool) {
            cursorposition = i;
            bool = true;
          }
        }
      }
    }

    function ValidatePhone(object) {
      var p = phonevalue1;
      p = p.replace(/[^\d]*/gi, "");
      if (p.length < 3) {
        object.value = p;
      } else if (p.length == 3) {
        pp = p;
        d4 = p.indexOf('(');
        d5 = p.indexOf(')');
        if (d4 == -1) {
            pp = "(" + pp;
        }
        if (d5 == -1) {
            pp = pp + ")";
        }
        object.value = pp;
      } else if (p.length > 3 && p.length < 7) {
        p = "(" + p;
        l30 = p.length;
        p30 = p.substring(0, 4);
        p30 = p30 + ")";
        p31 = p.substring(4, l30);
        pp = p30 + p31;
        object.value = pp;
      } else if (p.length >= 7) {
        p = "(" + p;
        l30 = p.length;
        p30 = p.substring(0, 4);
        p30 = p30 + ")"
        p31 = p.substring(4, l30);
        pp = p30 + p31;
        l40 = pp.length;
        p40 = pp.substring(0, 8);
        p40 = p40 + "-"
        p41 = pp.substring(8, l40);
        ppp = p40 + p41;
        object.value = ppp.substring(0, maxphonelength);
      }
      GetCursorPosition();
      if (cursorposition >= 0) {
        if (cursorposition == 0) {
          cursorposition = 2;
        } else if (cursorposition <= 2) {
          cursorposition = cursorposition + 1;
        } else if (cursorposition <= 5) {
          cursorposition = cursorposition + 2;
        } else if (cursorposition == 6) {
          cursorposition = cursorposition + 2;
        } else if (cursorposition == 7) {
          cursorposition = cursorposition + 4;
          e1 = object.value.indexOf(')');
          e2 = object.value.indexOf('-');
          if (e1 > -1 && e2 > -1) {
            if (e2 - e1 == 4) {
              cursorposition = cursorposition - 1;
            }
          }
        } else if (cursorposition < 11) {
          cursorposition = cursorposition + 3;
        } else if (cursorposition == 11) {
          cursorposition = cursorposition + 1;
        } else if (cursorposition >= 12) {
          cursorposition = cursorposition;
        }   
        var phoneNumberInput = document.getElementById("phone");
        if (cursorposition === 12 && phoneNumberInput.value.length === 13) {
          phoneNumberInput.blur();
          phoneNumberInput.setSelectionRange(0, 13);
          phone = phoneNumberInput.value;
        }
      }
    }

    function ParseChar(sStr, sChar) {
      if (sChar.length == null) {
        zChar = new Array(sChar);
      } else zChar = sChar;
      for (i = 0; i < zChar.length; i++) {
        sNewStr = "";
        var iStart = 0;
        var iEnd = sStr.indexOf(sChar[i]);
        while (iEnd != -1) {
            sNewStr += sStr.substring(iStart, iEnd);
            iStart = iEnd + 1;
            iEnd = sStr.indexOf(sChar[i], iStart);
        }
        sNewStr += sStr.substring(sStr.lastIndexOf(sChar[i]) + 1, sStr.length);
        sStr = sNewStr;
      }
      return sNewStr;
    }
