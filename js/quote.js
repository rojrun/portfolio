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
  
  const pages = {
    type: [   
      "About page", "Blog page", "Contact page", "FAQ page", "Homepage", "Landing page", "Page not found page", "Press page", "Privacy policy page", "Products page",
      "Reviews page", "Search result page", "Services page", "Sitemap page", "Terms and conditions page", "Testimonials page"    
    ],
    customized: 1000,
    templated: 400
  };

  const functions = {
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

  function createRadioInput(appendDiv, array, name) {
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
      }).on("change", function() {
        if ($(this).is(":checked")) {
          quote[name].type.push($(this).val());
        } else {
          quote[name].type.splice( quote[name].type.indexOf( $(this).val() ), 1);
        }
        quote[name].pricePer = array[quote.techniqueType];
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

  function pricePerWhenTechniqueTypeChange(prop) {
    if (quote[prop].type.length) {
      return quote[prop].pricePer = pages[quote.techniqueType];
    }
    return;
  }

  function createInputButton(appendDiv) {
    const button = $("<input>").attr({
      id: "addFieldButton",
      class: "btn btn-outline-secondary btn-lg ml-2",
      type: "button",
      value: "Add new field"
    }).on("click", function() {
      $("#addFieldButton").attr("disabled", true);

    });
    $(appendDiv).append(button);
  }

  function customerInfo(serviceTypeSelectionDiv) {
    createFormField(serviceTypeSelectionDiv, "comment", "<textarea>", "text", false);
    createFormField(serviceTypeSelectionDiv, "full name", "<input>", "text", true);
    createFormField(serviceTypeSelectionDiv, "email address", "<input>", "text", true);
    createFormField(serviceTypeSelectionDiv, "phone number", "<input>", "tel", false);
    
    const success = $("<div>").attr("id", "success");
    $(serviceTypeSelectionDiv).append(success);
    
    // send and reset buttons container
    const buttonsContainer = $("<div>").addClass("form-group row px-3");
    $(serviceTypeSelectionDiv).append(buttonsContainer);
    createButton(buttonsContainer, "submit", "btn btn-primary btn-x1");
    createButton(buttonsContainer, "reset", "btn btn-outline-secondary btn-lg ml-2");

    return quote;
  }

  function createFormField(appendDiv, string, element, type, isRequired) {
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

  createFormField(quoteForm, "project name", "<input>", "text", true);

  $("#quoteForm input").blur(function() {
    if (!$.isEmptyObject(quote["project name"])) {
      // service type section
      const serviceTypeControlGroup = $("<div>").addClass("control-group border-bottom");
      $(quoteForm).append(serviceTypeControlGroup);
      // var divFormGroup2 = $("<div>").addClass("form-group floating-label-form-group controls mb-0 pb-2");
      const serviceTypeQuestion = $("<p>").text("What type of service do you need?");
      $(serviceTypeControlGroup).append(serviceTypeQuestion);
      
      createRadioInput(serviceTypeControlGroup, service, "serviceType");

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

          createRadioInput(techniqueTypeGroup, technique, "techniqueType");

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

            pricePerWhenTechniqueTypeChange("pages");
            pricePerWhenTechniqueTypeChange("functions");  
          });

          // website type section
          quote.website = {};
          const websiteTypeGroup = $("<div>").addClass("control-group border-bottom");
          $(serviceTypeSelectionDiv).append(websiteTypeGroup);
          const websiteTypeQuestion = $("<p>").text("What type of website is your project?");
          $(websiteTypeGroup).append(websiteTypeQuestion);

          createRadioInput(websiteTypeGroup, website, "websiteType");

          $("input[name=websiteType]").on("change", function() {
            quote.website.type = $(this).val();
            quote.website.basePrice = website[website.findIndex(function(index) {
              return index.type === quote.website.type;
            })][quote.techniqueType];
          });
  
          // page types section
          quote.pages = {type: []};
          const pageContentGroup = $("<div>").addClass("control-group border-bottom");
          $(serviceTypeSelectionDiv).append(pageContentGroup);
          const pageContentQuestion = $("<p>").text("What pages do you want to display in your website? Select all that apply:");
          $(pageContentGroup).append(pageContentQuestion);

          createCheckboxInput(pageContentGroup, pages, "pages");

          const inputField = $("<div>").addClass("form-check").attr("id", "otherInputField");
          $(pageContentGroup).append(inputField);

          createInputButton(pageContentGroup);

          const addFieldButton = $("<input>").attr({
            id: "addFieldButton",
            class: "btn btn-outline-secondary btn-lg ml-2",
            type: "button",
            value: "Add new field"
          }).on("click", function() {
            $("#addFieldButton").attr("disabled", true);

            const clearableInput = $("<div>").attr("id", "newInputRow").css({"display": "block", "position": "relative"});
            $(inputField).append(clearableInput);

            const otherPageInput = $("<input>").attr({
              class: "form-control text-secondary",
              name: "pages",
              id: "otherPageInput",
              type: "text",
              placeholder: "Add page",
              value: ""
            }).on("change", function() {
              quote.pages.type.push($(this).val());
              $("#addFieldButton").attr("disabled", false);
              
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
                quote.pages.type.splice( quote.pages.type.indexOf( $(this).siblings("input").val() ), 1);
                $(this).parent().get(0).remove();
              });
              $(clearableInput).append(deleteInputButton);
            });
            $(clearableInput).append(otherPageInput);
          });
          $(pageContentGroup).append(addFieldButton);

          // functions section
          quote.functions = {type: []};
          const functionsGroup = $("<div>").addClass("control-group border-bottom");
          $(serviceTypeSelectionDiv).append(functionsGroup);
          const functionsContentQuestion = $("<p>").text("What functions do you want your website to perform? Select all that apply:");
          $(functionsGroup).append(functionsContentQuestion);

          createCheckboxInput(functionsGroup, functions, "functions");  
          
          const functionInputField = $("<div>").addClass("form-check").attr("id", "otherInputField");
          $(functionsGroup).append(functionInputField);

          const addFunctionFieldButton = $("<input>").attr({
            id: "addFunctionFieldButton",
            class: "btn btn-outline-secondary btn-lg ml-2",
            type: "button",
            value: "Add new field"
          }).on("click", function() {
            $("#addFunctionFieldButton").attr("disabled", true);

            const clearableInput = $("<div>").attr("id", "newInputRow").css({"display": "block", "position": "relative"});
            $(functionInputField).append(clearableInput);

            const otherFunctionInput = $("<input>").attr({
              class: "form-control text-secondary",
              name: "functionality",
              id: "otherFunctionInput",
              type: "text",
              placeholder: "Add functionality",
              value: ""
            }).on("change", function() {
              quote.functions.type.push($(this).val());
              $("#addFunctionFieldButton").attr("disabled", false);
              
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
                quote.functions.type.splice( quote.functions.type.indexOf( $(this).siblings("input").val() ), 1);
                $(this).parent().get(0).remove();
              });
              $(clearableInput).append(deleteInputButton);
            });
            $(clearableInput).append(otherFunctionInput);
          });
          $(functionsGroup).append(addFunctionFieldButton);

          customerInfo(serviceTypeSelectionDiv);

        } else if (serviceType === "redesign") {
          deleteProps(quote);
          
          // website sections for redesign
          const redesignGroup = $("<div>").addClass("control-group border-bottom");
          $(serviceTypeSelectionDiv).empty();
          $(serviceTypeSelectionDiv).append(redesignGroup);
          const redesignQuestion = $("<p>").addClass("lead text-secondary mt-4").text("What parts of your website do you want redesigned?");
          $(redesignGroup).append(redesignQuestion);

          const redesignAll = $("<div>").addClass("form-check col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6");
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

            quote.sections = {type: []};
            
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
              console.log("quote: ", quote);
            });
            $(newFuctionalityField).append(newSectionInput);
          });
          $(redesignGroup).append(addFuctionalityFieldButton);
    
          customerInfo(serviceTypeSelectionDiv);
          console.log("quote: ", quote);
          
        } else if (serviceType === "repair") {
          deleteProps(quote);

          const repairGroup = $("<div>").addClass("control-group border-bottom");
          $(serviceTypeSelectionDiv).empty();
          $(serviceTypeSelectionDiv).append(repairGroup);
          const repairQuestion = $("<p>").text("Repair");
          $(repairGroup).append(repairQuestion);

          customerInfo(serviceTypeSelectionDiv);
          console.log("repair quote: ", quote);

        }
      });
    }
  });
});
