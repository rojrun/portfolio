$(function() {
  const quote = {};

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

  const website = [
    {
      type: "authority",
      text: "Authority website: this is the place potential customers can go to see what work your company has done and how to get in contact with someone about your services",
      customized: 3000,
      templated: 1000
    },
    {
      type: "leadGeneration",
      text: "Lead-generation website: this site is focused on generating leads through its online presence",
      customized: 3000,
      templated: 1000
    },
    {
      type: "sales",
      text: "Sales website: sites that sell products or services through e-commerce",
      customized: 10000,
      templated: 5000
    },
    {
      type: "utility",
      text: "Utility website: companies whose business and website are one and the same",
      customized: 15000,
      templated: 10000
    }
  ];
  
  const page = {
    type: [   
      "About page", "Blog page", "Contact page", "FAQ page", "Homepage", "Landing page", "Page not found page", "Press page", "Privacy policy page", "Products page",
      "Reviews page", "Search result page", "Services page", "Sitemap page", "Terms and conditions page", "Testimonials page"    
    ],
    customized: 1000,
    templated: 400
  };

  const functionality = {
    type: [
      "Book appointments", "Contact form", "Display image gallery", "Subscription offer", "Take payments", "Take surveys"
    ],
    customized: 4000,
    templated: 800
  };

  const redesign = {
    type: ["Entire website"]
  };

  const design = {
    customized: 5000,
    templated: 700
  };

  const problem = 600;

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
        required: true
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

  function createCheckboxInput(appendDiv, array, name, isRequired) {
    for (let index = 0; index < array.type.length; index++) {
      const container = $("<div class='form-check form-check-inine'></div>");
      $(appendDiv).append(container);

      const combinedWords = array.type[index].split(" ").join('_');
      
      const input = $("<input>").attr({
        type: "checkbox",
        id: combinedWords,
        value: array.type[index],
        name: name,
        class: "form-check-input",
        required: isRequired
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

  function addCheckboxInputToArray(element, array) {
    if (element.is(":checked")) {
      array.push(element.val());
    } else {
      array.splice( array.indexOf( element.val() ), 1);
    }
    return array;
  }

  function pricePerWhenTechniqueTypeChange(prop) {
    if (quote[prop].type.length) {
      return quote[prop].pricePer = page[quote.techniqueType];
    }
    return quote;
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

  function createInputField(appendDiv, prop) {
    const input = $("<input>").attr({
      class: "form-control text-secondary",
      name: prop,
      id: "other" + (prop.charAt(0).toUpperCase() + prop.slice(1)) + "Input",
      type: "text",
      placeholder: "Add a " + prop,
      value: ""
    });
    $(appendDiv).append(input);
    return;
  }

  function inputTextFieldChangeHandler(parent, child, button) {
    $(parent).on("change", child, function() {
      console.log("this: ", $(this));
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
    const field = $(element).attr({
      class: "form-control text-primary",
      name: combineWords,
      id: combineWords,
      type: type,
      required: isRequired,
      placeholder: string.split(" ").map(word => word[0].toUpperCase() + word.substr(1).toLowerCase()).join(" "),
      value: ""
    });
    $(form).append(field);
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
    createCustomerInputField(parentDiv, "comment", "<textarea>", "text", false);
    // $("textarea#comment").on("change", function() {
    //   const comment = $(this).val();
    //   return comment;
    //   // console.log("comment: ", comment);
    // });

    createCustomerInputField(parentDiv, "full name", "<input>", "text", true);
    // $("input#full_name").on("change", function() {
    //   const fullName = $(this).val();
    //   // console.log("fullName: ", fullName);
    // });

    createCustomerInputField(parentDiv, "email address", "<input>", "text", true);
    // $("input#email_address").on("change", function() {
    //   const emailAddress = $(this).val();
    //   // console.log("emailAddress: ", emailAddress);
    // });

    createCustomerInputField(parentDiv, "phone number", "<input>", "tel", false);
    // $("input#phone_number").on("change", function() {
    //   const phoneNumber = $(this).val();
    //   // console.log("phoneNumber: ", phoneNumber);
    // });

    const success = $("<div id='success'></div>");
    $(parentDiv).append(success);
    
    // send and reset buttons container
    const buttonsContainer = $("<div class='form-group row px-3'></div>");
    $(parentDiv).append(buttonsContainer);
    createButton(buttonsContainer, "submit", "btn btn-primary btn-x1");
    createButton(buttonsContainer, "reset", "btn btn-outline-secondary btn-lg ml-2");
    
    return;
  }

  // ******************** beginning of dom render ********************
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
    const projectName = $(this).val();
    console.log("projectName: ", projectName);
    
    if ($("#serviceTypeControlGroup").length === 0) {
      const serviceTypeControlGroup = $("<div id='serviceTypeControlGroup' class='control-group border-bottom'></div>");
      $(quoteForm).append(serviceTypeControlGroup);
      const serviceTypeQuestion = $("<p>What type of service do you need?</p>");
      $(serviceTypeControlGroup).append(serviceTypeQuestion);

      createRadioInputForArray(serviceTypeControlGroup, service, "serviceType");

      // placeholder div when service type selected
      const serviceTypeSelectionDiv = $("<div></div>");
      $(quoteForm).append(serviceTypeSelectionDiv);

      $("input[name=serviceType]").on("change", function() {
        const serviceType = $(this).val();

        if (serviceType === "build") {
          $(serviceTypeSelectionDiv).empty();

          // technique type section
          const techniqueTypeGroup = $("<div class='control-group border-bottom'></div>");
          $(serviceTypeSelectionDiv).append(techniqueTypeGroup);
          const techniqueTypeQuestion = $("<p>How do you want your website to be built?</p>");
          $(techniqueTypeGroup).append(techniqueTypeQuestion);

          createRadioInputForArray(techniqueTypeGroup, technique, "techniqueType");
          $("input[name=techniqueType]").on("change", function() {
            const techniqueType = $(this).val();
            console.log("techniqueType: ", techniqueType);
          });

          // website type section
          const websiteTypeGroup = $("<div class='control-group border-bottom'></div>");
          $(serviceTypeSelectionDiv).append(websiteTypeGroup);
          const websiteTypeQuestion = $("<p>What type of website is your project?</p>");
          $(websiteTypeGroup).append(websiteTypeQuestion);

          createRadioInputForArray(websiteTypeGroup, website, "websiteType");
          $("input[name=websiteType]").on("change", function() {
            const websiteType = $(this).val();
            console.log('websiteType: ', websiteType);
          });
          
          // page type section
          const pageContentGroup = $("<div class='control-group border-bottom'></div>");
          $(serviceTypeSelectionDiv).append(pageContentGroup);
          const pageContentQuestion = $("<p>What pages do you want to display in your website? Select all that apply:</p>");
          $(pageContentGroup).append(pageContentQuestion);
          let pageArray = [];
          createCheckboxInput(pageContentGroup, page, "page", true);
          $("input[name=page]").on("change", function() {
            pageArray = addCheckboxInputToArray($(this), pageArray);
            console.log("pageArray: ", pageArray);
          }); 

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
          let functionalityArray = [];
          createCheckboxInput(functionalityContentGroup, functionality, "functionality", true);
          $("input[name=functionality]").on("change", function() {
            functionalityArray = addCheckboxInputToArray($(this), functionalityArray);
            console.log("functionalityArray: ", functionalityArray);
          });

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
          // const comment = createCustomerInputField(serviceTypeSelectionDiv, "comment", "<textarea>", "text", false);
          // const fullName = createCustomerInputField(serviceTypeSelectionDiv, "full name", "<input>", "text", true);
          // const emailAddress = createCustomerInputField(serviceTypeSelectionDiv, "email address", "<input>", "text", true);
          // const phoneNumber = createCustomerInputField(serviceTypeSelectionDiv, "phone number", "<input>", "tel", false);
          const comment = $("textarea#comment").on("change", function() {
            return $(this).val();
          });
          console.log("outside function: ", comment);
          // console.log("outside function: ", fullName);
          // console.log("outside function: ", emailAddress);
          // console.log("outside function: ", phoneNumber);
          
        } else if (serviceType === "redesign") {
          $(serviceTypeSelectionDiv).empty();

          // website sections for redesign
          const redesignGroup = $("<div class='control-group border-bottom'></div>");
          $(serviceTypeSelectionDiv).empty();
          $(serviceTypeSelectionDiv).append(redesignGroup);
          const redesignQuestion = $("<p class='lead text-secondary mt-4'>What parts of your website do you want redesigned?</p>");
          $(redesignGroup).append(redesignQuestion);
          let section = [];
          createCheckboxInput(redesignGroup, redesign, "section", false);
          $("input#Entire_website").on("change", function() {
            if ($(this).is(":checked")) {
              $("#otherSectionInput").prop("disabled", true);
              section.push($(this).val());        
            } else {
              $("#otherSectionInput").prop("disabled", false);
              section.length = 0;
            }
            console.log("section: ", section);
          });

          const redesignOr = $("<p class='lead text-secondary mt-4'>Or, enter in the sections you want changed</p>");
          $(redesignGroup).append(redesignOr);

          const additionalRedesignFields = $("<div id='additionalRedesignFields'></div>");
          $(redesignGroup).append(additionalRedesignFields);

          const clearableInput = $("<div id='redesignInputRow'></div>").css({"display": "block", "position": "relative"});
          $(additionalRedesignFields).append(clearableInput);
          createInputField(clearableInput, "section");
          $(clearableInput).on("change", "input", function() {
            if (!$(this).val()) {
              $("#Entire_website").prop("disabled", false);
              $("#addFieldButtonForSection").prop("disabled", true);
              $(this).siblings("#deleteInputButton").remove();
            } else {
              if ( $(this).siblings("#deleteInputButton").length === 0 ) {
                createDeleteButtonForField(clearableInput, $(this));
              }
              $("#Entire_website").prop("disabled", true);
              const sectionTextInput = $(this).val();
              $("#addFieldButtonForSection").prop("disabled", false);
            }
          });

          createInputButton(redesignGroup, "section");
          $("#addFieldButtonForSection").prop("disabled", true);
          $("#addFieldButtonForSection").on("click", function() {
            const clearableInputAddition = $("<div id='redesignInputRow'></div>").css({"display": "block", "position": "relative"});
            $(additionalRedesignFields).append(clearableInputAddition);
            createInputField(clearableInputAddition, "section");
            $("#addFieldButtonForSection").prop("disabled", true);
            inputTextFieldChangeHandler(clearableInputAddition, "input", "#addFieldButtonForSection");
          });

          // add functionality section
          const addFunctionalityGroup = $("<div class='control-group border-bottom'></div>");
          $(serviceTypeSelectionDiv).append(addFunctionalityGroup);
          const addFunctionalityQuestion = $("<p class='lead text-secondary mt-4'>What new functionalities do you want to add to your website?</p>");
          $(addFunctionalityGroup).append(addFunctionalityQuestion);
          let functionality = [];

          const addFunctionalityFields = $("<div id='addFunctionalityFields'></div>");
          $(addFunctionalityGroup).append(addFunctionalityFields);

          const functionalityInput = $("<div id='functionalityInputRow'></div>").css({"display": "block", "position": "relative"});
          $(addFunctionalityFields).append(functionalityInput);
          createInputField(functionalityInput, "functionality");
          inputTextFieldChangeHandler(functionalityInput, "input", "#addFieldButtonForFunctionality");
         
          createInputButton(addFunctionalityGroup, "functionality");
          $("#addFieldButtonForFunctionality").prop("disabled", true);
          $("#addFieldButtonForFunctionality").on("click", function() {
            const clearableInputAddition = $("<div id='newFunctionalityInputRow'></div>").css({"display": "block", "position": "relative"});
            $(addFunctionalityFields).append(clearableInputAddition);
            createInputField(clearableInputAddition, "functionality");
            $("#addFieldButtonForFunctionality").prop("disabled", true);
            inputTextFieldChangeHandler(clearableInputAddition, "input", "#addFieldButtonForFunctionality");
          }); 

          // Customer info inputs
          createRestOfForm(serviceTypeSelectionDiv);

        } else if (serviceType === "repair") {
          $(serviceTypeSelectionDiv).empty();

          const repairGroup = $("<div class='control-group border-bottom'></div>");
          $(serviceTypeSelectionDiv).append(repairGroup);
          const repairQuestion = $("<p>What problems occur on your website? Separate each problem.</p>");
          $(repairGroup).append(repairQuestion);

          const repairFields = $("<div id='repairFields'></div>");
          $(repairGroup).append(repairFields);

          const repairInput = $("<div id='repairInputRow'></div>").css({"display": "block", "position": "relative"});
          $(repairFields).append(repairInput);
          createInputField(repairInput, "problem");
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
        }

        // createCustomerInputField(serviceTypeSelectionDiv, "comment", "<textarea>", "text", false);
        // $("textarea#comment").on("change", function() {
        //   const comment = $(this).val();
        //   console.log("comment: ", comment);
        // });

        // createCustomerInputField(serviceTypeSelectionDiv, "full name", "<input>", "text", true);
        // $("input#full_name").on("change", function() {
        //   const fullName = $(this).val();
        //   console.log("fullName: ", fullName);
        // });

        // createCustomerInputField(serviceTypeSelectionDiv, "email address", "<input>", "text", true);
        // $("input#email_address").on("change", function() {
        //   const emailAddress = $(this).val();
        //   console.log("emailAddress: ", emailAddress);
        // });

        // createCustomerInputField(serviceTypeSelectionDiv, "phone number", "<input>", "tel", false);
        // $("input#phone_number").on("change", function() {
        //   const phoneNumber = $(this).val();
        //   console.log("phoneNumber: ", phoneNumber);
        // });

        // const success = $("<div id='success'></div>");
        // $(serviceTypeSelectionDiv).append(success);
        
        // // send and reset buttons container
        // const buttonsContainer = $("<div class='form-group row px-3'></div>");
        // $(serviceTypeSelectionDiv).append(buttonsContainer);
        // createButton(buttonsContainer, "submit", "btn btn-primary btn-x1");
        // createButton(buttonsContainer, "reset", "btn btn-outline-secondary btn-lg ml-2");
      });
    } 
  });  
});
