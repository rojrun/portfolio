$(function() {
  var quote = {};
  var service = [
    {type: "build", price: 10000},
    {type: "redesign", problems: [], price: 500},
    {type: "repair", problems: [], price: 500}
  ];
  var app = [
    {type: "authority", price: 3000},
    {type: "leadGeneration", price: 3000},
    {type: "sales", price: 15000},
    {type: "utility", price: 20000}
  ];
  var technique = [
    {type: "customSite", price: 10000},
    {type: "templatedSite", price: 1500}
  ];
  var pages = {type: [], price: 1500};
  var functions = {type: [], price: 3000};
  var estimateTotal = 0;
  


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
    const serviceTypes = [
      {
        id: "build",
        text: "Build a website for your project"
      },
      {
        id: "redesign",
        text: "Redesign your current website"
      },
      {
        id: "repair",
        text: "Repair your current website"
      }
    ];

    quote.projectName = $("input#projectName").val();

    const serviceTypeControlGroup = $("<div>").addClass("control-group border-bottom");
    $(quoteForm).append(serviceTypeControlGroup);
    // var divFormGroup2 = $("<div>").addClass("form-group floating-label-form-group controls mb-0 pb-2");
    const serviceTypeQuestion = $("<p>").text("What type of service do you need?");
    $(serviceTypeControlGroup).append(serviceTypeQuestion);
    
    for (let serviceIndex = 0; serviceIndex < serviceTypes.length; serviceIndex++) {
      const serviceDiv = $("<div>").addClass("custom-control custom-radio");
      $(serviceTypeControlGroup).append(serviceDiv);

      const serviceInput = $("<input>").attr({
        type: "radio",
        id: serviceTypes[serviceIndex].id,
        value: serviceTypes[serviceIndex].id,
        name: "serviceType",
        class: "custom-control-input",
        required: "required"
      }); 
      $(serviceDiv).append(serviceInput);

      const serviceLabel = $("<label>").attr({
        class: "custom-control-label",
        style: "opacity: 1",
        for: serviceTypes[serviceIndex].id
      }).text(serviceTypes[serviceIndex].text);
      $(serviceDiv).append(serviceLabel);
    }

    $("input[name=serviceType]").on("click", function() {
      // const serviceType = $("input[name=serviceType]:checked").val();
      const serviceType = $(this).val();
      quote.serviceType = serviceType;
      
      if (serviceType === "build") {
        const techniqueType = [
          {
            id: "customized",
            text: "100% customized from scratch website"
          },
          {
            id: "templated",
            text: "Website using templates like Shopify or WordPress"
          }
        ];
        const techniqueTypeGroup = $("<div>").addClass("control-group border-bottom");
        $(quoteForm).append(techniqueTypeGroup);
        const techniqueTypeQuestion = $("<p>").text("How do you want your website to be built?");
        $(techniqueTypeGroup).append(techniqueTypeQuestion);
        for (let techniqueIndex = 0; techniqueIndex < techniqueType.length; techniqueIndex++) {
          const techniqueDiv = $("<div>").addClass("custom-control custom-radio");
          $(techniqueTypeGroup).append(techniqueDiv);

          const techniqueInput = $("<input>").attr({
            type: "radio",
            id: techniqueType[techniqueIndex].id,
            value: techniqueType[techniqueIndex].id,
            name: "techniqueType",
            class: "custom-control-input",
            required: "required"
          }).on("click", function() {
            quote.techniqueType = $("input[name=techniqueType]:checked").val();
          });
          $(techniqueDiv).append(techniqueInput);

          const techniqueLabel = $("<label>").attr({
            class: "custom-control-label",
            style: "opacity: 1",
            for:  techniqueType[techniqueIndex].id
          }).text(techniqueType[techniqueIndex].text);
          $(techniqueDiv).append(techniqueLabel);
        }

        const websiteTypes = [
          {
            id: "authority",
            text: "Authority website: this is the place potential customers can go to see what work your company has done and how to get in contact with someone about your services"
          },
          {
            id: "leadGeneration",
            text: "Lead-generation website: this site is focused on generating leads through its online presence"
          },
          {
            id: "sales",
            text: "Sales website: sites that sell products or services through e-commerce"
          },
          {
            id: "utility",
            text: "Utility website: companies whose business and website are one and the same"
          }
        ];
        const websiteTypeGroup = $("<div>").addClass("control-group border-bottom");
        $(quoteForm).append(websiteTypeGroup);
        const websiteTypeQuestion = $("<p>").text("What type of website is your project?");
        $(websiteTypeGroup).append(websiteTypeQuestion);
        for (let websiteIndex = 0; websiteIndex < websiteTypes.length; websiteIndex++) {
          const websiteDiv = $("<div>").addClass("custom-control custom-radio");
          $(websiteTypeGroup).append(websiteDiv);

          const websiteInput = $("<input>").attr({
            type: "radio",
            id: websiteTypes[websiteIndex].id,
            value: websiteTypes[websiteIndex].id,
            name: "websiteType",
            class: "custom-control-input",
            required: "required"
          }).on("click", function() {
            quote.websiteType = $("input[name=websiteType]:checked").val();
          });
          $(websiteDiv).append(websiteInput);

          const websiteLabel = $("<label>").attr({
            class: "custom-control-label",
            style: "opacity: 1",
            for:  websiteTypes[websiteIndex].id
          }).text(websiteTypes[websiteIndex].text);
          $(websiteDiv).append(websiteLabel);
        }
 
        const pageTypes = [   
          "About page", "Blog page", "Contact page", "FAQ page", "Homepage", "Landing page", "Page not found page", "Press page", "Privacy policy page", "Products page",
          "Reviews page", "Search result page", "Services page", "Sitemap page", "Terms and conditions page", "Testimonials page", "Other"    
        ];
        const pageContentGroup = $("<div>").addClass("control-group border-bottom");
        $(quoteForm).append(pageContentGroup);
        const pageContentQuestion = $("<p>").text("What pages do you want to display in your website? Select all that apply:");
        $(pageContentGroup).append(pageContentQuestion);
        for (let pageIndex = 0; pageIndex < pageTypes.length; pageIndex++) {
          var pageDiv = $("<div>").addClass("form-check form-check-inine");
          $(pageContentGroup).append(pageDiv);

          const pageInput = $("<input>").attr({
            type: "checkbox",
            id: pageTypes[pageIndex],
            value: pageTypes[pageIndex],
            name: "pages",
            class: "form-check-input",
            required: "required"
          }).on("click", function() {
            const pages = $("input:checkbox:checked").map(function() {
              return this.value;
            }).toArray();
            quote.pages = pages;
          });
          $(pageDiv).append(pageInput);

          const pageLabel = $("<label>").attr({
            class: "form-check-label",
            style: "opacity: 1",
            for: pageTypes[pageIndex],
            id: pageTypes[pageIndex]
          }).text(pageTypes[pageIndex]);
          $(pageDiv).append(pageLabel);
        }

        $("input#Other[name=pages]").one("click", function() {
          const otherPageInput = $("<input>").attr({
            class: "form-control text-secondary",
            name: "pages",
            id: "otherPageInput",
            type: "text",
            placeholder: "Add page",
            value: ""
          }).on("change", function() {
            quote.pages.map(function(value, index) {
              if (value === "Other") {
                return quote.pages.splice(index, 1, "Other: " + $("input#otherPageInput").val());
              }
            });
          });
          $(pageDiv).append(otherPageInput);
        });

        const messageGroup = $("<div>").addClass("control-group");
        $(quoteForm).append(messageGroup);
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
          console.log("quote: ", quote);
        });
        $(messageFormGroup).append(message);

        const fullNameGroup = $("<div>").addClass("control-group");
        $(quoteForm).append(fullNameGroup);
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
          console.log("quote: ", quote);
        });
        $(fullNameFormGroup).append(fullName);

        const emailGroup = $("<div>").addClass("control-group");
        $(quoteForm).append(emailGroup);
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
          console.log("quote: ", quote);
        });
        $(emailFormGroup).append(email);

        const phoneGroup = $("<div>").addClass("control-group");
        $(quoteForm).append(phoneGroup);
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
          console.log("quote: ", quote);
        });
        $(phoneFormGroup).append(phone);
        
        const success = $("<div>").attr("id", "success");
        $(quoteForm).append(success);

        const buttonsGroup = $("<div>").addClass("form-group row px-3");
        $(quoteForm).append(buttonsGroup);
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
      } else if (serviceType === "redesign") {
        console.log("quote: ", quote);
        const redesignGroup = $("<div>").addClass("control-group border-bottom");
        $(quoteForm).append(redesignGroup);
        const redesignQuestion = $("<p>").text("Do you want your whole website ");
        $(redesignGroup).append(redesignQuestion);
      } else {
        console.log("repair quote: ", quote);
      }
    });
  });
});
