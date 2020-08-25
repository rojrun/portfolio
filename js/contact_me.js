$(function() {
  var fileArray = [];
  var totalFilesArray = [];
  var uploadFileLimit = 100000;
  var fileSizeTotal = 0;
  
  // Displays list of files before #sendMessageButton is clicked
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
    fileArray = $.makeArray(fileList);  /* turn list to array */
    console.log("group of files in array: ", fileArray);

    $.each(fileArray, function(index, value) {  /* Loops through fileArray and appends li element to #file_list */       
      try {
        console.log("file: ", value);
        console.log('index: ', index);
        var allowedExtension = ["jpeg", "jpg", "gif", "pdf", "png", "doc", "docx", "txt", "xls", "psd"];
        var fileext = $.inArray(value.name.split(".").pop().toLowerCase(), allowedExtension);
        console.log("fileext: ", fileext);
        if (fileext === -1) {   /* Checks if files are allowed */
          
          console.log("file not allowed. fileArray: ", fileArray);
          console.log("file not allowed: ", value.name);
          
          fileArray.splice(fileArray.indexOf(value.name), 1);
          console.log("file not allowed. fileArray after splice file: ", fileArray);
          
          $(":file ~ p.help-block.text-danger:last-child").html("<ul role=\"alert\"><li>Only " + allowedExtension.join(', ') + " formats are allowed.</li></ul>");   /* Copied structure from jqBootstrapValidation */
          setTimeout(function() {
            $(":file ~ p.help-block.text-danger:last-child > ul").remove();    
          }, 4000);  
        } else {
          var dupli = $.inArray(value.name, totalFilesArray);
          console.log("dupli: ", dupli);
          if (dupli === -1) {
          fileSizeTotal += value.size;
            var $this = $("<li>");  
            $("#file_list").append(   /* Creates li with delete button onto DOM */
              $this.addClass("text-primary")
                .html(value.name + "&nbsp;&nbsp;&nbsp;" + "<span style=\"color:black; font-weight:bold;\"> | </span>" + "&nbsp;&nbsp;&nbsp;" + (value.size.toLocaleString("en")) + " bytes")
                .append(
                  $("<button type='button' aria-hidden='Close'>")
                    .addClass("close")
                    .html("&times;")
                    // .attr("data-filename", value.name)
                    .css({"color": "#fff", "text-shadow": "0px 5px 0 #000"})
                    .click(function() {  /*deletes name from DOM and in totalFilesArray */
                      console.log("file value: ", value.name);
                      console.log("file size: ", value.size);
                      // console.log("file dataset: ", this.dataset.filename);
                      // if (value.name === this.dataset.filename) {
                        console.log("totalFilesArray before splice: ", totalFilesArray);
                        
                        // totalFilesArray.splice(index, 1);
                        fileSizeTotal -= value.size;
                        totalFilesArray.splice(totalFilesArray.indexOf(value.name), 1);
                        $this.remove();
                        console.log("totalFilesArray after splice: ", totalFilesArray);
                        console.log("fileSizeTotal: ", fileSizeTotal);
        
                        // if (totalFilesArray.length <= 1) {
                        //   $(".total").empty();
                        // } else {
                          $(".total").html("<span style=\"color:black; font-weight:bold;\">Total: </span>" + "&nbsp;&nbsp;&nbsp;" + totalFilesArray.length + " files " + "&nbsp;&nbsp;&nbsp;" + "<span style=\"color:black; font-weight:bold;\"> | </span>" + "&nbsp;&nbsp;&nbsp;" + (fileSizeTotal.toLocaleString("en")) + " out of " + (uploadFileLimit.toLocaleString("en")) + " bytes");
                        // }
                        if (fileSizeTotal < uploadFileLimit) {
                          $(":file ~ p.help-block.text-danger:last-child > ul").remove();
                          $("#sendMessageButton").prop("disabled", false); 
                        }
                      // }
                    })
                )
            )   
            totalFilesArray.push(value);   
            console.log("totalFilesArray: ", totalFilesArray);
          } else {
            console.log(value.name + " is a duplicate");
          } 
          
        }

      } catch(e) {
        console.error("file value error: ", e);
        console.log("fileArray: ", fileArray);
        fileArray.splice(fileArray.indexOf(e), 1);
        console.log("file not allowed. fileArray: ", fileArray);
        
        $(":file ~ p.help-block.text-danger:last-child").html("<ul role=\"alert\"><li>There is something wrong with that file. Please select again.");
        setTimeout(function() {
          $(":file ~ p.help-block.text-danger:last-child > ul").remove(); 
        }, 4000);  
      }  
    });
    console.log("totalFilesArray length: ", totalFilesArray.length);

    
    // if (totalFilesArray.length > 1) {
      $(".total").html("<span style=\"color:black; font-weight:bold;\">Total: </span>" + "&nbsp;&nbsp;&nbsp;" + totalFilesArray.length + " files " + "&nbsp;&nbsp;&nbsp;" + "<span style=\"color:black; font-weight:bold;\"> | </span>" + "&nbsp;&nbsp;&nbsp;" + (fileSizeTotal.toLocaleString("en")) + " out of " + (uploadFileLimit.toLocaleString("en")) + " bytes");
    // }
    console.log("totalFilesArray: ", totalFilesArray);
    if (fileSizeTotal > uploadFileLimit) {
      $(":file ~ p.help-block.text-danger:last-child").html("<ul role=\"alert\"><li>You have exceeded the upload limit.</li></ul>");
      $(":file ~ p.help-block.text-danger:last-child > ul").append("<li>Please edit your list.</li>");
      $("#sendMessageButton").prop("disabled", true);
    } else {
      $("#sendMessageButton").prop("disabled", false);
    }

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
      
      // $this = $("#sendMessageButton");
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
