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

  const section = {
    type: ["Entire website"]
  };

  const design = {
    customized: 5000,
    templated: 700
  };

  const problem = 600;

  function createRadioInputForArray(appendDiv, array, name) {
    for (let index = 0; index < array.length; index++) {
      const container = $("<div>").addClass("custom-control custom-radio");
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
      const container = $("<div>").addClass("form-check form-check-inine");
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
    return quote;
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
      id: "addFieldButtonFor" + prop,
      class: "btn btn-outline-secondary btn-lg ml-2",
      type: "button",
      value: "Add new field"
    });
    $(appendDiv).append(button);
    return;
  }

  function inputButtonClickHandler(appendInputField, prop) {
    const button = "#addFieldButtonFor" + (prop.charAt(0).toUpperCase() + prop.slice(1));
    $(button).on("click", function() {
      $(button).attr("disabled", true);
      const inputContainer = $("<div>").attr("id", "newInputRow" + prop).css({"display": "block", "position": "relative"});
      $(appendInputField).append(inputContainer);
      
      createInputField(inputContainer, prop);
    }); 
    return; 
  }

  function createInputField(appendDiv, prop) {
    const input = $("<input>").attr({
      class: "form-control text-secondary",
      name: prop,
      id: "other" + (prop.charAt(0).toUpperCase() + prop.slice(1)) + "Input",
      type: "text",
      placeholder: "Add other " + prop,
      value: ""
    });
    $(appendDiv).append(input);
    return;
  }

  function createDeleteButtonForField(appendDiv, prop, element, array) {
    const deleteInputButton = $("<span>").attr({
      id: "deleteInputButton",
      type: "button"
    }).html("&times;").css({
      "position": "absolute",
      "top": 0,
      "right": 0,
      "padding-right": "1rem",
      "cursor": "pointer"
    });
    $(appendDiv).last().append(deleteInputButton);
    const newArray = $("#deleteInputButton").on("click", [prop, element, array], deleteElementFromType);
    console.log("newArray: ", newArray);
    return newArray;
  }

  function deleteElementFromType(event) {
    // quote[event.data[0]].type.splice( quote[event.data[0]].type.indexOf( event.data[1].val() ), 1);
    event.data[2].splice( event.data[2].indexOf( event.data[1].val() ), 1);
    event.data[1].parent().get(0).remove();
    console.log("array: ", event.data[2]);
    return event.data[2];
  }

  function customerInfo(serviceTypeSelectionDiv) {
    createCustomerInputField(serviceTypeSelectionDiv, "comment", "<textarea>", "text", false);
    createCustomerInputField(serviceTypeSelectionDiv, "full name", "<input>", "text", true);
    createCustomerInputField(serviceTypeSelectionDiv, "email address", "<input>", "text", true);
    createCustomerInputField(serviceTypeSelectionDiv, "phone number", "<input>", "tel", false);
    
    const success = $("<div>").attr("id", "success");
    $(serviceTypeSelectionDiv).append(success);
    
    // send and reset buttons container
    const buttonsContainer = $("<div>").addClass("form-group row px-3");
    $(serviceTypeSelectionDiv).append(buttonsContainer);
    createButton(buttonsContainer, "submit", "btn btn-primary btn-x1");
    createButton(buttonsContainer, "reset", "btn btn-outline-secondary btn-lg ml-2");

    return quote;
  }

  function createCustomerInputField(appendDiv, string, element, type, isRequired) {
    const fieldContainer = $("<div>").addClass("control-group");
    $(appendDiv).append(fieldContainer);
    const form = $("<div>").addClass("form-group floating-label-form-group controls mb-0 pb-2");
    $(fieldContainer).append(form);
    const combineWords = string.split(" ").join('_');
    const field = $(element).attr({
      class: "form-control text-primary",
      name: combineWords,
      id: combineWords,
      type: type,
      required: isRequired,
      placeholder: string.split(' ').map(word => word[0].toUpperCase() + word.substr(1).toLowerCase()).join(' '),
      value: ""
    // }).on("change", function() {
    //   quote[combineWords] = $(this).val();
    });
    $(form).append(field);
    // return quote;
    return;
  }

  function createButton(container, string, bttnClass) {
    const button = $("<button>").attr({
      type: string,
      name: string,
      class: bttnClass,
      id: string
    }).text(string.charAt(0).toUpperCase() + string.slice(1));
    $(container).append(button);
    return;
  }

  function deleteProps(object) {
    $.each(object, function(key) {
      if ((key !== "project name") && (key !== "serviceType")) {
        delete object[key];
      }
    });
    return object;
  }

  // ******************** beginning of dom render ********************
  const divRow = $("<div>").addClass("row");
  $("#quote .container").append(divRow);
  const divCol = $("<div>").addClass("col-lg-12 col-xl-12 mx-auto");
  $(divRow).append(divCol);
  const quoteForm = $("<form>").attr({
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
      const serviceTypeSelectionDiv = $("<div>");
      $(quoteForm).append(serviceTypeSelectionDiv);

      $("input[name=serviceType]").on("change", function() {
        const serviceType = $(this).val();
        console.log("serviceType: ", serviceType);
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
          createInputButton(pageContentGroup, "Page");
          inputButtonClickHandler(pageInputFieldContainer, "page");
          $("#pageInputFieldContainer").on("change", "input#otherPageInput", function() {
            pageArray.push($(this).val());
            console.log("pageArray: ", pageArray);
            $("#addFieldButtonForPage").prop("disabled", false);
            
            if ( $(this).siblings("#deleteInputButton").length === 0) {
              pageArray = createDeleteButtonForField("#pageInputFieldContainer #newInputRowpage", "page", $(this), pageArray);
              console.log("pageArray: ", pageArray);
            }
          });


        } else if (serviceType === "redesign") {
          $(serviceTypeSelectionDiv).empty();


        } else if (serviceType === "repair") {
          $(serviceTypeSelectionDiv).empty();


        }
      });
    }
  });  



  // $("#quoteForm input").blur(function() {
  //   if (!$.isEmptyObject(quote["project_name"])) {
  //     // service type section
  //     const serviceTypeControlGroup = $("<div>").addClass("control-group border-bottom");
  //     $(quoteForm).append(serviceTypeControlGroup);
  //     const serviceTypeQuestion = $("<p>").text("What type of service do you need?");
  //     $(serviceTypeControlGroup).append(serviceTypeQuestion);
      
  //     createRadioInputForArray(serviceTypeControlGroup, service, "serviceType");

  //     // placeholder div when service type selected
  //     const serviceTypeSelectionDiv = $("<div>");
  //     $(quoteForm).append(serviceTypeSelectionDiv);
      
  //     $("input[name=serviceType]").on("change", function() {
  //       const serviceType = $(this).val();
  //       quote.serviceType = serviceType;
  //       if (serviceType === "build") {
  //         deleteProps(quote);
        
  //         // technique type section
  //         const techniqueTypeGroup = $("<div>").addClass("control-group border-bottom");
  //         $(serviceTypeSelectionDiv).empty();
  //         $(serviceTypeSelectionDiv).append(techniqueTypeGroup);
  //         const techniqueTypeQuestion = $("<p>").text("How do you want your website to be built?");
  //         $(techniqueTypeGroup).append(techniqueTypeQuestion);

  //         createRadioInputForArray(techniqueTypeGroup, technique, "techniqueType");

  //         $("input[name=techniqueType]").on("change", function() {
  //           quote.techniqueType = $(this).val();
  //           quote.design = design[quote.techniqueType];
            
  //           if (!$.isEmptyObject(quote.website)) {
  //             for (let index = 0; index < website.length; index++) {
  //               if (website[index].type === quote.website.type) {
  //                 quote.website.basePrice = website[index][quote.techniqueType];
  //               }
  //             }
  //           }

  //           pricePerWhenTechniqueTypeChange("page");
  //           pricePerWhenTechniqueTypeChange("functionality");  
  //         });

  //         // website type section
  //         quote.website = {};
  //         const websiteTypeGroup = $("<div>").addClass("control-group border-bottom");
  //         $(serviceTypeSelectionDiv).append(websiteTypeGroup);
  //         const websiteTypeQuestion = $("<p>").text("What type of website is your project?");
  //         $(websiteTypeGroup).append(websiteTypeQuestion);

  //         createRadioInputForArray(websiteTypeGroup, website, "websiteType");

  //         $("input[name=websiteType]").on("change", function() {
  //           quote.website.type = $(this).val();
  //           quote.website.basePrice = website[website.findIndex(function(index) {
  //             return index.type === quote.website.type;
  //           })][quote.techniqueType];
  //         });
  
  //         // page type section
  //         quote.page = {type: []};
  //         const pageContentGroup = $("<div>").addClass("control-group border-bottom");
  //         $(serviceTypeSelectionDiv).append(pageContentGroup);
  //         const pageContentQuestion = $("<p>").text("What pages do you want to display in your website? Select all that apply:");
  //         $(pageContentGroup).append(pageContentQuestion);

  //         createCheckboxInput(pageContentGroup, page, "page", true);
  //         addCheckboxInputToQuote("page", page);

  //         const pageInputFieldContainer = $("<div>").addClass("form-check").attr("id", "pageInputFieldContainer");
  //         $(pageContentGroup).append(pageInputFieldContainer);

  //         createInputButton(pageContentGroup, "Page");
  //         inputButtonClickHandler(pageInputFieldContainer, "page");
  //         $("#pageInputFieldContainer").on("change", "input#otherPageInput", function() {
  //           quote.page.type.push($(this).val());
  //           $("#addFieldButtonForPage").attr("disabled", false);
  //           createDeleteButtonForField("#pageInputFieldContainer #newInputRowpage", "page", $(this));
  //         });
          
  //         // functionality type section
  //         quote.functionality = {type: []};
  //         const functionalityContentGroup = $("<div>").addClass("control-group border-bottom");
  //         $(serviceTypeSelectionDiv).append(functionalityContentGroup);
  //         const functionsContentQuestion = $("<p>").text("What functions do you want your website to perform? Select all that apply:");
  //         $(functionalityContentGroup).append(functionsContentQuestion);

  //         createCheckboxInput(functionalityContentGroup, functionality, "functionality", true);
  //         addCheckboxInputToQuote("functionality", functionality);
           
  //         const functionalityInputField = $("<div>").addClass("form-check").attr("id", "functionalityInputFieldContainer");
  //         $(functionalityContentGroup).append(functionalityInputField);

  //         createInputButton(functionalityContentGroup, "Functionality");
  //         inputButtonClickHandler(functionalityInputField, "functionality");
  //         $("#functionalityInputFieldContainer").on("change", "input#otherFunctionalityInput", function() {
  //           quote.functionality.type.push($(this).val());
  //           $("#addFieldButtonForFunctionality").attr("disabled", false);
  //           createDeleteButtonForField("#functionalityInputFieldContainer #newInputRowfunctionality", "functionality", $(this));
  //         });

  //         // customer input fields
  //         customerInfo(serviceTypeSelectionDiv);

  //       } else if (serviceType === "redesign") {
  //         deleteProps(quote);
  //         quote.section = {type: []};
            
  //         // website sections for redesign
  //         const redesignGroup = $("<div>").addClass("control-group border-bottom");
  //         $(serviceTypeSelectionDiv).empty();
  //         $(serviceTypeSelectionDiv).append(redesignGroup);
  //         const redesignQuestion = $("<p>").addClass("lead text-secondary mt-4").text("What parts of your website do you want redesigned?");
  //         $(redesignGroup).append(redesignQuestion);

  //         createCheckboxInput(redesignGroup, section, "section", false);
  //         $("input#Entire_website").on("change", function() {
  //           if ($(this).is(":checked")) {
  //             $("#otherSectionInput").attr("disabled", true);
  //             quote.section.type.push(section.type[0]);        
  //           } else {
  //             $("#otherSectionInput").attr("disabled", false);
  //             quote.section.type.length = 0;
  //           }
  //         });
          
  //         const redesignOr = $("<p>").addClass("lead text-secondary mt-4").text("Or, input parts per field");
  //         $(redesignGroup).append(redesignOr);

  //         const additionalRedesignFields = $("<div>").attr("id", "additionalRedesignFields");
  //         $(redesignGroup).append(additionalRedesignFields);

  //         const clearableInput = $("<div>").attr("id", "redesignInputRow").css({"display": "block", "position": "relative"});
  //         $(additionalRedesignFields).append(clearableInput);

  //         createInputField(clearableInput, "section");
  //         $("#otherSectionInput").on("change", function() {
  //             if (!$(this).val()) {
  //             $("#addRedesignFieldButton").attr("disabled", true);
  //           } else {
  //             $("#Entire_website").attr("disabled", true);
  //             $("#addRedesignFieldButton").attr("disabled", false);
  //             quote.section.type.push($(this).val());
  //             createDeleteButtonForField("#redesignInputRow", "section", $(this));
  //           }
  //           console.log("quote: ", quote);
  //         });

  //         const addRedesignFieldButton = $("<input>").attr({
  //           id: "addRedesignFieldButton",
  //           class: "btn btn-outline-secondary btn-lg ml-2",
  //           type: "button",
  //           value: "Add new field",
  //           disabled: true
  //         }).on("click", function() {
  //           $("#addRedesignFieldButton").attr("disabled", true);

  //           const newSectionField = $("<div>").attr("id", "newSectionInputRow").css({"display": "block", "position": "relative"});
  //           $(additionalRedesignFields).append(newSectionField);

  //           const newSectionInput = $("<input>").attr({
  //             class: "form-control text-secondary",
  //             name: "redesignOther",
  //             id: "redesignOther",
  //             type: "text",
  //             placeholder: "Add section",
  //             value: ""
  //           }).on("change", function() {
  //             const deleteInputButton = $("<span>").attr({
  //               id: "deleteInputButton",
  //               type: "button"
  //             }).html("&times;").css({
  //               "position": "absolute",
  //               "top": 0,
  //               "right": 0,
  //               "padding-right": "1rem",
  //               "cursor": "pointer"
  //             }).on("click", function() {
  //               quote.section.type.splice( quote.section.type.indexOf( $(this).siblings("input").val() ), 1);
  //               $(this).parent().get(0).remove();
  //             });
    
  //             if (!$(this).val()) {  
  //               $("#addRedesignFieldButton").attr("disabled", true);
  //               $("#deleteInputButton").remove();
  //             } else {
  //               $("#addRedesignFieldButton").attr("disabled", false);
  //               $(newSectionField).append(deleteInputButton);
  //               quote.section.type.push($(this).val());
  //             }
  //             console.log("quote: ", quote);
  //           });
  //           $(newSectionField).append(newSectionInput);
  //         });
  //         $(redesignGroup).append(addRedesignFieldButton);

  //         // add functionality section
  //         const addFunctionalityGroup = $("<div>").addClass("control-group border-bottom");
  //         $(redesignGroup).append(addFunctionalityGroup);
  //         const addFunctionalityQuestion = $("<p>").addClass("lead text-secondary mt-4").text("What new functionalities do you want to add to your website?");
  //         $(redesignGroup).append(addFunctionalityQuestion);

  //         const addFunctionalityFields = $("<div>").attr("id", "addFunctionalityFields");
  //         $(redesignGroup).append(addFunctionalityFields);

  //         const functionalityInput = $("<div>").attr("id", "functionalityInputRow").css({"display": "block", "position": "relative"});
  //         $(addFunctionalityFields).append(functionalityInput);

  //         const functionalityOtherField = $("<input>").attr({
  //           class: "form-control text-secondary",
  //           name: "functionalityOther",
  //           id: "functionalityOther",
  //           type: "text",
  //           placeholder: "Add new functionality",
  //           value: ""
  //         }).on("change", function() {
  //           console.log("this: ", $(this).val());
  //           const deleteInputButton = $("<span>").attr({
  //             id: "deleteInputButton",
  //             type: "button"
  //           }).html("&times;").css({
  //             "position": "absolute",
  //             "top": 0,
  //             "right": 0,
  //             "padding-right": "1rem",
  //             "cursor": "pointer"
  //           }).on("click", function() {
  //             quote.addedFunctionality.type.splice( quote.addedFunctionality.type.indexOf( $("#functionalityOther").val() ), 1);
  //             $(this).parent().get(0).remove();
  //           });

  //           quote.addedFunctionality = {type: []};
            
  //           if (!$(this).val()) {
  //             $("#addFuctionalityFieldButton").attr("disabled", true);
  //             $("#deleteInputButton").remove();
  //           } else {
  //             $("#addFuctionalityFieldButton").attr("disabled", false);
  //             $(functionalityInput).append(deleteInputButton);
  //             quote.addedFunctionality.type.push($(this).val());
  //           }
  //         });
  //         $(functionalityInput).append(functionalityOtherField);

  //         const addFuctionalityFieldButton = $("<input>").attr({
  //           id: "addFuctionalityFieldButton",
  //           class: "btn btn-outline-secondary btn-lg ml-2",
  //           type: "button",
  //           value: "Add new functionality",
  //           disabled: true
  //         }).on("click", function() {
  //           $("#addFuctionalityFieldButton").attr("disabled", true);

  //           const newFuctionalityField = $("<div>").attr("id", "newFuctionalityInputRow").css({"display": "block", "position": "relative"});
  //           $(addFunctionalityFields).append(newFuctionalityField);

  //           const newSectionInput = $("<input>").attr({
  //             class: "form-control text-secondary",
  //             name: "redesignOther",
  //             id: "redesignOther",
  //             type: "text",
  //             placeholder: "Add new functionality",
  //             value: ""
  //           }).on("change", function() {
  //             const deleteInputButton = $("<span>").attr({
  //               id: "deleteInputButton",
  //               type: "button"
  //             }).html("&times;").css({
  //               "position": "absolute",
  //               "top": 0,
  //               "right": 0,
  //               "padding-right": "1rem",
  //               "cursor": "pointer"
  //             }).on("click", function() {
  //               quote.addedFunctionality.type.splice( quote.addedFunctionality.type.indexOf( $(this).siblings("input").val() ), 1);
  //               $(this).parent().get(0).remove();
  //             });
    
  //             if (!$(this).val()) {  
  //               $("#addFuctionalityFieldButton").attr("disabled", true);
  //               $("#deleteInputButton").remove();
  //             } else {
  //               $("#addFuctionalityFieldButton").attr("disabled", false);
  //               $(newFuctionalityField).append(deleteInputButton);
  //               quote.addedFunctionality.type.push($(this).val());
  //             }
  //           });
  //           $(newFuctionalityField).append(newSectionInput);
  //         });
  //         $(redesignGroup).append(addFuctionalityFieldButton);
    
  //         customerInfo(serviceTypeSelectionDiv);
          
  //       } else if (serviceType === "repair") {
  //         deleteProps(quote);
  //         quote.problems = {type: []};

  //         const repairGroup = $("<div>").addClass("control-group border-bottom");
  //         $(serviceTypeSelectionDiv).empty();
  //         $(serviceTypeSelectionDiv).append(repairGroup);
  //         const repairQuestion = $("<p>").text("What problems occur on your website?");
  //         $(repairGroup).append(repairQuestion);

  //         const additionalRepairFields = $("<div>").attr("id", "additionalRepairFields");
  //         $(repairGroup).append(additionalRepairFields);

  //         const clearableInput = $("<div>").attr("id", "repairInputRow").css({"display": "block", "position": "relative"});
  //         $(additionalRepairFields).append(clearableInput);

  //         const repairOtherField = $("<input>").attr({
  //           class: "form-control text-secondary",
  //           name: "repairOther",
  //           id: "repairOther",
  //           type: "text",
  //           placeholder: "Add a problem",
  //           value: ""
  //         }).on("change", function() {
  //           const deleteInputButton = $("<span>").attr({
  //             id: "deleteInputButton",
  //             type: "button"
  //           }).html("&times;").css({
  //             "position": "absolute",
  //             "top": 0,
  //             "right": 0,
  //             "padding-right": "1rem",
  //             "cursor": "pointer"
  //           }).on("click", function() {
  //             quote.problems.type.splice( quote.problems.type.indexOf( $("#repairOther").val() ), 1);
  //             $(this).parent().get(0).remove();
  //           });

  //           if (!$(this).val()) {
  //             $("#addRepairFieldButton").attr("disabled", true);
  //             $("#deleteInputButton").remove();
  //           } else {
  //             $("#addRepairFieldButton").attr("disabled", false);
  //             $(clearableInput).append(deleteInputButton);
  //             quote.problems.type.push($(this).val());
  //           }
  //         });
  //         $(clearableInput).append(repairOtherField);

  //         const addRepairFieldButton = $("<input>").attr({
  //           id: "addRepairFieldButton",
  //           class: "btn btn-outline-secondary btn-lg ml-2",
  //           type: "button",
  //           value: "Add new field",
  //           disabled: true
  //         }).on("click", function() {
  //           $("#addRepairFieldButton").attr("disabled", true);

  //           const newRepairField = $("<div>").attr("id", "newSectionInputRow").css({"display": "block", "position": "relative"});
  //           $(additionalRepairFields).append(newRepairField);

  //           const newRepairInput = $("<input>").attr({
  //             class: "form-control text-secondary",
  //             name: "redesignOther",
  //             id: "redesignOther",
  //             type: "text",
  //             placeholder: "Add section",
  //             value: ""
  //           }).on("change", function() {
  //             const deleteInputButton = $("<span>").attr({
  //               id: "deleteInputButton",
  //               type: "button"
  //             }).html("&times;").css({
  //               "position": "absolute",
  //               "top": 0,
  //               "right": 0,
  //               "padding-right": "1rem",
  //               "cursor": "pointer"
  //             }).on("click", function() {
  //               quote.problems.type.splice( quote.problems.type.indexOf( $(this).siblings("input").val() ), 1);
  //               $(this).parent().get(0).remove();
  //             });
    
  //             if (!$(this).val()) {  
  //               $("#addRepairFieldButton").attr("disabled", true);
  //               $("#deleteInputButton").remove();
  //             } else {
  //               $("#addRepairFieldButton").attr("disabled", false);
  //               $(newRepairField).append(deleteInputButton);
  //               quote.problems.type.push($(this).val());
  //             }
  //           });
  //           $(newRepairField).append(newRepairInput);
  //           console.log("quote: ", quote);
  //         });
  //         $(repairGroup).append(addRepairFieldButton);

  //         customerInfo(serviceTypeSelectionDiv);
          
  //       }
  //     });
  //   }
  // });
});
