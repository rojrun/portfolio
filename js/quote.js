$(function() {
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
        customized: 4000, 
        templated: 2000
      },
      redesign: {
        customized: 2500, 
        templated: 1200
      }
    },
    {
      type: "leadGeneration",
      text: "Lead-generation website: this site is focused on generating leads through its online presence",
      build: {
        customized: 5000, 
        templated: 2500
      },
      redesign: {
        customized: 2500, 
        templated: 1200
      }
    },
    {
      type: "sales",
      text: "Sales website: sites that sell products or services through e-commerce",
      build: {
        customized: 75000, 
        templated: 35000
      },
      redesign: {
        customized: 10000,
        templated: 5000
      }
    },
    {
      type: "utility",
      text: "Utility website: companies whose business and website are one and the same",
      build: {
        customized: 100000, 
        templated: 50000
      },
      redesign: {
        customized: 10000, 
        templated: 5000
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
    customized: 900,
    templated: 500
  };

  const functionality = {
    type: [
      "Book appointments", "Contact form", "Database integration", "Display image gallery", "Search bar", "Subscription offer", "Take payments", "Take surveys", "Testimonials/reviews"
    ],
    customized: 5000,
    templated: 2000
  };

  const redesign = {
    type: [
      "Entire website", "Some components"
    ],
    perComponent: {
      customized: 2500,
      templated: 1000
    }
  };
  
  const repairPerComponent = 700;

  /***************************************** functions ******************************************/
  function createRadioInputs(appendDiv, array, name) {
    for (let index = 0; index < array.length; index++) {
      const container = $("<div class='mx-4 py-3'></div>");
      appendDiv.append(container);
      if ((index !== array.length-1)) {
        container.addClass("border-bottom");
      }

      const label = $("<label class='lead mb-0 radio'></label>").attr({
        for: array[index].type
      });
      container.append(label);

      // first child of label
      const spanInput = $("<span class='radio__input'></span>");
      label.append(spanInput);

      const input = $("<input type='radio' 'data-validation-required-message'='Please select an option.' required>").attr({
        id: array[index].type,
        value: array[index].type,
        name: name,
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

  function createForm(service, appendDiv) {
    const form = $("<form></form>").attr({
      action: "js/quote.js", 
      name: service + "Form",
      id: service + "Form",
      novalidate: "novalidate",
      method: "post",
      enctype: "text/plain"
    });
    appendDiv.append(form);
    return;
  }

  function createCheckboxInput(appendDiv, array, name, minchecked, validation) {
    for (let index = 0; index < array.type.length; index++) {
      const container = $("<div class='mx-5 py-1'></div>");
      appendDiv.append(container);
      
      const combineWords = array.type[index].split(" ").join("_");

      const label = $("<label class='lead mb-0 radio'></label>").attr({
        for: combineWords
      });
      container.append(label);

      // first child of label
      const spanInput = $("<span class='radio__input'></span>");
      label.append(spanInput);

      const input = $("<input type='checkbox'>").attr({
        id: combineWords,
        value: array.type[index],
        name: name + "[]",
        minchecked: minchecked,
        "data-validation-minchecked-message": validation
      }); 
      spanInput.append(input);

      const spanControl = $("<span class='radio__control checkbox__border'></span>");
      spanInput.append(spanControl);

      // second child of label
      const spanLabel = $("<span class='radio__label'></span>").text(array.type[index]);
      label.append(spanLabel);
    }
    return;
  }

  function createInputButton(appendDiv, prop) {
    const container = $("<div class='row justify-content-center'></div>");
    appendDiv.append(container);
    const button = $("<input>").attr({
      id: "addFieldButtonFor" + (prop.charAt(0).toUpperCase() + prop.slice(1)),
      class: "btn btn-outline-secondary btn-lg",
      type: "button",
      value: "Add other " + prop,
    });
    container.append(button);
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
      value: "",
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
    const deleteInputButton = $("<span></span>").attr({
      id: "deleteInputButton",
      type: "button", 
    }).html("&times;").on("click", function() {
      element.parent().get(0).remove();
    });
    appendDiv.append(deleteInputButton);
    return;
  }

  function createCustomerInputField(appendDiv, string, element, type, isRequired) {
    const fieldContainer = $("<div class='control-group'></div>");
    $(appendDiv).append(fieldContainer);
    const form = $("<div class='form-group floating-label-form-group controls mb-0 pb-2 border-bottom'></div>");
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
    createCustomerInputField(parentDiv, "project name", "<input>", "text", true);
    createCustomerInputField(parentDiv, "message", "<textarea>", "text", false);
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
        $('#success').html("<div class='alert alert-success'>");
        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
        $('#success > .alert-success').append($("<strong>").text("Thank you " + firstName + " for signing up for a " + service + " quote! You'll receive an email shortly."));
        $('#success > .alert-success').append('</div>');
      },
      error: function() {
        $('#success').html("<div class='alert alert-danger'>");
        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
        $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
        $('#success > .alert-danger').append('</div>');
      },
      complete: function() {
        setTimeout(formReset, 7000); 
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
  createRadioInputs(serviceTypeControlGroup, service, "serviceType");

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

      // website type section
      const websiteTypeGroup = $("<div class='control-group border-bottom py-5'></div>");
      $("#buildForm").append(websiteTypeGroup);
      const websiteTypeQuestion = $("<p class='lead text-secondary text-center'>What type of website do you want for your project? Select one option:</p>");
      websiteTypeGroup.append(websiteTypeQuestion);
      const websiteWarning = $("<p class='help-block text-danger'></p>");
      websiteTypeGroup.append(websiteWarning);
      createRadioInputs(websiteTypeGroup, website, "websiteType");

      // technique type section
      const techniqueTypeGroup = $("<div class='control-group border-bottom py-5'></div>");
      $("#buildForm").append(techniqueTypeGroup);
      const techniqueTypeQuestion = $("<p class='lead text-secondary text-center'>How do you want your website to be built? Select one option:</p>");
      techniqueTypeGroup.append(techniqueTypeQuestion);
      const techniqueWarning = $("<p class='help-block text-danger'></p>");
      techniqueTypeGroup.append(techniqueWarning);
      createRadioInputs(techniqueTypeGroup, technique, "techniqueType");

      // page type section
      const pageContentGroup = $("<div class='control-group border-bottom py-5'></div>");
      $("#buildForm").append(pageContentGroup);
      const pageContentQuestion = $("<p class='lead text-secondary text-center'>What pages do you want to display in your website? Select all that apply:</p>");
      pageContentGroup.append(pageContentQuestion);
      const pageWarning = $("<p class='help-block text-danger'></p>");
      pageContentGroup.append(pageWarning);
      createCheckboxInput(pageContentGroup, page, "page", 1, "Choose at least one.");
      
      //          creates input text field for other pages
      const pageInputFieldContainer = $("<div class='mt-3 mx-5'></div>");
      pageContentGroup.append(pageInputFieldContainer);
      createInputButton(pageContentGroup, "page");
      $("#addFieldButtonForPage").on("click", function() {
        const addPageControlGroup = $("<div class='control-group mb-2'></div>");
        pageInputFieldContainer.append(addPageControlGroup);
        const clearableInputAddition = $("<div class='form-group controls mb-0 border-top border-bottom'></div>");
        addPageControlGroup.append(clearableInputAddition);
        createInputField(clearableInputAddition, "page");
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
      createCheckboxInput(functionalityContentGroup, functionality, "functionality", 1, "Choose at least one.");

      //          creates input text field for other functionalities
      const functionalityInputFieldContainer = $("<div class='mt-3 mx-5'></div>");
      functionalityContentGroup.append(functionalityInputFieldContainer);
      createInputButton(functionalityContentGroup, "functionality");
      $("#addFieldButtonForFunctionality").on("click", function() {
        const addFunctionalityControlGroup = $("<div class='control-group mb-2'></div>");
        functionalityInputFieldContainer.append(addFunctionalityControlGroup);
        const clearableInputAddition = $("<div class='form-group controls mb-0 border-top border-bottom'></div>");
        addFunctionalityControlGroup.append(clearableInputAddition);
        createInputField(clearableInputAddition, "functionality");
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

      // type of website
      const redesignWebsiteTypeGroup = $("<div class='control-group border-bottom py-5'></div>");
      $("#redesignForm").append(redesignWebsiteTypeGroup);
      const redesignWebsiteTypeQuestion = $("<p class='lead text-secondary text-center'>What type of website is your project? Select one option:</p>");
      redesignWebsiteTypeGroup.append(redesignWebsiteTypeQuestion);
      const redesignWebsiteWarning = $("<p class='help-block text-danger'></p>");
      redesignWebsiteTypeGroup.append(redesignWebsiteWarning);
      createRadioInputs(redesignWebsiteTypeGroup, website, "websiteType");

      // technique type section
      const techniqueTypeGroup = $("<div class='control-group border-bottom py-5'></div>");
      $("#redesignForm").append(techniqueTypeGroup);
      const techniqueTypeQuestion = $("<p class='lead text-secondary text-center'>How is your website built? Select one option:</p>");
      techniqueTypeGroup.append(techniqueTypeQuestion);
      const techniqueWarning = $("<p class='help-block text-danger'></p>");
      techniqueTypeGroup.append(techniqueWarning);
      createRadioInputs(techniqueTypeGroup, technique, "techniqueType");

      // website sections for redesign
      const redesignGroup = $("<div class='control-group border-bottom py-5'></div>");
      $("#redesignForm").append(redesignGroup);
      const redesignQuestion = $("<p class='lead text-secondary text-center'>What parts of your website do you want redesigned? Select one option:</p>");
      redesignGroup.append(redesignQuestion);
      const redesignWarning = $("<p class='help-block text-danger'></p>");
      redesignGroup.append(redesignWarning);
      
      for (let index = 0; index < redesign.type.length; index++) {
        const container = $("<div class='mx-4 py-3'></div>");
        redesignGroup.append(container);
        if ((index !== redesign.type.length-1)) {
          container.addClass("border-bottom");
        }
  
        const label = $("<label class='lead mb-0 radio'></label>").attr({
          for: redesign.type[index].split(" ").join("_")
        });
        container.append(label);
  
        // first child of label
        const spanInput = $("<span class='radio__input'></span>");
        label.append(spanInput);
  
        const input = $("<input type='radio' name='redesign' 'data-validation-required-message'='Please select an option.' required>").attr({
          id: redesign.type[index].split(" ").join("_"),
          value: redesign.type[index]
        }); 
        spanInput.append(input);
  
        const spanControl = $("<span class='radio__control'></span>");
        spanInput.append(spanControl);
  
        // second child of label
        const spanLabel = $("<span class='radio__label'></span>").text(redesign.type[index]);
        label.append(spanLabel);
      }

      const componentGroup = $("<div class='mt-3 mx-5'></div>");
      redesignGroup.append(componentGroup);
      
      $("input#Entire_website").on("change", function() {
        componentGroup.empty();
        componentGroup.removeClass("mt-3");
        $("#addFieldButtonForComponent").remove();
      });

      $("input#Some_components").on("change", function() {
        componentGroup.addClass("mt-3");
        const componentControlGroup = $("<div class='control-group mb-2'></div>");
        componentGroup.append(componentControlGroup);
        const clearableInput = $("<div class='form-group controls mb-0 border-top border-bottom'></div>");
        componentControlGroup.append(clearableInput);
        createInputField(clearableInput, "component");
        createInputButton(redesignGroup, "component");
        $("#addFieldButtonForComponent").prop("disabled", true);
        inputTextFieldChangeHandler(clearableInput, "input", "#addFieldButtonForComponent");

        $("#addFieldButtonForComponent").on("click", function() {
          const addComponentControlGroup = $("<div class='control-group mb-2'></div>");
          componentGroup.append(addComponentControlGroup);
          const clearableInputAddition = $("<div class='form-group controls mb-0 border-top border-bottom'></div>");
          addComponentControlGroup.append(clearableInputAddition);
          createInputField(clearableInputAddition, "component");
          $("#addFieldButtonForComponent").prop("disabled", true);
          inputTextFieldChangeHandler(clearableInputAddition, "input", "#addFieldButtonForComponent");
        });
      });
      
      // add functionality section
      const functionalityContentGroup = $("<div class='control-group border-bottom py-5'></div>");
      $("#redesignForm").append(functionalityContentGroup);
      const functionsContentQuestion = $("<p class='lead text-secondary text-center'>(Optional) What new functionalities do you want to add to your website? Select all that apply:</p>");
      functionalityContentGroup.append(functionsContentQuestion);
      const functionalityWarning = $("<p class='help-block text-danger'></p>");
      functionalityContentGroup.append(functionalityWarning);
      createCheckboxInput(functionalityContentGroup, functionality, "functionality", 0, null);

      //      creates input text field for other functionality
      const functionalityInputFieldContainer = $("<div class='mt-3 mx-5'></div>");
      functionalityContentGroup.append(functionalityInputFieldContainer);
      createInputButton(functionalityContentGroup, "functionality");
      $("#addFieldButtonForFunctionality").on("click", function() {
        const addFunctionalityControlGroup = $("<div class='control-group mb-2'></div>");
        functionalityInputFieldContainer.append(addFunctionalityControlGroup);
        const clearableInputAddition = $("<div class='form-group controls mb-0 border-top border-bottom'></div>");
        addFunctionalityControlGroup.append(clearableInputAddition);
        createInputField(clearableInputAddition, "functionality");
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
          const formData = new FormData(event.target);

          // calculate estimate total
          let estimateTotal = 0;
          const websiteType = formData.get("websiteType");
          const websiteTypeText = website.find(obj => {
            return obj.type === websiteType;
          }).text;
          formData.append("websiteTypeText", websiteTypeText);
          const techniqueType = formData.get("techniqueType");
          
          if (formData.get("redesign") === "Entire website") {
            const redesignSubtotal = website.find(obj => {
              return obj.type === websiteType;
            }).redesign[techniqueType];
            formData.append("redesignSubtotal", redesignSubtotal);
            estimateTotal += redesignSubtotal;
          } else {
            const componentCount = getTotalInputArrayCount("component");
            formData.append("componentCount", componentCount);
            const pricePerComponent = redesign.perComponent[techniqueType];
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
      const repairInput = $("<div class='form-group controls mb-0 border-top border-bottom'></div>");
      repairControlGroup.append(repairInput);
      createInputField(repairInput, "problem", true);
      const warning = $("<p class='help-block text-danger'></p>");
      repairControlGroup.append(warning);
      inputTextFieldChangeHandler(repairInput, "input", "#addFieldButtonForProblem");
      
      // input type=button
      createInputButton(repairGroup, "problem");
      $("#addFieldButtonForProblem").prop("disabled", true);
      $("#addFieldButtonForProblem").on("click", function() {
        const additionalControlGroup = $("<div class='control-group mb-2'></div>");
        repairFields.append(additionalControlGroup);
        const clearableInputAddition = $("<div class='form-group controls mb-0 border-top border-bottom'></div>");
        additionalControlGroup.append(clearableInputAddition);
        createInputField(clearableInputAddition, "problem");
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
          const pricePerProblem = repairPerComponent;
          formData.append("pricePerProblem", pricePerProblem);
          const estimateTotal = problemCount * pricePerProblem;
          formData.append("estimateTotal", estimateTotal);
          
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
