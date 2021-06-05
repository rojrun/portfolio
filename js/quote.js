$(function() {
  const quote = {};

  const service = [
    {
      type: "build",
      text: "Build a website for your project"
    },
    {
      type: "redesign",
      text: "Redesign your current website"
    },
    {
      type: "repair",
      text: "Repair your current website"
    }
  ];

  const redesign = {
    
  };

  const repair = {

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

  function customerInfo(serviceTypeSelectionDiv) {
    // message section
    const messageGroup = $("<div>").addClass("control-group");
    $(serviceTypeSelectionDiv).append(messageGroup);
    const messageFormGroup = $("<div>").addClass("form-group floating-label-form-group controls mb-0 pb-2");
    $(messageGroup).append(messageFormGroup);
    const message = $("<textarea>").attr({
      id: "message",
      name: "message",
      rows: "3",
      class: "form-control",
      placeholder: "Message",
      value: ""
    }).on("change", function() {
      quote.message = $("textarea#message").val();
    });
    $(messageFormGroup).append(message);

    // fullName section
    const fullNameGroup = $("<div>").addClass("control-group");
    $(serviceTypeSelectionDiv).append(fullNameGroup);
    const fullNameFormGroup = $("<div>").addClass("form-group floating-label-form-group controls mb-0 pb-2");
    $(fullNameGroup).append(fullNameFormGroup);
    const fullName = $("<input>").attr({
      class: "form-control text-primary",
      name: "name",
      id: "name",
      type: "text",
      placeholder: "Full Name",
      required: "required",
      value: "",
      "data-validation-required-message": "Please enter your full name."
    }).on("change", function() {
      quote.fullName = $("input#name").val();
    });
    $(fullNameFormGroup).append(fullName);

    // email section
    const emailGroup = $("<div>").addClass("control-group");
    $(serviceTypeSelectionDiv).append(emailGroup);
    const emailFormGroup = $("<div>").addClass("form-group floating-label-form-group controls mb-0 pb-2");
    $(emailGroup).append(emailFormGroup);
    const email = $("<input>").attr({
      class: "form-control text-primary",
      name: "email",
      id: "email",
      type: "text",
      placeholder: "Email Address",
      required: "required",
      value: "",
      "data-validation-required-message": "Please enter your email address."
    }).on("change", function() {
      quote.email = $("input#email").val();
    });
    $(emailFormGroup).append(email);

    // phone section
    const phoneGroup = $("<div>").addClass("control-group");
    $(serviceTypeSelectionDiv).append(phoneGroup);
    const phoneFormGroup = $("<div>").addClass("form-group floating-label-form-group controls mb-0 pb-2");
    $(phoneGroup).append(phoneFormGroup);
    const phone = $("<input>").attr({
      class: "form-control text-primary",
      name: "phone",
      id: "phone",
      type: "tel",
      placeholder: "Phone Number",
      value: "",
      // onkeydown: "javascript:backspacerDOWN(this,event);",
      // onkeyup: "javascript:backspacerUP(this,event);"
    }).on("change", function() {
      quote.phone = $("input#phone").val();
    });
    $(phoneFormGroup).append(phone);
    
    const success = $("<div>").attr("id", "success");
    $(serviceTypeSelectionDiv).append(success);
    
    // send and reset buttons
    const buttonsGroup = $("<div>").addClass("form-group row px-3");
    $(serviceTypeSelectionDiv).append(buttonsGroup);
    const submit = $("<button>").attr({
      type: "submit",
      name: "submit",
      class: "btn btn-primary btn-x1",
      id: "submitButton"
    }).text("Send");
    $(buttonsGroup).append(submit);
    const reset = $("<button>").attr({
      type: "reset",
      name: "reset",
      class: "btn btn-outline-secondary btn-lg ml-2",
      id: "resetButton",
      value: "reset"
    }).text("Reset");
    $(buttonsGroup).append(reset);

    return quote;
  }

  function deleteProps(object) {
    $.each(object, function(key) {
      if ((key !== "projectName") && (key !== "serviceType")) {
        delete object[key];
      }
    });
    return object;
  }

  // ********** beginning of dom render **********
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

  // projectName section
  const divControlGroup = $("<div>").addClass("control-group");
  $(quoteForm).append(divControlGroup);
  var divFormGroup = $("<div>").addClass("form-group floating-label-form-group controls mb-0 pb-2");
  $(divControlGroup).append(divFormGroup);
  const inputProjectName = $("<input>").attr({
    class: "form-control text-primary",
    name: "projectName",
    id: "projectName",
    type: "text",
    placeholder: "Project Name",
    value: "",
    required: "required"
  });
  $(divFormGroup).append(inputProjectName);

  $("input#projectName").on("change", function() {
    quote.projectName = $("input#projectName").val();

    // service type section
    const serviceTypeControlGroup = $("<div>").addClass("control-group border-bottom");
    $(quoteForm).append(serviceTypeControlGroup);
    // var divFormGroup2 = $("<div>").addClass("form-group floating-label-form-group controls mb-0 pb-2");
    const serviceTypeQuestion = $("<p>").text("What type of service do you need?");
    $(serviceTypeControlGroup).append(serviceTypeQuestion);
    
    for (let index = 0; index < service.length; index++) {
      const serviceDiv = $("<div>").addClass("custom-control custom-radio");
      $(serviceTypeControlGroup).append(serviceDiv);

      const serviceInput = $("<input>").attr({
        type: "radio",
        id: service[index].type,
        value: service[index].type,
        name: "serviceType",
        class: "custom-control-input",
        required: "required"
      }); 
      $(serviceDiv).append(serviceInput);

      const serviceLabel = $("<label>").attr({
        class: "custom-control-label",
        style: "opacity: 1",
        for: service[index].type
      }).text(service[index].text);
      $(serviceDiv).append(serviceLabel);
    }

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

        for (let index = 0; index < technique.length; index++) {
          const techniqueDiv = $("<div>").addClass("custom-control custom-radio");
          $(techniqueTypeGroup).append(techniqueDiv);

          const techniqueInput = $("<input>").attr({
            type: "radio",
            id: technique[index].type,
            value: technique[index].type,
            name: "techniqueType",
            class: "custom-control-input",
            required: "required"
          }).on("change", function() {
            quote.techniqueType = $(this).val();
            quote.design = design[quote.techniqueType];
            
            if (!$.isEmptyObject(quote.website)) {
              for (let index = 0; index < website.length; index++) {
                if (website[index].type === quote.website.type) {
                  quote.website.basePrice = website[index][quote.techniqueType];
                }
              }
            }

            function pricPerWhenTechniqueTypeChange(prop) {
              if (quote[prop].type.length) {
                return quote[prop].pricePer = pages[quote.techniqueType];
              }
            }
            pricPerWhenTechniqueTypeChange("pages");
            pricPerWhenTechniqueTypeChange("functions");  
          });
          $(techniqueDiv).append(techniqueInput);

          const techniqueLabel = $("<label>").attr({
            class: "custom-control-label",
            style: "opacity: 1",
            for:  technique[index].type
          }).text(technique[index].text);
          $(techniqueDiv).append(techniqueLabel);
        }

        // website type section
        quote.website = {};
        const websiteTypeGroup = $("<div>").addClass("control-group border-bottom");
        $(serviceTypeSelectionDiv).append(websiteTypeGroup);
        const websiteTypeQuestion = $("<p>").text("What type of website is your project?");
        $(websiteTypeGroup).append(websiteTypeQuestion);

        for (let index = 0; index < website.length; index++) {
          const websiteDiv = $("<div>").addClass("custom-control custom-radio");
          $(websiteTypeGroup).append(websiteDiv);

          const websiteInput = $("<input>").attr({
            type: "radio",
            id: website[index].type,
            value: website[index].type,
            name: "websiteType",
            class: "custom-control-input",
            required: "required"
          }).on("change", function() {
            quote.website.type = $(this).val();
            quote.website.basePrice = website[index][quote.techniqueType];
          });
          $(websiteDiv).append(websiteInput);

          const websiteLabel = $("<label>").attr({
            class: "custom-control-label",
            style: "opacity: 1",
            for:  website[index].type
          }).text(website[index].text);
          $(websiteDiv).append(websiteLabel);
        }
 
        // page types section
        quote.pages = {type: []};
        const pageContentGroup = $("<div>").addClass("control-group border-bottom");
        $(serviceTypeSelectionDiv).append(pageContentGroup);
        const pageContentQuestion = $("<p>").text("What pages do you want to display in your website? Select all that apply:");
        $(pageContentGroup).append(pageContentQuestion);

        for (let index = 0; index < pages.type.length; index++) {
          const pageDiv = $("<div>").addClass("form-check form-check-inine");
          $(pageContentGroup).append(pageDiv);

          const pageInput = $("<input>").attr({
            type: "checkbox",
            id: pages.type[index],
            value: pages.type[index],
            name: "pages",
            class: "form-check-input",
            required: "required"
          }).on("change", function() {
            if ($(this).is(":checked")) {
              quote.pages.type.push($(this).val());
            } else {
              quote.pages.type.splice( quote.pages.type.indexOf( $(this).val() ), 1);
            }
            quote.pages.pricePer = pages[quote.techniqueType];
          });
          $(pageDiv).append(pageInput);

          const pageLabel = $("<label>").attr({
            class: "form-check-label",
            style: "opacity: 1",
            for: pages.type[index],
            id: pages.type[index]
          }).text(pages.type[index]);
          $(pageDiv).append(pageLabel);
        }

        const inputField = $("<div>").addClass("form-check").attr("id", "otherInputField");
        $(pageContentGroup).append(inputField);

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

        for (let index = 0; index < functions.type.length; index++) {
          var functionsDiv = $("<div>").addClass("form-check form-check-inine");
          $(functionsGroup).append(functionsDiv);

          const functionsInput = $("<input>").attr({
            type: "checkbox",
            id: functions.type[index],
            value: functions.type[index],
            name: "functions",
            class: "form-check-input",
            required: "required"
          }).on("change", function() {
            if ($(this).is(":checked")) {
              quote.functions.type.push($(this).val());
            } else {
              quote.functions.type.splice( quote.functions.type.indexOf( $(this).val() ), 1);
            }
            quote.functions.pricePer = functions[quote.techniqueType];
          });
          $(functionsDiv).append(functionsInput);

          const functionsLabel = $("<label>").attr({
            class: "form-check-label",
            style: "opacity: 1",
            for: functions.type[index],
            id: functions.type[index]
          }).text(functions.type[index]);
          $(functionsDiv).append(functionsLabel);
        }

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
        
        const redesignGroup = $("<div>").addClass("control-group border-bottom");
        $(serviceTypeSelectionDiv).empty();
        $(serviceTypeSelectionDiv).append(redesignGroup);
        const redesignQuestion = $("<p>").text("Do you want your whole website ");
        $(redesignGroup).append(redesignQuestion);

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
  });
});
