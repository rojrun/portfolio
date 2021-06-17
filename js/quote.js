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

  function createCheckboxInput(appendDiv, array, name) {
    for (let index = 0; index < array.type.length; index++) {
      const container = $("<div>").addClass("form-check form-check-inine");
      $(appendDiv).append(container);

      const input = $("<input>").attr({
        type: "checkbox",
        id: array.type[index],
        value: array.type[index],
        name: name,
        class: "form-check-input",
        required: true
      });
      $(container).append(input);

      const label = $("<label>").attr({
        class: "form-check-label",
        style: "opacity: 1",
        for: array.type[index],
        id: array.type[index]
      }).text(array.type[index]);
      $(container).append(label);
    }
    return quote;
  }

  function addCheckboxInputToQuote(prop, array) {
    $(`input[name=${prop}]`).on("change", function() {
      if ($(this).is(":checked")) {
        quote[prop].type.push($(this).val());
      } else {
        quote[prop].type.splice( quote[prop].type.indexOf( $(this).val() ), 1);
      }
      quote[prop].pricePer = array[quote.techniqueType];
      return quote;
    });
  }

  function pricePerWhenTechniqueTypeChange(prop) {
    if (quote[prop].type.length) {
      return quote[prop].pricePer = pages[quote.techniqueType];
    }
    return;
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

  // function createInputFieldWithDelete(appendDiv, prop, button) {
  //   const input = $("<input>").attr({
  //     class: "form-control text-secondary",
  //     name: prop,
  //     id: "otherPageInput",
  //     type: "text",
  //     placeholder: "Add other " + prop,
  //     value: ""
  //   }).on("change", function() {
  //     quote[prop].type.push($(this).val());
  //     $(button).attr("disabled", false);
      
  //     const deleteInputButton = $("<span>").attr({
  //       id: "deleteInputButton",
  //       type: "button"
  //     }).html("&times;").css({
  //       "position": "absolute",
  //       "top": 0,
  //       "right": 0,
  //       "padding-right": "1rem",
  //       "cursor": "pointer"
  //     }).on("click", function() {
  //       quote[prop].type.splice( quote[prop].type.indexOf( $(this).siblings("input").val() ), 1);
  //       $(this).parent().get(0).remove();
  //     });
  //     $(appendDiv).append(deleteInputButton);
  //   });
  //   $(appendDiv).append(input);
    
  //   return quote;
  // }

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
    return input;
  }

  function createDeleteButtonForField(appendDiv) {
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
    $(appendDiv).append(deleteInputButton);
    return;
  }

// }).on("change", function() {
//   quote[prop].type.push($(this).val());
//   $(button).attr("disabled", false);
  
//   const deleteInputButton = $("<span>").attr({
//     id: "deleteInputButton",
//     type: "button"
//   }).html("&times;").css({
//     "position": "absolute",
//     "top": 0,
//     "right": 0,
//     "padding-right": "1rem",
//     "cursor": "pointer"
//   }).on("click", function() {
//     quote[prop].type.splice( quote[prop].type.indexOf( $(this).siblings("input").val() ), 1);
//     $(this).parent().get(0).remove();
//   });
//   $(appendDiv).append(deleteInputButton);





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
    const field = $(element).attr({
      class: "form-control text-primary",
      name: string,
      id: string,
      type: type,
      required: isRequired,
      placeholder: string.split(' ').map(word => word[0].toUpperCase() + word.substr(1).toLowerCase()).join(' '),
      value: ""
    }).on("change", function() {
      quote[string] = $(this).val();
    });
    $(form).append(field);
    return quote;
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

  $("#quoteForm input").blur(function() {
    if (!$.isEmptyObject(quote["project name"])) {
      // service type section
      const serviceTypeControlGroup = $("<div>").addClass("control-group border-bottom");
      $(quoteForm).append(serviceTypeControlGroup);
      const serviceTypeQuestion = $("<p>").text("What type of service do you need?");
      $(serviceTypeControlGroup).append(serviceTypeQuestion);
      
      createRadioInputForArray(serviceTypeControlGroup, service, "serviceType");

      // placeholder div when service type selected
      const serviceTypeSelectionDiv = $("<div>");
      $(quoteForm).append(serviceTypeSelectionDiv);
      
      $("input[name=serviceType]").on("change", function() {
        const serviceType = $(this).val();
        quote.serviceType = serviceType;
        if (serviceType === "build") {
          deleteProps(quote);
        
          // technique type section
          const techniqueTypeGroup = $("<div>").addClass("control-group border-bottom");
          $(serviceTypeSelectionDiv).empty();
          $(serviceTypeSelectionDiv).append(techniqueTypeGroup);
          const techniqueTypeQuestion = $("<p>").text("How do you want your website to be built?");
          $(techniqueTypeGroup).append(techniqueTypeQuestion);

          createRadioInputForArray(techniqueTypeGroup, technique, "techniqueType");

          $("input[name=techniqueType]").on("change", function() {
            quote.techniqueType = $(this).val();
            quote.design = design[quote.techniqueType];
            
            if (!$.isEmptyObject(quote.website)) {
              for (let index = 0; index < website.length; index++) {
                if (website[index].type === quote.website.type) {
                  quote.website.basePrice = website[index][quote.techniqueType];
                }
              }
            }

            pricePerWhenTechniqueTypeChange("page");
            pricePerWhenTechniqueTypeChange("functionality");  
          });

          // website type section
          quote.website = {};
          const websiteTypeGroup = $("<div>").addClass("control-group border-bottom");
          $(serviceTypeSelectionDiv).append(websiteTypeGroup);
          const websiteTypeQuestion = $("<p>").text("What type of website is your project?");
          $(websiteTypeGroup).append(websiteTypeQuestion);

          createRadioInputForArray(websiteTypeGroup, website, "websiteType");

          $("input[name=websiteType]").on("change", function() {
            quote.website.type = $(this).val();
            quote.website.basePrice = website[website.findIndex(function(index) {
              return index.type === quote.website.type;
            })][quote.techniqueType];
          });
  
          // page type section
          quote.page = {type: []};
          const pageContentGroup = $("<div>").addClass("control-group border-bottom");
          $(serviceTypeSelectionDiv).append(pageContentGroup);
          const pageContentQuestion = $("<p>").text("What pages do you want to display in your website? Select all that apply:");
          $(pageContentGroup).append(pageContentQuestion);

          createCheckboxInput(pageContentGroup, page, "page");
          addCheckboxInputToQuote("page", page);

          const pageInputFieldContainer = $("<div>").addClass("form-check").attr("id", "pageInputFieldContainer");
          $(pageContentGroup).append(pageInputFieldContainer);

          createInputButton(pageContentGroup, "Page");
          inputButtonClickHandler(pageInputFieldContainer, "page");
          $("#pageInputFieldContainer").on("change", "input#otherPageInput", function() {
            for (let index = 0; index < $("#pageInputFieldContainer").length; index++) {
              quote.page.type.push($(this).val());
              console.log("quote: ", quote);
              $("#addFieldButtonForPage").attr("disabled", false);
              createDeleteButtonForField("#newInputRowpage");
            }
          });

          // functionality type section
          quote.functionality = {type: []};
          const functionalityContentGroup = $("<div>").addClass("control-group border-bottom");
          $(serviceTypeSelectionDiv).append(functionalityContentGroup);
          const functionsContentQuestion = $("<p>").text("What functions do you want your website to perform? Select all that apply:");
          $(functionalityContentGroup).append(functionsContentQuestion);

          createCheckboxInput(functionalityContentGroup, functionality, "functionality");
          addCheckboxInputToQuote("functionality", functionality);
           
          const functionalityInputField = $("<div>").addClass("form-check").attr("id", "otherInputField");
          $(functionalityContentGroup).append(functionalityInputField);

          createInputButton(functionalityContentGroup, "Functionality");
          inputButtonClickHandler(functionalityInputField, "functionality");

          // customer input fields
          customerInfo(serviceTypeSelectionDiv);

        } else if (serviceType === "redesign") {
          deleteProps(quote);
          quote.sections = {type: []};
            
          // website sections for redesign
          const redesignGroup = $("<div>").addClass("control-group border-bottom");
          $(serviceTypeSelectionDiv).empty();
          $(serviceTypeSelectionDiv).append(redesignGroup);
          const redesignQuestion = $("<p>").addClass("lead text-secondary mt-4").text("What parts of your website do you want redesigned?");
          $(redesignGroup).append(redesignQuestion);

          const redesignAll = $("<div>").addClass("form-check form-check-inine");
          $(redesignGroup).append(redesignAll);

          const inputAll = $("<input>").attr({
            type: "checkbox",
            id: "inputAll",
            value: "inputAll",
            name: "inputAll",
            class: "form-check-input"
          }).on("change", function() {
            if ($(this).is(":checked")) {
              $("#redesignOther").attr("disabled", true);
              quote.sections = "entire website";
            } else {
              $("#redesignOther").attr("disabled", false);
              delete quote.sections;
            }
          });
          $(redesignAll).append(inputAll);

          const inputAllLabel = $("<label>").attr({
            class: "form-check-label",
            style: "opacity: 1",
            for: "inputAll",
            id: "inputAll"
          }).text("Entire website");
          $(redesignAll).append(inputAllLabel);

          const redesignOr = $("<p>").addClass("lead text-secondary mt-4").text("Or, input parts per field");
          $(redesignGroup).append(redesignOr);

          const additionalRedesignFields = $("<div>").attr("id", "additionalRedesignFields");
          $(redesignGroup).append(additionalRedesignFields);

          const clearableInput = $("<div>").attr("id", "redesignInputRow").css({"display": "block", "position": "relative"});
          $(additionalRedesignFields).append(clearableInput);

          const redesignOtherField = $("<input>").attr({
            class: "form-control text-secondary",
            name: "redesignOther",
            id: "redesignOther",
            type: "text",
            placeholder: "Add part of the website that you want to redesign",
            value: ""
          }).on("change", function() {
            const deleteInputButton = $("<span>").attr({
              id: "deleteInputButton",
              type: "button"
            }).html("&times;").css({
              "position": "absolute",
              "top": 0,
              "right": 0,
              "padding-right": "1rem",
              "cursor": "pointer"
            }).on("click", function() {
              quote.sections.type.splice( quote.sections.type.indexOf( $("#redesignOther").val() ), 1);
              $(this).parent().get(0).remove();
            });

            if (!$(this).val()) {
              $("#inputAll").attr("disabled", false);
              $("#addRedesignFieldButton").attr("disabled", true);
              $("#deleteInputButton").remove();
            } else {
              $("#inputAll").attr("disabled", true);
              $("#addRedesignFieldButton").attr("disabled", false);
              $(clearableInput).append(deleteInputButton);
              quote.sections.type.push($(this).val());
            }
          });
          $(clearableInput).append(redesignOtherField);

          const addRedesignFieldButton = $("<input>").attr({
            id: "addRedesignFieldButton",
            class: "btn btn-outline-secondary btn-lg ml-2",
            type: "button",
            value: "Add new field",
            disabled: true
          }).on("click", function() {
            $("#addRedesignFieldButton").attr("disabled", true);

            const newSectionField = $("<div>").attr("id", "newSectionInputRow").css({"display": "block", "position": "relative"});
            $(additionalRedesignFields).append(newSectionField);

            const newSectionInput = $("<input>").attr({
              class: "form-control text-secondary",
              name: "redesignOther",
              id: "redesignOther",
              type: "text",
              placeholder: "Add section",
              value: ""
            }).on("change", function() {
              const deleteInputButton = $("<span>").attr({
                id: "deleteInputButton",
                type: "button"
              }).html("&times;").css({
                "position": "absolute",
                "top": 0,
                "right": 0,
                "padding-right": "1rem",
                "cursor": "pointer"
              }).on("click", function() {
                quote.sections.type.splice( quote.sections.type.indexOf( $(this).siblings("input").val() ), 1);
                $(this).parent().get(0).remove();
              });
    
              if (!$(this).val()) {  
                $("#addRedesignFieldButton").attr("disabled", true);
                $("#deleteInputButton").remove();
              } else {
                $("#addRedesignFieldButton").attr("disabled", false);
                $(newSectionField).append(deleteInputButton);
                quote.sections.type.push($(this).val());
              }
            });
            $(newSectionField).append(newSectionInput);
          });
          $(redesignGroup).append(addRedesignFieldButton);

          // add functionality section
          const addFunctionalityGroup = $("<div>").addClass("control-group border-bottom");
          $(redesignGroup).append(addFunctionalityGroup);
          const addFunctionalityQuestion = $("<p>").addClass("lead text-secondary mt-4").text("What new functionalities do you want to add to your website?");
          $(redesignGroup).append(addFunctionalityQuestion);

          const addFunctionalityFields = $("<div>").attr("id", "addFunctionalityFields");
          $(redesignGroup).append(addFunctionalityFields);

          const functionalityInput = $("<div>").attr("id", "functionalityInputRow").css({"display": "block", "position": "relative"});
          $(addFunctionalityFields).append(functionalityInput);

          const functionalityOtherField = $("<input>").attr({
            class: "form-control text-secondary",
            name: "functionalityOther",
            id: "functionalityOther",
            type: "text",
            placeholder: "Add new functionality",
            value: ""
          }).on("change", function() {
            const deleteInputButton = $("<span>").attr({
              id: "deleteInputButton",
              type: "button"
            }).html("&times;").css({
              "position": "absolute",
              "top": 0,
              "right": 0,
              "padding-right": "1rem",
              "cursor": "pointer"
            }).on("click", function() {
              quote.addedFunctionality.type.splice( quote.addedFunctionality.type.indexOf( $("#functionalityOther").val() ), 1);
              $(this).parent().get(0).remove();
            });

            quote.addedFunctionality = {type: []};
            
            if (!$(this).val()) {
              $("#addFuctionalityFieldButton").attr("disabled", true);
              $("#deleteInputButton").remove();
            } else {
              $("#addFuctionalityFieldButton").attr("disabled", false);
              $(functionalityInput).append(deleteInputButton);
              quote.addedFunctionality.type.push($(this).val());
            }
          });
          $(functionalityInput).append(functionalityOtherField);

          const addFuctionalityFieldButton = $("<input>").attr({
            id: "addFuctionalityFieldButton",
            class: "btn btn-outline-secondary btn-lg ml-2",
            type: "button",
            value: "Add new functionality",
            disabled: true
          }).on("click", function() {
            $("#addFuctionalityFieldButton").attr("disabled", true);

            const newFuctionalityField = $("<div>").attr("id", "newFuctionalityInputRow").css({"display": "block", "position": "relative"});
            $(addFunctionalityFields).append(newFuctionalityField);

            const newSectionInput = $("<input>").attr({
              class: "form-control text-secondary",
              name: "redesignOther",
              id: "redesignOther",
              type: "text",
              placeholder: "Add new functionality",
              value: ""
            }).on("change", function() {
              const deleteInputButton = $("<span>").attr({
                id: "deleteInputButton",
                type: "button"
              }).html("&times;").css({
                "position": "absolute",
                "top": 0,
                "right": 0,
                "padding-right": "1rem",
                "cursor": "pointer"
              }).on("click", function() {
                quote.addedFunctionality.type.splice( quote.addedFunctionality.type.indexOf( $(this).siblings("input").val() ), 1);
                $(this).parent().get(0).remove();
              });
    
              if (!$(this).val()) {  
                $("#addFuctionalityFieldButton").attr("disabled", true);
                $("#deleteInputButton").remove();
              } else {
                $("#addFuctionalityFieldButton").attr("disabled", false);
                $(newFuctionalityField).append(deleteInputButton);
                quote.addedFunctionality.type.push($(this).val());
              }
            });
            $(newFuctionalityField).append(newSectionInput);
          });
          $(redesignGroup).append(addFuctionalityFieldButton);
    
          customerInfo(serviceTypeSelectionDiv);
          
        } else if (serviceType === "repair") {
          deleteProps(quote);
          quote.problems = {type: []};

          const repairGroup = $("<div>").addClass("control-group border-bottom");
          $(serviceTypeSelectionDiv).empty();
          $(serviceTypeSelectionDiv).append(repairGroup);
          const repairQuestion = $("<p>").text("What problems occur on your website?");
          $(repairGroup).append(repairQuestion);

          const additionalRepairFields = $("<div>").attr("id", "additionalRepairFields");
          $(repairGroup).append(additionalRepairFields);

          const clearableInput = $("<div>").attr("id", "repairInputRow").css({"display": "block", "position": "relative"});
          $(additionalRepairFields).append(clearableInput);

          const repairOtherField = $("<input>").attr({
            class: "form-control text-secondary",
            name: "repairOther",
            id: "repairOther",
            type: "text",
            placeholder: "Add a problem",
            value: ""
          }).on("change", function() {
            const deleteInputButton = $("<span>").attr({
              id: "deleteInputButton",
              type: "button"
            }).html("&times;").css({
              "position": "absolute",
              "top": 0,
              "right": 0,
              "padding-right": "1rem",
              "cursor": "pointer"
            }).on("click", function() {
              quote.problems.type.splice( quote.problems.type.indexOf( $("#repairOther").val() ), 1);
              $(this).parent().get(0).remove();
            });

            if (!$(this).val()) {
              $("#addRepairFieldButton").attr("disabled", true);
              $("#deleteInputButton").remove();
            } else {
              $("#addRepairFieldButton").attr("disabled", false);
              $(clearableInput).append(deleteInputButton);
              quote.problems.type.push($(this).val());
            }
          });
          $(clearableInput).append(repairOtherField);

          const addRepairFieldButton = $("<input>").attr({
            id: "addRepairFieldButton",
            class: "btn btn-outline-secondary btn-lg ml-2",
            type: "button",
            value: "Add new field",
            disabled: true
          }).on("click", function() {
            $("#addRepairFieldButton").attr("disabled", true);

            const newRepairField = $("<div>").attr("id", "newSectionInputRow").css({"display": "block", "position": "relative"});
            $(additionalRepairFields).append(newRepairField);

            const newRepairInput = $("<input>").attr({
              class: "form-control text-secondary",
              name: "redesignOther",
              id: "redesignOther",
              type: "text",
              placeholder: "Add section",
              value: ""
            }).on("change", function() {
              const deleteInputButton = $("<span>").attr({
                id: "deleteInputButton",
                type: "button"
              }).html("&times;").css({
                "position": "absolute",
                "top": 0,
                "right": 0,
                "padding-right": "1rem",
                "cursor": "pointer"
              }).on("click", function() {
                quote.problems.type.splice( quote.problems.type.indexOf( $(this).siblings("input").val() ), 1);
                $(this).parent().get(0).remove();
              });
    
              if (!$(this).val()) {  
                $("#addRepairFieldButton").attr("disabled", true);
                $("#deleteInputButton").remove();
              } else {
                $("#addRepairFieldButton").attr("disabled", false);
                $(newRepairField).append(deleteInputButton);
                quote.problems.type.push($(this).val());
              }
            });
            $(newRepairField).append(newRepairInput);
            console.log("quote: ", quote);
          });
          $(repairGroup).append(addRepairFieldButton);

          customerInfo(serviceTypeSelectionDiv);
          
        }
      });
    }
  });
});
