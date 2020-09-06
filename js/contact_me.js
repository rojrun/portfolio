$(function() {
  // Checks for first and last names on input
  $("input#name").on("change", function() {
    $("#sendMessageButton").prop("disabled", true); 
    var fullName = $("input#name").val().split(" ");
    if ((fullName.length >= 2) && (!fullName.some(name => name === ""))) {
      if ($("input#name ~ p.help-block.text-danger:last-child > ul").children().length > 0) {
        $("input#name ~ p.help-block.text-danger:last-child > ul").remove(); 
      } 
      $("#sendMessageButton").prop("disabled", false);
    } else {
      $("input#name ~ p.help-block.text-danger:last-child").html("<ul role=\"alert\"><li>" + $("input#name").attr("data-validation-required-message") + "</li></ul>");
      $("input#name ~ p.help-block.text-danger:last-child > ul").append("<li>Names cannot have empty spaces.</li>");
      $("#sendMessageButton").prop("disabled", true);
    }
  });

  // Displays list of files before #sendMessageButton is clicked
  var fileArray = [];
  var totalFilesArray = [];
  var uploadFileLimit = 1000000;
  var fileSizeTotal = 0;
  var allowedExtension = ["jpeg", "jpg", "gif", "pdf", "png", "doc", "docx", "txt", "xls", "psd"];
  $("#get_file").click(function() {
    $("#uploaded_file").click();
  }); 
  $("input[type=file]").change(function(e) {  
    $("#sendMessageButton").prop("disabled", true);  /* Disables submit button to ensure size limit */
    if ($(":file ~ p.help-block.text-danger:last-child").children().length > 0) {
      $(":file ~ p.help-block.text-danger:last-child").empty();
    }  
    if ($(":file ~ p.help-block.text-danger:last-child > ul").children().length > 0) {
      $(":file ~ p.help-block.text-danger:last-child > ul").remove(); 
    } 
    var fileList = $(e.target)[0].files;
    fileArray = $.makeArray(fileList);  /* turn fileList to array */
    $.each(fileArray, function(index, value) {  /* Loops through fileArray and appends li element to #file_list */       
      try {
        if ($.inArray(value.name.split(".").pop().toLowerCase(), allowedExtension) === -1) {   /* Checks if files are allowed */
          fileArray.splice(fileArray.indexOf(value.name), 1);
          $(":file ~ p.help-block.text-danger:last-child").html("<ul role=\"alert\"><li>Only " + allowedExtension.join(', ') + " formats are allowed.</li></ul>");   /* Copied structure from jqBootstrapValidation */
          $(":file ~ p.help-block.text-danger:last-child > ul").append("<li>Please select again.</li>");
          clearUlElement();
        } else {
          if (!totalFilesArray.some(file => file.name === value.name)) {  /* File doesn't exists */
            fileSizeTotal += value.size;
            var $this = $("<li>");  
            $("#file_list").append(  /* Creates li with delete button onto DOM */
              $this.addClass("text-primary").append(        
                $("<p>").html(value.name + "&nbsp;&nbsp;" + "<span style=\"color:black; font-weight:bold;\"> | </span>" + "&nbsp;&nbsp;")
                ,
                $("<div>").append(
                  $("<p>").html((value.size.toLocaleString("en")) + " bytes")
                  ,
                  $("<button type='button' aria-hidden='true' aria-label='Close'>")
                    .addClass("close")
                    .html("&times;")              
                    .click(function() {  /* Deletes name from DOM and from totalFilesArray */
                      fileSizeTotal -= value.size;
                      totalFilesArray.splice(totalFilesArray.indexOf(value.name), 1);
                      $this.remove();
                      totalFilesArrayLengthConditional(totalFilesArray, fileSizeTotal);
                      if (fileSizeTotal < uploadFileLimit) {
                        $(":file ~ p.help-block.text-danger:last-child > ul").remove();
                        $("#sendMessageButton").prop("disabled", false); 
                      }
                    })
                )
              )                                      
            )   
            totalFilesArray.push(value);
          } else {   /* File already exists */
            pElementConditional("<li>" + value.name + " already exists.</li>");
            clearUlElement();
            fileArray.splice(fileArray.indexOf(value.name), 1);
          }
        }
      } catch(e) {
        fileArray.splice(fileArray.indexOf(e), 1);
        pElementConditional("<li>There is an error with that file.</li>");
        clearUlElement();
      } 
    });
    totalFilesArrayLengthConditional(totalFilesArray, fileSizeTotal);
    if (fileSizeTotal > uploadFileLimit) {
      $(":file ~ p.help-block.text-danger:last-child").html("<ul role=\"alert\"><li>You have exceeded the upload limit.</li></ul>");
      $(":file ~ p.help-block.text-danger:last-child > ul").append("<li>Please edit your list.</li>");
      $("#sendMessageButton").prop("disabled", true);
    } else {
      $("#sendMessageButton").prop("disabled", false);
    }

    function pElementConditional(str) {
      if ($(":file ~ p.help-block.text-danger:last-child").children().length === 0) {
        $(":file ~ p.help-block.text-danger:last-child").html("<ul role=\"alert\"><li>Please select again.");
        $(":file ~ p.help-block.text-danger:last-child > ul").append(str);
      } else {
        $(":file ~ p.help-block.text-danger:last-child > ul").append(str);
      }
      return;
    }

    function clearUlElement() {
      setTimeout(function() {
        $(":file ~ p.help-block.text-danger:last-child > ul").remove();
      }, 5000);
      return;
    }

    function totalFilesArrayLengthConditional(totalFilesArray, fileSizeTotal) {
      var filePlural = " file ";
      if (totalFilesArray.length != 1) {
        filePlural = " files ";
      }
      if ($(".uploading").children().length === 0) {
        $(".uploading").append(
          $("<p>").html("<span style=\"color:black; font-weight:bold;\">Uploading: </span>" + "&nbsp;&nbsp;&nbsp;" + totalFilesArray.length + filePlural + "&nbsp;&nbsp;&nbsp;" + "<span style=\"color:black; font-weight:bold;\"> | </span>" + "&nbsp;&nbsp;&nbsp;")
          ,  
          $("<p>").html(fileSizeTotal.toLocaleString("en") + " out of " + uploadFileLimit.toLocaleString("en") + " bytes")
        );     
      } else {
        $(".uploading p:first-child").html("<span style=\"color:black; font-weight:bold;\">Uploading: </span>" + "&nbsp;&nbsp;&nbsp;" + totalFilesArray.length + filePlural + "&nbsp;&nbsp;&nbsp;" + "<span style=\"color:black; font-weight:bold;\"> | </span>" + "&nbsp;&nbsp;&nbsp;");
        $(".uploading p:last-child").html(fileSizeTotal.toLocaleString("en") + " out of " + uploadFileLimit.toLocaleString("en") + " bytes");
      } 
      if (totalFilesArray.length === 0) {
        $(".uploading").empty();
      }
      return;
    } 

    // Clears out the file attachments when reset clicked
    $(":reset").click(function() {
      fileArray = [];
      totalFilesArray = [];
      fileSizeTotal = 0;
      $("#file_list, .total").empty();
      $(":file ~ p.help-block.text-danger:last-child > ul").remove();
    });
  });              

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      var formData = new FormData(event.target);    
      if (formData.get('uploaded_file[]').size === 0) {   
        formData.delete('uploaded_file[]');
      } else {
        formData.delete('uploaded_file[]');
        $.each(totalFilesArray, function(index, value) {   /*Loops through totalFilesArray and append to formData */
          formData.append('uploaded_file[]', value, value.name);   
        });
      }
      
      // Check for white space in name for Success/Fail message
      var firstName = formData.get("name");
      if (firstName.indexOf(' ') >= 0) {
        firstName = firstName.split(' ').slice(0, -1).join(' ');
      }
      
      $("#sendMessageButton").prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      $.ajax({
        url: "././mail/contact_me.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        success: function() {
          // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
          $('#success > .alert-success').append($("<strong>").text("Thank you " + firstName + "! Your message has been sent!"));
          $('#success > .alert-success').append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        },
        error: function() {
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
            $("#sendMessageButton").prop("disabled", false); // Re-enable submit button when AJAX call is complete
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

/* This script is for AUTO FORMATING PHONE NUMBER WHILE TYPING, based on the javascript code of Roman Feldblum (web.developer@programmer.net)
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
