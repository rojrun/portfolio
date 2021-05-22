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
    value: ""
  });
  $(divFormGroup).append(inputProjectName);

  $("input#projectName").on("change", function() {
    const serviceTypes = [
      {
        id: "build",
        text: "Build a website for your project",
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
    console.log("quote: ", quote);

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
        class: "custom-control-input"
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
      const serviceType = $("input[name=serviceType]:checked").val();
      if ((serviceType === "redesign") || (serviceType === "repair")) {
        console.log("service type: ", serviceType);
      } else {
        const appTypes = [
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

        const appTypeGroup = $("<div>").addClass("control-group border-bottom");
        $(quoteForm).append(appTypeGroup);
        const appTypeQuestion = $("<p>").text("What type of website is your project?");
        $(appTypeGroup).append(appTypeQuestion);

        for (let appIndex = 0; appIndex < appTypes.length; appIndex++) {
          const appDiv = $("<div>").addClass("custom-control custom-radio");
          $(appTypeGroup).append(appDiv);

          const appInput = $("<input>").attr({
            type: "radio",
            id: appTypes[appIndex].id,
            value: appTypes[appIndex].id,
            name: "appType",
            class: "custom-control-input"
          });
          $(appDiv).append(appInput);

          const appLabel = $("<label>").attr({
            class: "custom-control-label",
            style: "opacity: 1",
            for:  appTypes[appIndex].id
          }).text( appTypes[appIndex].text);
          $(appDiv).append(appLabel);
        }

        $("input[name=appType]").on("click", function() {
          const pageTypes = [
            {
              id: "aboutPage",
              text: "About page"
            },
            {
              id: "blogPage",
              text: "Blog page"
            },
            {
              id: "contactPage",
              text: "Contact page"
            },
            {
              id: "faqPage",
              text: "FAQ page"
            },
            {
              id: "homePage",
              text: "Homepage"
            },
            {
              id: "landingPage",
              text: "Landing page"
            },
            {
              id: "pageNotFoundPage",
              text: "Page not found page"
            },
            {
              id: "pressPage",
              text: "Press page"
            },
            {
              id: "privacyPolicyPage",
              text: "Privacy policy page"
            },
            {
              id: "productsPage",
              text: "Products page"
            },
            {
              id: "reviewsPage",
              text: "Reviews page"
            },
            {
              id: "searchResultPage",
              text: "Search result page"
            },
            {
              id: "servicesPage",
              text: "Services page"
            },
            {
              id: "sitemapPage",
              text: "Sitemap page"
            },
            {
              id: "termsAndConditionsPage",
              text: "Terms and conditions page"
            },
            {
              id: "testimonialsPage",
              text: "Testimonials page"
            },
            {
              id: "otherPage",
              text: "Other "
            }
          ];

          console.log("app type: ", $("input[name=appType]:checked").val());
          const pageContentGroup = $("<div>").addClass("control-group border-bottom");
          $(quoteForm).append(pageContentGroup);
          const pageContentQuestion = $("<p>").text("What pages do you want to display? Select all that apply:");
          $(pageContentGroup).append(pageContentQuestion);

          for (let pageIndex = 0; pageIndex < pageTypes.length; pageIndex++) {
            var pageDiv = $("<div>").addClass("form-check form-check-inine");
            $(pageContentGroup).append(pageDiv);

            const pageInput = $("<input>").attr({
              type: "checkbox",
              id: pageTypes[pageIndex].id,
              value: pageTypes[pageIndex].id,
              name: "pages",
              class: "form-check-input"
            });
            $(pageDiv).append(pageInput);

            const pageLabel = $("<label>").attr({
              class: "form-check-label",
              style: "opacity: 1",
              for: pageTypes[pageIndex].id,
              id: pageTypes[pageIndex].id
            }).text(pageTypes[pageIndex].text);
            $(pageDiv).append(pageLabel);
          }

          $("input#otherPage[name=pages]").on("click", function() {
            const otherPageInput = $("<input>").attr({
              class: "form-control text-secondary",
              name: "pages",
              id: "otherPageInput",
              type: "text",
              placeholder: "Add page",
              value: ""
            }).on("change", function() {
              console.log("other: ", $("input#otherPageInput").val());
            }).blur(function() {
              const addAnotherInputButton = $("<input>").text("Add another page").attr({
                id: "addAnotherInput",
                type: "button",
                value: "Add another page"
              }).on("click", function() {
                console.log("add button clicked");
              });
              $("label#otherPage").append(addAnotherInputButton);
            });
            $(pageDiv).append(otherPageInput);
          });

          $("input[name=pages]").on("click", function() {
            // get values of clicked checkbox
          });
        });
      }
    });
  });
});
