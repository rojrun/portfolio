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
  var pages = {
    type: [], price: 1500
  };
  var functions = {
    type: [], price: 3000
  };
  var estimateTotal = 0;

  var divRow = $("<div>").addClass("row");
  $("#quote .container").append(divRow);
  var divCol = $("<div>").addClass("col-lg-12 col-xl-12 mx-auto");
  $(divRow).append(divCol);
  var quoteForm = $("<form>").attr({
    action: "js/quote.js", 
    name: "quoteForm",
    id: "quoteForm",
    novalidate: "novalidate",
    method: "post",
    enctype: "text/plain"
  });
  $(divCol).append(quoteForm);

  var divControlGroup = $("<div>").addClass("control-group");
  $(quoteForm).append(divControlGroup);
  var divFormGroup = $("<div>").addClass("form-group floating-label-form-group controls mb-0 pb-2");
  $(divControlGroup).append(divFormGroup);
  var inputProjectName = $("<input>").attr({
    class: "form-control text-primary",
    name: "projectName",
    id: "projectName",
    type: "text",
    placeholder: "Project Name",
    value: ""
  });
  $(divFormGroup).append(inputProjectName);
  $("input#projectName").on("change", function() {
    quote.projectName = $("input#projectName").val();
    console.log("quote: ", quote);

    var serviceTypeControlGroup = $("<div>").addClass("control-group");
    $(quoteForm).append(serviceTypeControlGroup);
    // var divFormGroup2 = $("<div>").addClass("form-group floating-label-form-group controls mb-0 pb-2");
    // var divFormGroup2 = $("<div>").addClass("form-group controls mb-0 pb-2");
    // $(divControlGroup2).append(divFormGroup2);
    var serviceTypeQuestion = $("<p>").text("What type of service do you need?");
    $(serviceTypeControlGroup).append(serviceTypeQuestion);

    var buildDiv = $("<div>").addClass("custom-control custom-radio");
    $(serviceTypeControlGroup).append(buildDiv);
    var buildInputRadio = $("<input>").attr({
      type: "radio",
      id: "build",
      value: "build",
      name: "serviceType",
      class: "custom-control-input"
    });
    $(buildDiv).append(buildInputRadio);
    var buildLabelRadio = $("<label>").attr({
      class: "custom-control-label",
      style: "opacity: 1",
      for: "build"
    }).text("Build a website for your project");
    $(buildDiv).append(buildLabelRadio);
    
    var redesignDiv = $("<div>").addClass("custom-control custom-radio");
    $(serviceTypeControlGroup).append(redesignDiv);
    var redesignInputRadio = $("<input>").attr({
      type: "radio",
      id: "redesign",
      value: "redesign",
      name: "serviceType",
      class: "custom-control-input"
    });
    $(redesignDiv).append(redesignInputRadio);
    var redesignLabelRadio = $("<label>").attr({
      class: "custom-control-label",
      style: "opacity: 1",
      for: "redesign"
    }).text("Redesign your current website");
    $(redesignDiv).append(redesignLabelRadio);

    var repairDiv = $("<div>").addClass("custom-control custom-radio");
    $(serviceTypeControlGroup).append(repairDiv);
    var repairInputRadio = $("<input>").attr({
      type: "radio",
      id: "repair",
      value: "repair",
      name: "serviceType",
      class: "custom-control-input"
    });
    $(repairDiv).append(repairInputRadio);
    var repairLabelRadio = $("<label>").attr({
      class: "custom-control-label",
      style: "opacity: 1",
      for: "repair"
    }).text("Repair your current website");
    $(repairDiv).append(repairLabelRadio);
    
    $("input[name=serviceType]").on("click", function() {
      var serviceType = $("input[name=serviceType]:checked").val();
      if ((serviceType === "redesign") || (serviceType === "repair")) {
        console.log("service type: ", serviceType);
      } else {
        var appTypeGroup = $("<div>").addClass("control-group");
        $(quoteForm).append(appTypeGroup);
        var appTypeQuestion = $("<p>").text("What type of website is your project?");
        $(appTypeGroup).append(appTypeQuestion);

        var authorityDiv = $("<div>").addClass("custom-control custom-radio");
        $(appTypeGroup).append(authorityDiv);
        var authorityInputRadio = $("<input>").attr({
          type: "radio",
          id: "authority",
          value: "authority",
          name: "appType",
          class: "custom-control-input"
        });
        $(authorityDiv).append(authorityInputRadio);
        var authorityLabel = $("<label>").attr({
          class: "custom-control-label",
          style: "opacity: 1",
          for: "authority"
        }).text("Authority website: this is the place potential customers can go to see what work your company has done and how to get in contact with someone about your services");
        $(authorityDiv).append(authorityLabel);

        var leadGenDiv = $("<div>").addClass("custom-control custom-radio");
        $(appTypeGroup).append(leadGenDiv);
        var leadGenInputRadio = $("<input>").attr({
          type: "radio",
          id: "leadGen",
          value: "leadGeneration",
          name: "appType",
          class: "custom-control-input"
        });
        $(leadGenDiv).append(leadGenInputRadio);
        var leadGenLabel = $("<label>").attr({
          class: "custom-control-label",
          style: "opacity: 1",
          for: "leadGen"
        }).text("Lead-generation website: this site is focused on generating leads through its online presence");
        $(leadGenDiv).append(leadGenLabel);

        var salesDiv = $("<div>").addClass("custom-control custom-radio");
        $(appTypeGroup).append(salesDiv);
        var salesInputRadio = $("<input>").attr({
          type: "radio",
          id: "sales",
          value: "sales",
          name: "appType",
          class: "custom-control-input"
        });
        $(salesDiv).append(salesInputRadio);
        var salesLabel = $("<label>").attr({
          class: "custom-control-label",
          style: "opacity: 1",
          for: "sales"
        }).text("Sales website: sites that sell products or services through e-commerce");
        $(salesDiv).append(salesLabel);

        var utilityDiv = $("<div>").addClass("custom-control custom-radio");
        $(appTypeGroup).append(utilityDiv);
        var utilityInputRadio = $("<input>").attr({
          type: "radio",
          id: "utility",
          value: "utility",
          name: "appType",
          class: "custom-control-input"
        });
        $(utilityDiv).append(utilityInputRadio);
        var utilityLabel = $("<label>").attr({
          class: "custom-control-label",
          style: "opacity: 1",
          for: "utility"
        }).text("Utility website: companies whose business and website are one and the same");
        $(utilityDiv).append(utilityLabel);

        $("input[name=appType]").on("click", function() {
          console.log("app type: ", $("input[name=appType]:checked").val());
          var pageContentGroup = $("<div>").addClass("control-group");
          $(quoteForm).append(pageContentGroup);
          var pageContentQuestion = $("<p>").text("What pages do you want to display? Select all that apply:");
          $(pageContentGroup).append(pageContentQuestion);

          var homePageDiv = $("<div>").addClass("form-check form-check-inline");
          $(pageContentGroup).append(homePageDiv);
          var homePageInputCheckbox = $("<input>").attr({
            type: "checkbox",
            id: "homePage",
            value: "homePage",
            name: "pages",
            class: "form-check-input"
          });
          $(homePageDiv).append(homePageInputCheckbox);
          var homePageInputLabel = $("<label>").attr({
            class: "form-check-label",
            style: "opacity: 1",
            for: "homePage"
          }).text("Homepage");
          $(homePageDiv).append(homePageInputLabel);

          var aboutPageDiv = $("<div>").addClass("form-check form-check-inline");
          $(pageContentGroup).append(aboutPageDiv);
          var aboutPageInputCheckbox = $("<input>").attr({
            type: "checkbox",
            id: "aboutPage",
            value: "aboutPage",
            name: "pages",
            class: "form-check-input"
          });
          $(aboutPageDiv).append(aboutPageInputCheckbox);
          var aboutPageInputLabel = $("<label>").attr({
            class: "form-check-label",
            style: "opacity: 1",
            for: "aboutPage"
          }).text("About page");
          $(aboutPageDiv).append(aboutPageInputLabel);

          var productsPageDiv = $("<div>").addClass("form-check form-check-inline");
          $(pageContentGroup).append(productsPageDiv);
          var productsPageInputCheckbox = $("<input>").attr({
            type: "checkbox",
            id: "productsPage",
            value: "productsPage",
            name: "pages",
            class: "form-check-input"
          });
          $(productsPageDiv).append(productsPageInputCheckbox);
          var productsPageInputLabel = $("<label>").attr({
            class: "form-check-label",
            style: "opacity: 1",
            for: "productsPage"
          }).text("Products page");
          $(productsPageDiv).append(productsPageInputLabel);

          var servicesPageDiv = $("<div>").addClass("form-check form-check-inline");
          $(pageContentGroup).append(servicesPageDiv);
          var servicesPageInputCheckbox = $("<input>").attr({
            type: "checkbox",
            id: "servicesPage",
            value: "servicesPage",
            name: "pages",
            class: "form-check-input"
          });
          $(servicesPageDiv).append(servicesPageInputCheckbox);
          var servicesPageInputLabel = $("<label>").attr({
            class: "form-check-label",
            style: "opacity: 1",
            for: "servicesPage"
          }).text("Services page");
          $(servicesPageDiv).append(servicesPageInputLabel);

          var blogPageDiv = $("<div>").addClass("form-check form-check-inline");
          $(pageContentGroup).append(blogPageDiv);
          var blogPageInputCheckbox = $("<input>").attr({
            type: "checkbox",
            id: "blogsPage",
            value: "blogPage",
            name: "pages",
            class: "form-check-input"
          });
          $(blogPageDiv).append(blogPageInputCheckbox);
          var blogPageInputLabel = $("<label>").attr({
            class: "form-check-label",
            style: "opacity: 1",
            for: "blogPage"
          }).text("Blog page");
          $(blogPageDiv).append(blogPageInputLabel);

          var contactPageDiv = $("<div>").addClass("form-check form-check-inline");
          $(pageContentGroup).append(contactPageDiv);
          var contactPageInputCheckbox = $("<input>").attr({
            type: "checkbox",
            id: "contactPage",
            value: "contactPage",
            name: "pages",
            class: "form-check-input"
          });
          $(contactPageDiv).append(contactPageInputCheckbox);
          var contactPageInputLabel = $("<label>").attr({
            class: "form-check-label",
            style: "opacity: 1",
            for: "contactPage"
          }).text("Contact page");
          $(contactPageDiv).append(contactPageInputLabel);

          var faqPageDiv = $("<div>").addClass("form-check form-check-inline");
          $(pageContentGroup).append(faqPageDiv);
          var faqPageInputCheckbox = $("<input>").attr({
            type: "checkbox",
            id: "faqPage",
            value: "faqPage",
            name: "pages",
            class: "form-check-input"
          });
          $(faqPageDiv).append(faqPageInputCheckbox);
          var faqPageInputLabel = $("<label>").attr({
            class: "form-check-label",
            style: "opacity: 1",
            for: "faqPage"
          }).text("FAQ page");
          $(faqPageDiv).append(faqPageInputLabel);

          var testimonialsPageDiv = $("<div>").addClass("form-check form-check-inline");
          $(pageContentGroup).append(testimonialsPageDiv);
          var testimonialsPageInputCheckbox = $("<input>").attr({
            type: "checkbox",
            id: "testimonialsPage",
            value: "testimonialsPage",
            name: "pages",
            class: "form-check-input"
          });
          $(testimonialsPageDiv).append(testimonialsPageInputCheckbox);
          var testimonialsPageInputLabel = $("<label>").attr({
            class: "form-check-label",
            style: "opacity: 1",
            for: "testimonialsPage"
          }).text("Testimonials page");
          $(testimonialsPageDiv).append(testimonialsPageInputLabel);

          var reviewsPageDiv = $("<div>").addClass("form-check form-check-inline");
          $(pageContentGroup).append(reviewsPageDiv);
          var reviewsPageInputCheckbox = $("<input>").attr({
            type: "checkbox",
            id: "reviewsPage",
            value: "reviewsPage",
            name: "pages",
            class: "form-check-input"
          });
          $(reviewsPageDiv).append(reviewsPageInputCheckbox);
          var reviewsPageInputLabel = $("<label>").attr({
            class: "form-check-label",
            style: "opacity: 1",
            for: "reviewsPage"
          }).text("Reviews page");
          $(reviewsPageDiv).append(reviewsPageInputLabel);

          var pressPageDiv = $("<div>").addClass("form-check form-check-inline");
          $(pageContentGroup).append(pressPageDiv);
          var pressPageInputCheckbox = $("<input>").attr({
            type: "checkbox",
            id: "pressPage",
            value: "pressPage",
            name: "pages",
            class: "form-check-input"
          });
          $(pressPageDiv).append(pressPageInputCheckbox);
          var pressPageInputLabel = $("<label>").attr({
            class: "form-check-label",
            style: "opacity: 1",
            for: "pressPage"
          }).text("Press page");
          $(pressPageDiv).append(pressPageInputLabel);

          var privacyPolicyPageDiv = $("<div>").addClass("form-check form-check-inline");
          $(pageContentGroup).append(privacyPolicyPageDiv);
          var privacyPolicyPageInputCheckbox = $("<input>").attr({
            type: "checkbox",
            id: "privacyPolicyPage",
            value: "privacyPolicyPage",
            name: "pages",
            class: "form-check-input"
          });
          $(privacyPolicyPageDiv).append(privacyPolicyPageInputCheckbox);
          var privacyPolicyPageInputLabel = $("<label>").attr({
            class: "form-check-label",
            style: "opacity: 1",
            for: "privacyPolicyPage"
          }).text("Privacy policy page");
          $(privacyPolicyPageDiv).append(privacyPolicyPageInputLabel);

          var termConditionsPageDiv = $("<div>").addClass("form-check form-check-inline");
          $(pageContentGroup).append(termConditionsPageDiv);
          var termConditionsPageInputCheckbox = $("<input>").attr({
            type: "checkbox",
            id: "termConditionsPage",
            value: "termConditionsPage",
            name: "pages",
            class: "form-check-input"
          });
          $(termConditionsPageDiv).append(termConditionsPageInputCheckbox);
          var termConditionsPageInputLabel = $("<label>").attr({
            class: "form-check-label",
            style: "opacity: 1",
            for: "termConditionsPage"
          }).text("Terms and conditions page");
          $(termConditionsPageDiv).append(termConditionsPageInputLabel);

          var sitemapPageDiv = $("<div>").addClass("form-check form-check-inline");
          $(pageContentGroup).append(sitemapPageDiv);
          var sitemapPageInputCheckbox = $("<input>").attr({
            type: "checkbox",
            id: "sitemapPage",
            value: "sitemapPage",
            name: "pages",
            class: "form-check-input"
          });
          $(sitemapPageDiv).append(sitemapPageInputCheckbox);
          var sitemapPageInputLabel = $("<label>").attr({
            class: "form-check-label",
            style: "opacity: 1",
            for: "sitemapPage"
          }).text("Sitemap page");
          $(sitemapPageDiv).append(sitemapPageInputLabel);

          var pageNotFoundPageDiv = $("<div>").addClass("form-check form-check-inline");
          $(pageContentGroup).append(pageNotFoundPageDiv);
          var pageNotFoundPageInputCheckbox = $("<input>").attr({
            type: "checkbox",
            id: "pageNotFoundPage",
            value: "pageNotFoundPage",
            name: "pages",
            class: "form-check-input"
          });
          $(pageNotFoundPageDiv).append(pageNotFoundPageInputCheckbox);
          var pageNotFoundPageInputLabel = $("<label>").attr({
            class: "form-check-label",
            style: "opacity: 1",
            for: "pageNotFoundPage"
          }).text("Page not found page");
          $(pageNotFoundPageDiv).append(pageNotFoundPageInputLabel);

          var searchResultPageDiv = $("<div>").addClass("form-check form-check-inline");
          $(pageContentGroup).append(searchResultPageDiv);
          var searchResultPageInputCheckbox = $("<input>").attr({
            type: "checkbox",
            id: "searchResultPage",
            value: "searchResultPage",
            name: "pages",
            class: "form-check-input"
          });
          $(searchResultPageDiv).append(searchResultPageInputCheckbox);
          var searchResultPageInputLabel = $("<label>").attr({
            class: "form-check-label",
            style: "opacity: 1",
            for: "searchResultPage"
          }).text("Search result page");
          $(searchResultPageDiv).append(searchResultPageInputLabel);

          var otherPageDiv = $("<div>").addClass("form-check form-check-inline");
          $(pageContentGroup).append(otherPageDiv);
          var otherPageInputCheckbox = $("<input>").attr({
            type: "checkbox",
            id: "otherPage",
            value: "otherPage",
            name: "pages",
            class: "form-check-input"
          });
          $(otherPageDiv).append(otherPageInputCheckbox);
          var otherPageInputLabel = $("<label>").attr({
            class: "form-check-label",
            style: "opacity: 1",
            for: "otherPage"
          }).text("Other").append("&nbsp;");
          $(otherPageDiv).append(otherPageInputLabel);

          $("input#otherPage[name=pages]").on("click", function() {
            var otherPageInput = $("<input>").attr({
              class: "form-control text-secondary",
              name: "pages",
              id: "otherPageInput",
              type: "text",
              placeholder: "Add page",
              value: ""
            });
            $(otherPageDiv).append(otherPageInput);
          });

          $("input#otherPageInput[type=text]").on("change", function() {
            console.log("other: ", $("input#otherPageInput").val());
          });
          
          $("input[name=pages]").on("click", function() {
            
          });
        });
      }
    });
  });
});
