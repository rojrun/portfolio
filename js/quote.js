$(function() {
  const service = {
    build: {
      text: "Build a website for your project",
      page: {
        type: [   
          "About us", "Blog", "Category", "Checkout", "Contact us", "FAQ", "Home", "Landing", "Login/create account", "Press", "Privacy policy", "Product/service details",
          "Product/service listings", "Returns", "Reviews", "Search and listing results", "Shipping", "Shopping cart", "Sitemap", "Terms and conditions", "Testimonials", "Thank you"    
        ],
        customized: 900,
        templated: 300,
        include: ["Home"]
      },
      functionality: {
        type: [
          "Blog/news", "Book appointments", "Contact form", "Database integration", "Drop ship", "Email newsletter", "Event calendar", "Image slider", "Location map",  
          "Search bar", "Search engine optimization", "Social sharing tool", "Subscription service", 
          "Take surveys", "Testimonials/reviews", "User interface/user experience design"
        ],
        customized: 2000,
        templated: 800,
        include: [
          "Database integration", "Search engine optimization", "User interface/user experience design"
        ]
      }
    },
    redesign: {
      text: "Redesign and/or add functionality to your current website",
      question: [
        "Why do you want a website redesign, or what are you trying to accomplish?",
        "What do you love and hate about your current website?",
      ],
      customized: 3000,
      templated: 1200
    },  
    repair: {
      text: "Repair your current website",
      perComponent: 400
    }
  };

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

  const ecommerce = {
    text: ["Yes, involves the selling of products or services"],
    include: [
      "Product/service listings", "Shopping cart", "Checkout", "Thank you"
    ]
  };
  
  /***************************************** functions ******************************************/
  function createRadioInputs(appendDiv, array, name) {
    for (let index = 0; index < array.length; index++) {
      const container = $("<div class='mx-4 py-3'></div>");
      appendDiv.append(container);
      if (index !== array.length-1) {
        container.addClass("border-bottom");
      }

      const label = $("<label class='lead mb-0 radio'></label>").attr({
        for: array[index].type
      });
      container.append(label);

      // first child of label
      const spanInput = $("<span class='radio__input'></span>");
      label.append(spanInput);

      const input = $("<input type='radio' required='required'>").attr({
        id: array[index].type,
        value: array[index].type,
        name: name,
        "data-validation-required-message": "Please select an option."
      }); 
      spanInput.append(input);

      const spanControl = $("<span class='radio__control'></span>");
      spanInput.append(spanControl);

      // second child of label
      const spanLabel = $("<span class='radio__label'></span>").text(array[index].text);
      label.append(spanLabel);
    }
    return;
  }

  function createForm(type, appendDiv) {
    const form = $("<form action='js/quote.js' method='post' enctype='text/plain' novalidate></form>").attr({
      name: type + "Form",
      id: type + "Form",
    });
    appendDiv.append(form);
    return;
  }

  function createCheckboxInput(appendDiv, array, name, minchecked, validation) {
    for (let index = 0; index < array.length; index++) {
      const container = $("<div class='mx-5 py-1'></div>");
      appendDiv.append(container);
      
      const combineWords = array[index].split(" ").join("_");

      const label = $("<label class='lead mb-0 radio'></label>").attr({
        for: combineWords
      });
      container.append(label);

      // first child of label
      const spanInput = $("<span class='radio__input'></span>");
      label.append(spanInput);

      const input = $("<input type='checkbox'>").attr({
        id: combineWords,
        value: array[index],
        name: name + "[]",
        minchecked: minchecked,
        "data-validation-minchecked-message": validation
      }); 
      spanInput.append(input);

      const spanControl = $("<span class='radio__control checkbox__border'></span>");
      spanInput.append(spanControl);

      // second child of label
      const spanLabel = $("<span class='radio__label'></span>").text(array[index]);
      label.append(spanLabel);
    }
    return;
  }

  function createInputButton(appendDiv, prop) {
    const container = $("<div class='row justify-content-center'></div>");
    appendDiv.append(container);
    const button = $("<input type='button' class='btn btn-outline-secondary' disabled>").attr({
      id: "addFieldButtonFor" + (prop.charAt(0).toUpperCase() + prop.slice(1)),
      value: "Add another " + prop,
    });
    container.append(button);
    return;
  }

  function createInputField(appendDiv, prop, placeholder, isRequired=false) {
    const input = $("<input type='text' class='form-control text-secondary'>").attr({
      name: prop + "[]",
      id: "other" + (prop.charAt(0).toUpperCase() + prop.slice(1)) + "Input",
      placeholder: placeholder,
      required: isRequired,
      "data-validation-required-message": isRequired ? "Please enter at least one " + prop + "." : null
    });
    appendDiv.append(input);
    return;
  }

  function inputTextFieldChangeHandler(parent, child, button) {
    parent.on("change", child, function() {
      if (!$(this).val()) {
        $(button).prop("disabled", true);
        $(this).siblings("#deleteInputButton").remove();
      } else {
        if ( $(this).siblings("#deleteInputButton").length === 0) {
          createDeleteButtonForField(parent, $(this));
        }
        $(button).prop("disabled", false);
      }
    });
    return;
  }

  function createDeleteButtonForField(appendDiv, element) {
    const deleteInputButton = $("<span type='button' id='deleteInputButton'></span>").html("&times;").on("click", function() {
      element.parents()[1].remove();
    });
    appendDiv.append(deleteInputButton);
    return;
  }

  function createCustomerInputField(appendDiv, string, element, type, isRequired) {
    const fieldContainer = $("<div class='control-group border-bottom'></div>");
    $(appendDiv).append(fieldContainer);
    const form = $("<div class='form-group floating-label-form-group controls mb-0 pb-2'></div>");
    fieldContainer.append(form);
    const combineWords = string.split(" ").join("_");
    const label = $("<label></label>").attr("for", combineWords).text(string.split(" ").map(word => word[0].toUpperCase() + word.substr(1).toLowerCase()).join(" "));
    form.append(label);
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
        "data-validation-required-message": "Please enter your email address."
      });
    } else {
      field.attr(
        "data-validation-required-message", isRequired ? "Please enter your " + string + "." : null
      );
    }
    form.append(field);
    const warning = $("<p class='help-block text-danger'></p>");
    form.append(warning);
    if (!$("[type='email']")) {
      const warning2 = $("<p class='help-block text-danger'></p>");
      form.append(warning2);
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
    createCustomerInputField(parentDiv, "full name", "<input>", "text", true);
    createCustomerInputField(parentDiv, "email address", "<input>", "email", true);
    createCustomerInputField(parentDiv, "phone number", "<input>", "tel", false);
    
    const success = $("<div id='success'></div>");
    $(parentDiv).append(success);
    $(parentDiv).append("<br>");
    // send and reset buttons container
    const buttonsContainer = $("<div class='form-group row px-3'></div>");
    $(parentDiv).append(buttonsContainer);
    createButton(buttonsContainer, "submit", "btn btn-primary btn-outline-secondary btn-lg");
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
    $("#serviceType").empty();
    $("input[name=serviceType]").prop("checked", false);
    $("#quote .control-group:first-child").removeClass("border-bottom");
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

  function ajaxCall(service, data) {
    // Check for white space in name for Success/Fail message
    let firstName = data.get("full_name");
    if (firstName.indexOf(" ") >= 0) {
      firstName = firstName.split(" ").slice(0, -1).join(" ");
    }

    $("#submit").prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
    
    $.ajax({
      url: "././mail/" + service + ".php",
      type: "POST",
      data: data,
      processData: false,
      contentType: false,
      cache: false,
      success: function() {
        $('#success').html("<div class='alert alert-success mt-3'>");
        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
        $('#success > .alert-success').append($("<strong>").text("Thank you " + firstName + " for signing up for a " + service + " quote! You'll receive an email shortly."));
        $('#success > .alert-success').append('</div>');
      },
      error: function() {
        $('#success').html("<div class='alert alert-danger mt-3'>");
        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
        $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
        $('#success > .alert-danger').append('</div>');
      },
      complete: function() {
        // setTimeout(formReset, 10000); 
      }
    });
    return;
  }

  /***************************************** beginning of dom render ******************************************/
  const divCol = $("<div class='col-12 col-sm-12 col-md-10 col-lg-8 col-xl-6 mx-auto text-primary'></div>");
  $("#quote .container").append(divCol);
  
  // service type section
  const serviceTypeControlGroup = $("<div class='control-group border-top py-5'></div>");
  divCol.append(serviceTypeControlGroup);
  const serviceTypeQuestion = $("<p class='lead text-secondary text-center'>What type of service do you need? Select one option:</p>");
  serviceTypeControlGroup.append(serviceTypeQuestion);
  let index = 0;
  for (const prop in service) {
    if (!service.hasOwnProperty(prop)) continue;
    
    const container = $("<div class='mx-4 py-3'></div>");
    serviceTypeControlGroup.append(container);
    if (index !== Object.keys(service).length-1) {
      container.addClass("border-bottom");
    }

    const label = $("<label class='lead mb-0 radio'></label>").attr({
      for: prop
    });
    container.append(label);

    // first child of label
    const spanInput = $("<span class='radio__input'></span>");
    label.append(spanInput);

    const input = $("<input type='radio' required='required'>").attr({
      id: prop,
      value: prop,
      name: "serviceType",
      "data-validation-required-message": "Please select an option."
    }); 
    spanInput.append(input);

    const spanControl = $("<span class='radio__control'></span>");
    spanInput.append(spanControl);

    // second child of label
    const spanLabel = $("<span class='radio__label'></span>").text(service[prop].text);
    label.append(spanLabel);

    index++;
  }

  // placeholder div when service type selected
  const serviceTypeSelectionDiv = $("<div id='serviceType'></div>");
  divCol.append(serviceTypeSelectionDiv);

  $("input[name=serviceType]").on("change", function() {
    const serviceType = $(this).val();
    
    /***************************************** build form in conditional ******************************************/
    if (serviceType === "build") {
      serviceTypeSelectionDiv.empty();
      serviceTypeControlGroup.addClass("border-bottom");
      createForm("build", serviceTypeSelectionDiv);

      // project name and details
      createCustomerInputField("#buildForm", "project name", "<input>", "text", true);
      createCustomerInputField("#buildForm", "project details", "<textarea>", "text", true);

      // technique type section
      const techniqueTypeGroup = $("<div class='control-group border-bottom py-5'></div>");
      $("#buildForm").append(techniqueTypeGroup);
      const techniqueTypeQuestion = $("<p class='lead text-secondary text-center'>How do you want your website to be built? Select one option:</p>");
      techniqueTypeGroup.append(techniqueTypeQuestion);
      const techniqueWarning = $("<p class='help-block text-danger'></p>");
      techniqueTypeGroup.append(techniqueWarning);
      createRadioInputs(techniqueTypeGroup, technique, "techniqueType");

      // check whether website is e-commerce
      const ecommerceGroup = $("<div class='control-group border-bottom py-5'></div>");
      $("#buildForm").append(ecommerceGroup);
      const ecommerceQuestion = $("<p class='lead text-secondary text-center'>Is your project an e-commerce website? (Optional)</p>");
      ecommerceGroup.append(ecommerceQuestion);
      createCheckboxInput(ecommerceGroup, ecommerce.text, "ecomm", null, null);
      $("input[name='ecomm[]']").on("change", function() {
        if ($("input[name='ecomm[]']").is(":checked")) {
          for (let i = 0; i < ecommerce.include.length; i++) {
            if (service.build.page.type.indexOf(ecommerce.include[i]) > -1) {
              $("input[type=checkbox][value='" + ecommerce.include[i] + "']").attr({
                "checked": true,
                "disabled": true
              });
            }
          }
        } else {
          for (let i = 0; i < ecommerce.include.length; i++) {
            if (service.build.page.type.indexOf(ecommerce.include[i]) > -1) {
              $("input[type=checkbox][value='" + ecommerce.include[i] + "']").attr({
                "checked": false,
                "disabled": false
              });
            }
          }
        }
      });

      // page type section
      const pageContentGroup = $("<div class='control-group border-bottom py-5'></div>");
      $("#buildForm").append(pageContentGroup);
      const pageContentQuestion = $("<p class='lead text-secondary text-center'>What pages do you want to display in your website? Select all that apply:</p>");
      pageContentGroup.append(pageContentQuestion);
      const pageWarning = $("<p class='help-block text-danger'></p>");
      pageContentGroup.append(pageWarning);
      createCheckboxInput(pageContentGroup, service.build.page.type, "page", 1, "Choose at least one.");
      for (let i = 0; i < service.build.page.include.length; i++) {
        if (service.build.page.type.indexOf(service.build.page.include[i]) > -1) {
          $("input[type=checkbox][value='" + service.build.page.include[i] + "']").attr({
            "checked": true,
            "disabled": true
          });
        }
      }
      
      //          creates input text field for other pages
      const pageInputFieldContainer = $("<div class='mt-3 mx-5'></div>");
      pageContentGroup.append(pageInputFieldContainer);
      const pageInputControlGroup = $("<div class='control-group mb-2'></div>");
      pageInputFieldContainer.append(pageInputControlGroup);
      const firstPageInputClearableAddition = $("<div class='form-group controls mb-0 border-top border-bottom'></div>");
      pageInputControlGroup.append(firstPageInputClearableAddition);
      createInputField(firstPageInputClearableAddition, "page", "Add a different page", false);
      inputTextFieldChangeHandler(firstPageInputClearableAddition, "input", "#addFieldButtonForPage");
      createInputButton(pageContentGroup, "page");

      $("#addFieldButtonForPage").on("click", function() {
        const addPageControlGroup = $("<div class='control-group mb-2'></div>");
        pageInputFieldContainer.append(addPageControlGroup);
        const clearableInputAddition = $("<div class='form-group controls mb-0 border-top border-bottom'></div>");
        addPageControlGroup.append(clearableInputAddition);
        createInputField(clearableInputAddition, "page", "Add a different page", false);
        $("#addFieldButtonForPage").prop("disabled", true);
        inputTextFieldChangeHandler(clearableInputAddition, "input", "#addFieldButtonForPage");
      });
          
      //  functionality type section
      const functionalityContentGroup = $("<div class='control-group border-bottom py-5'></div>");
      $("#buildForm").append(functionalityContentGroup);
      const functionsContentQuestion = $("<p class='lead text-secondary text-center'>What functions do you want your website to perform? Select all that apply:</p>");
      functionalityContentGroup.append(functionsContentQuestion);
      const functionalityWarning = $("<p class='help-block text-danger'></p>");
      functionalityContentGroup.append(functionalityWarning);
      createCheckboxInput(functionalityContentGroup, service.build.functionality.type, "functionality", 1, "Choose at least one.");
      for (let i = 0; i < service.build.functionality.include.length; i++) {
        if (service.build.functionality.type.indexOf(service.build.functionality.include[i]) > -1) {
          $("input[type=checkbox][value='" + service.build.functionality.include[i] + "']").attr({
            "checked": true,
            "disabled": true
          });
        }
      }

      //          creates input text field for other functionalities
      const functionalityInputFieldContainer = $("<div class='mt-3 mx-5'></div>");
      functionalityContentGroup.append(functionalityInputFieldContainer);
      const functionalityInputControlGroup = $("<div class='control-group mb-2'></div>");
      functionalityInputFieldContainer.append(functionalityInputControlGroup);
      const firstFunctionalityInputClearableAddition = $("<div class='form-group controls mb-0 border-top border-bottom'></div>");
      functionalityInputControlGroup.append(firstFunctionalityInputClearableAddition);
      createInputField(firstFunctionalityInputClearableAddition, "functionality", "Add a different fuctionality", false);
      inputTextFieldChangeHandler(firstFunctionalityInputClearableAddition, "input", "#addFieldButtonForFunctionality");
      createInputButton(functionalityContentGroup, "functionality");

      $("#addFieldButtonForFunctionality").on("click", function() {
        const addFunctionalityControlGroup = $("<div class='control-group mb-2'></div>");
        functionalityInputFieldContainer.append(addFunctionalityControlGroup);
        const clearableInputAddition = $("<div class='form-group controls mb-0 border-top border-bottom'></div>");
        addFunctionalityControlGroup.append(clearableInputAddition);
        createInputField(clearableInputAddition, "functionality", "Add a different fuctionality", false);
        $("#addFieldButtonForFunctionality").prop("disabled", true);
        inputTextFieldChangeHandler(clearableInputAddition, "input", "#addFieldButtonForFunctionality");
      });

      // Customer info inputs (Message, Full Name, Email Address, Phone Number)
      createRestOfForm("#buildForm");
      $("input#full_name").on("change", function() {
        checkFullName($(this).val());
      });

      $("button[type='reset']").on("click", formReset);

      $("#buildForm input, #buildForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
          // errors
        },
        submitSuccess: function($form, event) {
          event.preventDefault();
          
          if ($("input[type='text'][name='page[]']").val() === "") {
            $("input[type='text'][name='page[]']").prop("disabled", true);
          }

          if ($("input[type='text'][name='functionality[]']").val() === "") {
            $("input[type='text'][name='functionality[]']").prop("disabled", true);
          }

          $.each($("input[type='checkbox']:disabled"), function() {
            $(this).prop("disabled", false);
          });

          const formData = new FormData(event.target);
          
          // calculate estimate total
          let estimateTotal = 0;
          const techniqueType = formData.get("techniqueType");
          const pageCount = getTotalInputArrayCount("page");
          formData.append("pageCount", pageCount);
          const pricePerPage = service.build.page[techniqueType];
          formData.append("pricePerPage", pricePerPage);
          const pageSubtotal = pricePerPage * pageCount;
          formData.append("pageSubtotal", pageSubtotal);
          const functionalityCount = getTotalInputArrayCount("functionality");
          formData.append("functionalityCount", functionalityCount);
          const pricePerFunctionality = service.build.functionality[techniqueType];
          formData.append("pricePerFunctionality", pricePerFunctionality);
          const functionalitySubtotal = pricePerFunctionality * functionalityCount;
          formData.append("functionalitySubtotal", functionalitySubtotal);
          estimateTotal = pageSubtotal + functionalitySubtotal;
          formData.append("estimateTotal", estimateTotal); 
          
          ajaxCall("build", formData);
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
      serviceTypeSelectionDiv.empty();
      serviceTypeControlGroup.addClass("border-bottom");
      createForm("redesign", serviceTypeSelectionDiv);

      // project name and details
      createCustomerInputField("#redesignForm", "project name", "<input>", "text", true);
      createCustomerInputField("#redesignForm", "project details", "<textarea>", "text", true);

      // technique type section
      const techniqueTypeGroup = $("<div class='control-group border-bottom py-5'></div>");
      $("#redesignForm").append(techniqueTypeGroup);
      const techniqueTypeQuestion = $("<p class='lead text-secondary text-center'>How is your website built? Select one option:</p>");
      techniqueTypeGroup.append(techniqueTypeQuestion);
      const techniqueWarning = $("<p class='help-block text-danger'></p>");
      techniqueTypeGroup.append(techniqueWarning);
      createRadioInputs(techniqueTypeGroup, technique, "techniqueType");

      // why redesign
      const whyRedesignGroup = $("<div class='control-group border-bottom py-5'></div>");
      $("#redesignForm").append(whyRedesignGroup);
      const redesignQuestion = $("<p class='lead text-secondary text-center'>Why do you want a website redesign, or what are you trying to accomplish?</p>");
      whyRedesignGroup.append(redesignQuestion);
      const whyRedesignControlGroup = $("<div class='control-group mb-2'></div>");
      whyRedesignGroup.append(whyRedesignControlGroup);
      const redesignWarning = $("<p class='help-block text-danger'></p>");
      whyRedesignControlGroup.append(redesignWarning);
      const whyRedesignFormGroup = $("<div class='form-group controls mb-0 border-top border-bottom mx-5'></div>");
      whyRedesignControlGroup.append(whyRedesignFormGroup);
      const inputWhy = $("<textarea type='text' class='form-control text-secondary' name='whyRedesign' required='required'>").attr("data-validation-required-message", "Please enter why you need a redesign.");
      whyRedesignFormGroup.append(inputWhy);
      
      // love and hate current site
      const currentRedesignGroup = $("<div class='control-group border-bottom py-5'></div>");
      $("#redesignForm").append(currentRedesignGroup);
      const currentRedesignQuestion = $("<p class='lead text-secondary text-center'>What do you love and hate about your current website?</p>");
      currentRedesignGroup.append(currentRedesignQuestion);
      const currentRedesignControlGroup = $("<div class='control-group mb-2'></div>");
      currentRedesignGroup.append(currentRedesignControlGroup);
      const currentRedesignWarning = $("<p class='help-block text-danger'></p>");
      currentRedesignControlGroup.append(currentRedesignWarning);
      const currentRedesignFormGroup = $("<div class='form-group controls mb-0 border-top border-bottom mx-5'></div>");
      currentRedesignControlGroup.append(currentRedesignFormGroup);
      const inputCurrent = $("<textarea type='text' class='form-control text-secondary' name='currentSite' required='required'>").attr("data-validation-required-message", "Please enter what you love and hate about your current website.");
      currentRedesignFormGroup.append(inputCurrent);
      
      // add functionality section
      const functionalityContentGroup = $("<div class='control-group border-bottom py-5'></div>");
      $("#redesignForm").append(functionalityContentGroup);
      const functionsContentQuestion = $("<p class='lead text-secondary text-center'>(Optional) What new functionalities do you want to add to your website? Select all that apply:</p>");
      functionalityContentGroup.append(functionsContentQuestion);
      const functionalityWarning = $("<p class='help-block text-danger'></p>");
      functionalityContentGroup.append(functionalityWarning);
      createCheckboxInput(functionalityContentGroup, service.build.functionality.type, "functionality", 0, null);

      //      creates input text field for other functionality
      const functionalityInputFieldContainer = $("<div class='mt-3 mx-5'></div>");
      functionalityContentGroup.append(functionalityInputFieldContainer);
      const functionalityInputControlGroup = $("<div class='control-group mb-2'></div>");
      functionalityInputFieldContainer.append(functionalityInputControlGroup);
      const firstFunctionalityInputClearableAddition = $("<div class='form-group controls mb-0 border-top border-bottom'></div>");
      functionalityInputControlGroup.append(firstFunctionalityInputClearableAddition);
      createInputField(firstFunctionalityInputClearableAddition, "functionality", "Add a different fuctionality", false);
      inputTextFieldChangeHandler(firstFunctionalityInputClearableAddition, "input", "#addFieldButtonForFunctionality");
      createInputButton(functionalityContentGroup, "functionality");

      $("#addFieldButtonForFunctionality").on("click", function() {
        const addFunctionalityControlGroup = $("<div class='control-group mb-2'></div>");
        functionalityInputFieldContainer.append(addFunctionalityControlGroup);
        const clearableInputAddition = $("<div class='form-group controls mb-0 border-top border-bottom'></div>");
        addFunctionalityControlGroup.append(clearableInputAddition);
        createInputField(clearableInputAddition, "functionality", "Add a different fuctionality", false);
        $("#addFieldButtonForFunctionality").prop("disabled", true);
        inputTextFieldChangeHandler(clearableInputAddition, "input", "#addFieldButtonForFunctionality");
      });

      // Customer info inputs
      createRestOfForm("#redesignForm");
      $("input#full_name").on("change", function() {
        checkFullName($(this).val());
      });
      
      $("button[type='reset']").on("click", formReset);

      $("#redesignForm input, #redesignForm textarea").jqBootstrapValidation({  
        preventSubmit: true,
        submitError: function($form, event, errors) {
          // error messages
        },
        submitSuccess: function($form, event) {
          event.preventDefault();

          if ($("input[type='text'][name='functionality[]']").val() === "") {
            $("input[type='text'][name='functionality[]']").prop("disabled", true);
          }

          const formData = new FormData(event.target);

          // calculate estimate total
          let estimateTotal = 0;
          const techniqueType = formData.get("techniqueType");
          const redesign = service.redesign[techniqueType];
          formData.append("redesign", redesign);
          estimateTotal += redesign;
          
          if (formData.has("functionality[]")) {
            const functionalityCount = getTotalInputArrayCount("functionality");
            formData.append("functionalityCount", functionalityCount);
            const pricePerFunctionality = service.build.functionality[techniqueType];
            formData.append("pricePerFunctionality", pricePerFunctionality);
            const functionalitySubtotal = functionalityCount * pricePerFunctionality;
            formData.append("functionalitySubtotal", functionalitySubtotal);
            estimateTotal += functionalitySubtotal;
          }

          formData.append("estimateTotal", estimateTotal);

          for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
          }
          
          ajaxCall("redesign", formData);
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
    } else {
      serviceTypeSelectionDiv.empty();
      serviceTypeControlGroup.addClass("border-bottom");
      createForm("repair", serviceTypeSelectionDiv);

      // project name and details
      createCustomerInputField("#repairForm", "project name", "<input>", "text", true);
      createCustomerInputField("#repairForm", "project details", "<textarea>", "text", true);

      const repairGroup = $("<div class='control-group border-bottom py-5'></div>");
      $("#repairForm").append(repairGroup);
      const repairQuestion = $("<p class='lead text-secondary text-center'>What problems occur on your website? Enter a problem per line:</p>");
      repairGroup.append(repairQuestion);
      
      // input text field container
      const repairFields = $("<div class='mt-3 mx-5'></div>");
      repairGroup.append(repairFields);

      // first input text
      const repairControlGroup = $("<div class='control-group mb-2'></div>");
      repairFields.append(repairControlGroup);
      const warning = $("<p class='help-block text-danger'></p>");
      repairControlGroup.append(warning);
      const repairInput = $("<div class='form-group controls mb-0 border-top border-bottom'></div>");
      repairControlGroup.append(repairInput);
      createInputField(repairInput, "problem", "Add a problem", true);
      inputTextFieldChangeHandler(repairInput, "input", "#addFieldButtonForProblem");
      
      // input type=button
      createInputButton(repairGroup, "problem");
      $("#addFieldButtonForProblem").prop("disabled", true);
      $("#addFieldButtonForProblem").on("click", function() {
        const additionalControlGroup = $("<div class='control-group mb-2'></div>");
        repairFields.append(additionalControlGroup);
        const clearableInputAddition = $("<div class='form-group controls mb-0 border-top border-bottom'></div>");
        additionalControlGroup.append(clearableInputAddition);
        createInputField(clearableInputAddition, "problem", "Add a problem");
        $("#addFieldButtonForProblem").prop("disabled", true);
        inputTextFieldChangeHandler(clearableInputAddition, "input", "#addFieldButtonForProblem");
      });
      
      // Customer info inputs
      createRestOfForm("#repairForm");
      $("input#full_name").on("change", function() {
        checkFullName($(this).val());
      });
      
      $("button[type='reset']").on("click", formReset);

      $("#repairForm input, #repairForm textarea").jqBootstrapValidation({
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
          const pricePerProblem = service.repair.perComponent;
          formData.append("pricePerProblem", pricePerProblem);
          const estimateTotal = problemCount * pricePerProblem;
          formData.append("estimateTotal", estimateTotal);

          for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
          }
          
          ajaxCall("repair", formData);
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
