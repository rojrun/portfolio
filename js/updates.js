$(function() {
  console.log("updates.js");
  // Checks for first and last names on input
  $("input#updates_name").on("change", function() {
    $("#updatesButton").prop("disabled", true); 
    console.log("input#updates_name: ", $("input#updates_name").val());
    var updates_fullName = $("input#updates_name").val().split(" ");
    console.log("updates_fullName: ", updates_fullName);
    if ((updates_fullName.length >= 2) && (!updates_fullName.some(name => name === ""))) {
      if ($("input#updates_name ~ p.help-block.text-danger:last-child > ul").children().length > 0) {
        $("input#updates_name ~ p.help-block.text-danger:last-child > ul").remove(); 
      } 
      $("#updatesButton").prop("disabled", false);
    } else {
      $("input#updates_name ~ p.help-block.text-danger:last-child").html("<ul role=\"alert\"><li>" + $("input#updates_name").attr("data-validation-required-message") + "</li></ul>");
      $("input#updates_name ~ p.help-block.text-danger:last-child > ul").append("<li>Names cannot have empty spaces.</li>");
      $("#updatesButton").prop("disabled", true);
    }
  });

  // Click event for Select ALL checkbox
  $("#select_all").click(function() {
    console.log("all clicked", this);
    if (this.checked) {
      console.log("checked");
      $(".checkboxall").each(function() {
        $(".checkboxall").prop("checked", true);
      });    
    } else {
      $(".checkboxall").each(function() {
        $(".checkboxall").prop("checked", false);
      }); 
    }
  });
  $(".checkboxall").on("change", function() {
    $("#select_all").prop("checked", false);
  });
  
  $("#updatesForm input").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behavior
      var formData = new FormData(event.target);

       // Push selected interests to array
      var selectedInterestArray = [];
      console.log("selectedInterestArray: ", selectedInterestArray);
      $(".checkboxall").each(function() {
        console.log("checked items: ", $(".checkboxall:checked"));
        selectedInterestArray.push($(".checkboxall:checked"));
      });
      console.log("selectedInterestArray: ", selectedInterestArray);
      
      // Check for white space in name for Success/Fail message
      var firstName = formData.get("name");
      if (firstName.indexOf(' ') >= 0) {
        firstName = firstName.split(' ').slice(0, -1).join(' ');
      }

      $("#updatesButton").prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
      $.ajax({
        url: "././mail/updates.php",
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
        },
        error: function() {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
          $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
          $('#success > .alert-danger').append('</div>');
        },
        complete: function() {
          setTimeout(function() {
            $("#updatesButton").prop("disabled", false); // Re-enable submit button when AJAX call is complete
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    }
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
