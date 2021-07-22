$(function() {
  /***************************************** variables ******************************************/
  const service = [
    {
      type: "build",
      text: "Build a website for your project"
    },
    {
      type: "redesign",
      text: "Redesign and/or add functionality to your current website"
    },
    {
      type: "repair",
      text: "Repair your current website"
    }
  ];

  const website = [
    {
      type: "authority",
      text: "Authority website: this is the place potential customers can go to see what work your company has done and how to get in contact with someone about your services",
      build: {
        customized: 8000, 
        templated: 4000
      },
      redesign: {
        customized: 7000, 
        templated: 3000
      }
    },
    {
      type: "leadGeneration",
      text: "Lead-generation website: this site is focused on generating leads through its online presence",
      build: {
        customized: 8000, 
        templated: 4000
      },
      redesign: {
        customized: 7000, 
        templated: 3000
      }
    },
    {
      type: "sales",
      text: "Sales website: sites that sell products or services through e-commerce",
      build: {
        customized: 8000, 
        templated: 4000
      },
      redesign: {
        customized: 7000,
        templated: 3000
      }
    },
    {
      type: "utility",
      text: "Utility website: companies whose business and website are one and the same",
      build: {
        customized: 8000, 
        templated: 4000
      },
      redesign: {
        customized: 7000, 
        templated: 3000
      }
    }
  ];

  const technique = [
    {
      type: "customized",
      text: "100% customized from scratch website"
    },
    {
      type: "templated",
      text: "Website using templates like Shopify or WordPress"
    }
  ];
  
  const page = {
    type: [   
      "About page", "Blog page", "Contact page", "FAQ page", "Homepage", "Landing page", "Page not found page", "Press page", "Privacy policy page", "Products page",
      "Reviews page", "Search result page", "Services page", "Sitemap page", "Terms and conditions page", "Testimonials page"    
    ],
    customized: 1800,
    templated: 1000
  };

  const functionality = {
    type: [
      "Book appointments", "Contact form", "Database integration", "Display image gallery", "Search bar", "Subscription offer", "Take payments", "Take surveys", "Testimonials/reviews"
    ],
    customized: 7000,
    templated: 3000
  };

  const redesignEntireWebsite = {
    type: ["Entire website"]
  };

  const redesignPerComponent = {
    customized: 4000, 
    templated: 2000
  };

  const repairPerComponent = 1000;

  /***************************************** functions ******************************************/
  function createRadioInputForArray(appendDiv, array, name) {
    for (let index = 0; index < array.length; index++) {
      const container = $("<div class='custom-control custom-radio'></div>");
      $(appendDiv).append(container);

      const input = $("<input>").attr({
        type: "radio",
        id: array[index].type,
        value: array[index].type,
        name: name,
        class: "custom-control-input",
        required: true,
        "data-validation-required-message": "Please select an option."
      }); 
      $(container).append(input);

      const label = $("<label>").attr({
        class: "custom-control-label",
        style: "opacity: 1",
        for: array[index].type
      }).text(array[index].text);
      $(container).append(label);
    }
    return;
  }

  function createCheckboxInput(appendDiv, array, name, minchecked, validation) {
    for (let index = 0; index < array.type.length; index++) {
      const container = $("<div class='form-check form-check-inine'></div>");
      $(appendDiv).append(container);

      const combinedWords = array.type[index].split(" ").join('_');
      
      const input = $("<input>").attr({
        type: "checkbox",
        id: combinedWords,
        value: array.type[index],
        name: name + "[]",
        class: "form-check-input",
        minchecked: minchecked,
        "data-validation-minchecked-message": validation
      });
      $(container).append(input);

      const label = $("<label>").attr({
        class: "form-check-label",
        style: "opacity: 1",
        for: combinedWords,
        id: combinedWords
      }).text(array.type[index]);
      $(container).append(label);
    }
    return;
  }

  function createInputButton(appendDiv, prop) {
    const button = $("<input>").attr({
      id: "addFieldButtonFor" + (prop.charAt(0).toUpperCase() + prop.slice(1)),
      class: "btn btn-outline-secondary btn-lg ml-2",
      type: "button",
      value: "Add new " + prop
    });
    $(appendDiv).append(button);
    return;
  }

  function createInputField(appendDiv, prop, isRequired=false) {
    const input = $("<input>").attr({
      class: "form-control text-secondary",
      name: prop + "[]",
      id: "other" + (prop.charAt(0).toUpperCase() + prop.slice(1)) + "Input",
      type: "text",
      placeholder: "Add a " + prop,
      required: isRequired,
      value: ""
    });
    $(appendDiv).append(input);
    return;
  }

  function inputTextFieldChangeHandler(parent, child, button) {
    $(parent).on("change", child, function() {
      if (!$(this).val()) {
        $(button).prop("disabled", true);
        $(this).siblings("#deleteInputButton").remove();
      } else {
        if ( $(this).siblings("#deleteInputButton").length === 0) {
          createDeleteButtonForField(parent, $(this));
        }
        $(button).prop("disabled", false);
      }
      return;
    });
  }

  function createDeleteButtonForField(appendDiv, element) {
    const deleteInputButton = $("<span></span>").attr({
      id: "deleteInputButton",
      type: "button"
    }).html("&times;").css({
      "position": "absolute",
      "top": 0,
      "right": 0,
      "padding-right": "1rem",
      "cursor": "pointer"
    }).on("click", function() {
      element.parent().get(0).remove();
    });
    $(appendDiv).append(deleteInputButton);
    return;
  }

  function createCustomerInputField(appendDiv, string, element, type, isRequired) {
    const fieldContainer = $("<div class='control-group'></div>");
    $(appendDiv).append(fieldContainer);
    const form = $("<div class='form-group floating-label-form-group controls mb-0 pb-2'></div>");
    $(fieldContainer).append(form);
    const combineWords = string.split(" ").join("_");
    const label = $("<label></label>").attr("for", combineWords).text(string.split(" ").map(word => word[0].toUpperCase() + word.substr(1).toLowerCase()).join(" "));
    $(form).append(label);
    const field = $(element).attr({
      class: "form-control text-primary",
      name: combineWords,
      id: combineWords,
      type: type,
      required: isRequired,
      placeholder: string.split(" ").map(word => word[0].toUpperCase() + word.substr(1).toLowerCase()).join(" "),
      value: ""
    });
    if (type === "tel") {
      field.on({
        keydown: function(event) {
          backspacerDOWN(this, event);
        },
        keyup: function(event) {
          backspacerUP(this, event);
        }
      });
    }
    if (type === "email") {
      field.attr({
        "data-validation-email-message": "Not a valid email address.",
        "data-validation-required-message": "Please eneter your email address."
      });
    } else {
      field.attr(
        "data-validation-required-message", isRequired ? "Please enter your " + string + "." : null
      );
    }
    $(form).append(field);
    const warning = $("<p class='help-block text-danger'></p>");
    $(form).append(warning);
    if (!$("[type='email']")) {
      const warning2 = $("<p class='help-block text-danger'></p>");
      $(form).append(warning2);
    }
    return;
  }

  function createButton(container, string, bttnClass) {
    const button = $("<button></button>").attr({
      type: string,
      name: string,
      class: bttnClass,
      id: string
    }).text(string.charAt(0).toUpperCase() + string.slice(1));
    $(container).append(button);
    return;
  }

  function createRestOfForm(parentDiv) {
    createCustomerInputField(parentDiv, "message", "<textarea>", "text", false);
    createCustomerInputField(parentDiv, "full name", "<input>", "text", true);
    createCustomerInputField(parentDiv, "email address", "<input>", "email", true);
    createCustomerInputField(parentDiv, "phone number", "<input>", "tel", false);
    
    const success = $("<div id='success'></div>");
    $(parentDiv).append(success);
    
    // send and reset buttons container
    const buttonsContainer = $("<div class='form-group row px-3'></div>");
    $(parentDiv).append(buttonsContainer);
    createButton(buttonsContainer, "submit", "btn btn-primary btn-x1");
    createButton(buttonsContainer, "reset", "btn btn-outline-secondary btn-lg ml-2");
    return;
  }

  function checkFullName(event) {
    const fullName = event.split(" ");
    if ((fullName.length >= 2) && (!fullName.some(name => name === ""))) {
      if ($("input#full_name ~ p.help-block.text-danger > ul").children().length > 0) {
        $("input#full_name ~ p.help-block.text-danger > ul").remove(); 
      } 
      $("#submit").prop("disabled", false);
    } else {
      $("input#full_name ~ p.help-block.text-danger:last-child").html("<ul role=\"alert\"><li>" + $("input#full_name").attr("data-validation-required-message") + "</li></ul>");
      $("input#full_name ~ p.help-block.text-danger:last-child > ul").append("<li>Names cannot have empty spaces.</li>");
      $("#submit").prop("disabled", true);
    }
    return;
  }

  function formReset() {
    $("input#project_name").val("");
    $("#serviceTypeControlGroup").remove();
    $("#serviceType").remove();
    $("label[for='project_name']").css("display", "none");
    return;
  }

  function getTotalInputArrayCount(prop) {
    return getInputCheckedCount(prop) + getInputTextCount(prop);
  }

  function getInputCheckedCount(prop) {
    return $("input[name='" + prop + "[]']:checked").length;
  }

  function getInputTextCount(prop) {
    return $("input[type='text'][name='" + prop + "[]']").filter(function() {
      return this.value.length > 0;
    }).length;
  }

  /***************************************** beginning of dom render ******************************************/
  const divRow = $("<div class='row'></div>");
  $("#quote .container").append(divRow);
  const divCol = $("<div class='col-lg-12 col-xl-12 mx-auto'></div>");
  $(divRow).append(divCol);
  const quoteForm = $("<form></form>").attr({
    action: "js/quote.js", 
    name: "quoteForm",
    id: "quoteForm",
    novalidate: "novalidate",
    method: "post",
    enctype: "text/plain"
  });
  $(divCol).append(quoteForm);
  
  createCustomerInputField(quoteForm, "project name", "<input>", "text", true);
  $("input#project_name").on("change", function() {
    
    if ($("#serviceTypeControlGroup").length === 0) {
      const serviceTypeControlGroup = $("<div id='serviceTypeControlGroup' class='control-group border-bottom'></div>");
      $(quoteForm).append(serviceTypeControlGroup);
      const serviceTypeQuestion = $("<p>What type of service do you need?</p>");
      $(serviceTypeControlGroup).append(serviceTypeQuestion);
      const serviceWarning = $("<p class='help-block text-danger'></p>");
      $(serviceTypeControlGroup).append(serviceWarning);

      createRadioInputForArray(serviceTypeControlGroup, service, "serviceType");

      // placeholder div when service type selected
      const serviceTypeSelectionDiv = $("<div id='serviceType'></div>");
      $(quoteForm).append(serviceTypeSelectionDiv);

      $("input[name=serviceType]").on("change", function() {
        const serviceType = $(this).val();
        /***************************************** build form in conditional ******************************************/
        if (serviceType === "build") {
          $(serviceTypeSelectionDiv).empty();

          // website type section
          const websiteTypeGroup = $("<div class='control-group border-bottom'></div>");
          $(serviceTypeSelectionDiv).append(websiteTypeGroup);
          const websiteTypeQuestion = $("<p>What type of website is your project?</p>");
          $(websiteTypeGroup).append(websiteTypeQuestion);
          const websiteWarning = $("<p class='help-block text-danger'></p>");
          $(websiteTypeGroup).append(websiteWarning);
          createRadioInputForArray(websiteTypeGroup, website, "websiteType");
          
          // technique type section
          const techniqueTypeGroup = $("<div class='control-group border-bottom'></div>");
          $(serviceTypeSelectionDiv).append(techniqueTypeGroup);
          const techniqueTypeQuestion = $("<p>How do you want your website to be built?</p>");
          $(techniqueTypeGroup).append(techniqueTypeQuestion);
          const techniqueWarning = $("<p class='help-block text-danger'></p>");
          $(techniqueTypeGroup).append(techniqueWarning);
          createRadioInputForArray(techniqueTypeGroup, technique, "techniqueType");
          
          // page type section
          const pageContentGroup = $("<div class='control-group border-bottom'></div>");
          $(serviceTypeSelectionDiv).append(pageContentGroup);
          const pageContentQuestion = $("<p>What pages do you want to display in your website? Select all that apply:</p>");
          $(pageContentGroup).append(pageContentQuestion);
          const pageWarning = $("<p class='help-block text-danger'></p>");
          $(pageContentGroup).append(pageWarning);
          createCheckboxInput(pageContentGroup, page, "page", 1, "Choose at least one.");
          
          const pageInputFieldContainer = $("<div class='form-check' id='pageInputFieldContainer'></div>");
          $(pageContentGroup).append(pageInputFieldContainer);
          createInputButton(pageContentGroup, "page");
          $("#addFieldButtonForPage").on("click", function() {
            const clearableInputAddition = $("<div id='pageInputRow'></div>").css({"display": "block", "position": "relative"});
            $(pageInputFieldContainer).append(clearableInputAddition);
            createInputField(clearableInputAddition, "page");
            $("#addFieldButtonForPage").prop("disabled", true);
            inputTextFieldChangeHandler(clearableInputAddition, "input", "#addFieldButtonForPage");
          });
          
          //  functionality type section
          const functionalityContentGroup = $("<div class='control-group border-bottom'></div>");
          $(serviceTypeSelectionDiv).append(functionalityContentGroup);
          const functionsContentQuestion = $("<p>What functions do you want your website to perform? Select all that apply:</p>");
          $(functionalityContentGroup).append(functionsContentQuestion);
          const functionalityWarning = $("<p class='help-block text-danger'></p>");
          $(functionalityContentGroup).append(functionalityWarning);
          createCheckboxInput(functionalityContentGroup, functionality, "functionality", 1, "Choose at least one.");

          const functionalityInputFieldContainer = $("<div class='form-check' id='functionalityInputFieldContainer'></div>");
          $(functionalityContentGroup).append(functionalityInputFieldContainer);
          createInputButton(functionalityContentGroup, "functionality");
          $("#addFieldButtonForFunctionality").on("click", function() {
            const clearableInputAddition = $("<div id='functionalityInputRow'></div>").css({"display": "block", "position": "relative"});
            $(functionalityInputFieldContainer).append(clearableInputAddition);
            createInputField(clearableInputAddition, "functionality");
            $("#addFieldButtonForFunctionality").prop("disabled", true);
            inputTextFieldChangeHandler(clearableInputAddition, "input", "#addFieldButtonForFunctionality");
          });

          // Customer info inputs (Message, Full Name, Email Address, Phone Number)
          createRestOfForm(serviceTypeSelectionDiv);
          $("input#full_name").on("change", function() {
            checkFullName($(this).val());
          });

          $("button[type='reset']").on("click", formReset);
          
          $("#quoteForm input, #quoteForm textarea").not("[type=submit]").jqBootstrapValidation({
            preventSubmit: true,
            submitError: function($form, event, errors) {
              // errors
            },
            submitSuccess: function($form, event) {
              event.preventDefault();
              const formData = new FormData(event.target);
              
              // calculate estimate total
              let estimateTotal = 0;
              const websiteType = formData.get("websiteType");
              const websiteTypeText = website.find(obj => {
                return obj.type === websiteType;
              }).text;
              formData.append("websiteTypeText", websiteTypeText);
              const techniqueType = formData.get("techniqueType");
              const websiteTypeBasePrice = website.find(obj => {
                return obj.type === websiteType;
              }).build[techniqueType];
              formData.append("websiteTypeBasePrice", websiteTypeBasePrice);
              const pageCount = getTotalInputArrayCount("page");
              formData.append("pageCount", pageCount);
              const pricePerPage = page[techniqueType];
              formData.append("pricePerPage", pricePerPage);
              const pageSubtotal = pricePerPage * pageCount;
              formData.append("pageSubtotal", pageSubtotal);
              const functionalityCount = getTotalInputArrayCount("functionality");
              formData.append("functionalityCount", functionalityCount);
              const pricePerFunctionality = functionality[techniqueType];
              formData.append("pricePerFunctionality", pricePerFunctionality);
              const functionalitySubtotal = pricePerFunctionality * functionalityCount;
              formData.append("functionalitySubtotal", functionalitySubtotal);
              estimateTotal = websiteTypeBasePrice + pageSubtotal + functionalitySubtotal;
              formData.append("estimateTotal", estimateTotal);

              // Check for white space in name for Success/Fail message
              let firstName = formData.get("full_name");
              if (firstName.indexOf(' ') >= 0) {
                firstName = firstName.split(' ').slice(0, -1).join(' ');
              }

              $("#submit").prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
              $.ajax({
                url: "././mail/build.php",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                success: function() {
                  $('#success').html("<div class='alert alert-success'>");
                  $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                  $('#success > .alert-success').append($("<strong>").text("Thank you " + firstName + " for signing up for a quote! You'll receive an email shortly."));
                  $('#success > .alert-success').append('</div>');
                },
                error: function() {
                  $('#success').html("<div class='alert alert-danger'>");
                  $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                  $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
                  $('#success > .alert-danger').append('</div>');
                },
                complete: function() {
                  setTimeout(function() {
                    formReset();
                  }, 7000); 
                }
              });
            },
            filter: function() {
              return $(this).is(":visible");
            }
          });
          /*When clicking on Full hide fail/success boxes */
          $("#full_name").on("focus", function() {
            $("#success").html("");
          });

        /***************************************** redesign form in conditional ******************************************/  
        } else if (serviceType === "redesign") {
          $(serviceTypeSelectionDiv).empty();

          // type of website
          const redesignWebsiteTypeGroup = $("<div class='control-group border-bottom'></div>");
          $(serviceTypeSelectionDiv).append(redesignWebsiteTypeGroup);
          const redesignWebsiteTypeQuestion = $("<p>What type of website is your project?</p>");
          $(redesignWebsiteTypeGroup).append(redesignWebsiteTypeQuestion);
          const redesignWebsiteWarning = $("<p class='help-block text-danger'></p>");
          $(redesignWebsiteTypeGroup).append(redesignWebsiteWarning);
          createRadioInputForArray(redesignWebsiteTypeGroup, website, "websiteType");

          // technique type section
          const techniqueTypeGroup = $("<div class='control-group border-bottom'></div>");
          $(serviceTypeSelectionDiv).append(techniqueTypeGroup);
          const techniqueTypeQuestion = $("<p>How is your website built?</p>");
          $(techniqueTypeGroup).append(techniqueTypeQuestion);
          const techniqueWarning = $("<p class='help-block text-danger'></p>");
          $(techniqueTypeGroup).append(techniqueWarning);
          createRadioInputForArray(techniqueTypeGroup, technique, "techniqueType");

          // website sections for redesign
          const redesignGroup = $("<div class='control-group border-bottom'></div>");
          $(serviceTypeSelectionDiv).append(redesignGroup);
          const redesignQuestion = $("<p class='lead text-secondary mt-4'>What parts of your website do you want redesigned?</p>");
          $(redesignGroup).append(redesignQuestion);
          createCheckboxInput(redesignGroup, redesignEntireWebsite, "component", 0, null);
          $("input#Entire_website").on("change", function() {
            if ($(this).is(":checked")) {
              $("#otherComponentInput").prop("disabled", true);
            } else {
              $("#otherComponentInput").prop("disabled", false);
            }
          });

          const redesignOr = $("<p class='lead text-secondary mt-4'>Or, enter in the components you want redesigned</p>");
          $(redesignGroup).append(redesignOr);
          const sectionInputFieldContainer = $("<div id='sectionInputFieldContainer'></div>");
          $(redesignGroup).append(sectionInputFieldContainer);

          const clearableInput = $("<div id='redesignInputRow'></div>").css({"display": "block", "position": "relative"});
          $(sectionInputFieldContainer).append(clearableInput);
          createInputField(clearableInput, "component");
          $(clearableInput).on("change", "input", function() {
            if (!$(this).val()) {
              $("#Entire_website").prop("disabled", false);
              $("#addFieldButtonForComponent").prop("disabled", true);
              $(this).siblings("#deleteInputButton").remove();
            } else {
              if ( $(this).siblings("#deleteInputButton").length === 0 ) {
                createDeleteButtonForField(clearableInput, $(this));
              }
              $("#Entire_website").prop("disabled", true);
              $("#addFieldButtonForComponent").prop("disabled", false);
            }
          });
          
          createInputButton(redesignGroup, "component");
          $("#addFieldButtonForComponent").prop("disabled", true);

          $("#addFieldButtonForComponent").on("click", function() {
            const clearableInputAddition = $("<div id='sectionInputRow'></div>").css({"display": "block", "position": "relative"});
            $(sectionInputFieldContainer).append(clearableInputAddition);
            createInputField(clearableInputAddition, "component");
            $("#addFieldButtonForComponent").prop("disabled", true);
            inputTextFieldChangeHandler(clearableInputAddition, "input", "#addFieldButtonForComponent");
          });

          // add functionality section
          const functionalityContentGroup = $("<div class='control-group border-bottom'></div>");
          $(serviceTypeSelectionDiv).append(functionalityContentGroup);
          const functionsContentQuestion = $("<p>What new functionalities do you want to add to your website? Select all that apply:</p>");
          $(functionalityContentGroup).append(functionsContentQuestion);
          const functionalityWarning = $("<p class='help-block text-danger'></p>");
          $(functionalityContentGroup).append(functionalityWarning);
          createCheckboxInput(functionalityContentGroup, functionality, "functionality", 0, null);

          const functionalityInputFieldContainer = $("<div class='form-check' id='functionalityInputFieldContainer'></div>");
          $(functionalityContentGroup).append(functionalityInputFieldContainer);
          createInputButton(functionalityContentGroup, "functionality");
          $("#addFieldButtonForFunctionality").on("click", function() {
            const clearableInputAddition = $("<div id='functionalityInputRow'></div>").css({"display": "block", "position": "relative"});
            $(functionalityInputFieldContainer).append(clearableInputAddition);
            createInputField(clearableInputAddition, "functionality");
            $("#addFieldButtonForFunctionality").prop("disabled", true);
            inputTextFieldChangeHandler(clearableInputAddition, "input", "#addFieldButtonForFunctionality");
          });

          // Customer info inputs
          createRestOfForm(serviceTypeSelectionDiv);
          $("input#full_name").on("change", function() {
            checkFullName($(this).val());
          });
          
          $("button[type='reset']").on("click", formReset);

          $("#quoteForm input, #quoteForm textarea").not("[type=submit]").jqBootstrapValidation({
            preventSubmit: true,
            submitError: function($form, event, errors) {
              // error messages
            },
            submitSuccess: function($form, event) {
              event.preventDefault();
              const formData = new FormData(event.target);

              // calculate estimate total
              let estimateTotal = 0;
              const websiteType = formData.get("websiteType");
              const websiteTypeText = website.find(obj => {
                return obj.type === websiteType;
              }).text;
              formData.append("websiteTypeText", websiteTypeText);
              const techniqueType = formData.get("techniqueType");
              
              if (formData.get("component[]") === "Entire website") {
                const redesignSubtotal = website.find(obj => {
                  return obj.type === websiteType;
                }).redesign[techniqueType];
                formData.append("redesignSubtotal", redesignSubtotal);
                estimateTotal += redesignSubtotal;
              } else {
                const componentCount = getTotalInputArrayCount("component");
                formData.append("componentCount", componentCount);
                const pricePerComponent = redesignPerComponent[techniqueType];
                formData.append("pricePerComponent", pricePerComponent);
                const componentSubtotal = componentCount * pricePerComponent;
                formData.append("componentSubtotal", componentSubtotal);   
                estimateTotal += componentSubtotal;
              }
              
              if (formData.has("functionality[]")) {
                const functionalityCount = getTotalInputArrayCount("functionality");
                formData.append("functionalityCount", functionalityCount);
                const pricePerFunctionality = functionality[techniqueType];
                formData.append("pricePerFunctionality", pricePerFunctionality);
                const functionalitySubtotal = functionalityCount * pricePerFunctionality;
                formData.append("functionalitySubtotal", functionalitySubtotal);
                estimateTotal += functionalitySubtotal;
              }

              formData.append("estimateTotal", estimateTotal);

              for (var pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
              }

              // Check for white space in name for Success/Fail message
              let firstName = formData.get("full_name");
              if (firstName.indexOf(' ') >= 0) {
                firstName = firstName.split(' ').slice(0, -1).join(' ');
              }

              $("#submit").prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
              $.ajax({
                url: "././mail/redesign.php",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                success: function() {
                  $('#success').html("<div class='alert alert-success'>");
                  $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                  $('#success > .alert-success').append($("<strong>").text("Thank you " + firstName + " for signing up for a redesign quote! You'll receive an email shortly."));
                  $('#success > .alert-success').append('</div>');
                },
                error: function() {
                  $('#success').html("<div class='alert alert-danger'>");
                  $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                  $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
                  $('#success > .alert-danger').append('</div>');
                },
                complete: function() {
                  setTimeout(function() {
                    formReset();
                  }, 7000); 
                }
              });
            },
            filter: function() {
              return $(this).is(":visible");
            }
          });
          /*When clicking on Full hide fail/success boxes */
          $("#full_name").on("focus", function() {
            $("#success").html("");
          });

        /***************************************** repair form in conditional ******************************************/
        } else if (serviceType === "repair") {
          $(serviceTypeSelectionDiv).empty();

          const repairGroup = $("<div class='control-group border-bottom'></div>");
          $(serviceTypeSelectionDiv).append(repairGroup);
          const repairQuestion = $("<p>What problems occur on your website? Enter problem per line.</p>");
          $(repairGroup).append(repairQuestion);

          const repairFields = $("<div id='repairFields'></div>");
          $(repairGroup).append(repairFields);

          const repairInput = $("<div id='repairInputRow'></div>").css({"display": "block", "position": "relative"});
          $(repairFields).append(repairInput);
          createInputField(repairInput, "problem", true);
          inputTextFieldChangeHandler(repairInput, "input", "#addFieldButtonForProblem");
         
          createInputButton(repairGroup, "problem");
          $("#addFieldButtonForProblem").prop("disabled", true);
          $("#addFieldButtonForProblem").on("click", function() {
            const clearableInputAddition = $("<div id='repairInputRow'></div>").css({"display": "block", "position": "relative"});
            $(repairFields).append(clearableInputAddition);
            createInputField(clearableInputAddition, "problem");
            $("#addFieldButtonForProblem").prop("disabled", true);
            inputTextFieldChangeHandler(clearableInputAddition, "input", "#addFieldButtonForProblem");
          });
          
          // Customer info inputs
          createRestOfForm(serviceTypeSelectionDiv);
          $("input#full_name").on("change", function() {
            checkFullName($(this).val());
          });
          
          $("button[type='reset']").on("click", formReset);

          $("#quoteForm input, #quoteForm textarea").not("[type=submit]").jqBootstrapValidation({
            preventSubmit: true,
            submitError: function($form, event, errors) {
              // errors
            },
            submitSuccess: function($form, event) {
              event.preventDefault();
              const formData = new FormData(event.target);

              // calculate estimate total
              const problemCount = getTotalInputArrayCount("problem");
              formData.append("problemCount", problemCount);
              const pricePerProblem = repairPerComponent;
              formData.append("pricePerProblem", pricePerProblem);
              const estimateTotal = problemCount * pricePerProblem;
              formData.append("estimateTotal", estimateTotal);

              for (var pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
              }

              // Check for white space in name for Success/Fail message
              let firstName = formData.get("full_name");
              if (firstName.indexOf(' ') >= 0) {
                firstName = firstName.split(' ').slice(0, -1).join(' ');
              }

              $("#submit").prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
              $.ajax({
                url: "././mail/repair.php",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                success: function() {
                  $('#success').html("<div class='alert alert-success'>");
                  $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                  $('#success > .alert-success').append($("<strong>").text("Thank you " + firstName + " for signing up for a repair quote! You'll receive an email shortly."));
                  $('#success > .alert-success').append('</div>');
                },
                error: function() {
                  $('#success').html("<div class='alert alert-danger'>");
                  $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
                  $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
                  $('#success > .alert-danger').append('</div>');
                },
                complete: function() {
                  setTimeout(function() {
                    formReset();
                  }, 7000); 
                }
              });  
            },
            filter: function() {
              return $(this).is(":visible");
            }
          });
          /*When clicking on Full hide fail/success boxes */
          $("#full_name").on("focus", function() {
            $("#success").html("");
          });
        }
      });
    } 
  });  
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
      var phoneNumberInput = document.getElementById("phone_number");
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
