$(function() {
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
    placeholder: "Project Name"
  });
  $(divFormGroup).append(inputProjectName);

  var divControlGroup2 = $("<div>").addClass("control-group");
  $(quoteForm).append(divControlGroup2);
  // var divFormGroup2 = $("<div>").addClass("form-group floating-label-form-group controls mb-0 pb-2");
  // var divFormGroup2 = $("<div>").addClass("form-group controls mb-0 pb-2");
  // $(divControlGroup2).append(divFormGroup2);
  var serviceTypeQuestion = $("<p>").text("What type of service do you need?");
  $(divControlGroup2).append(serviceTypeQuestion);

  var divCustomRadio1 = $("<div>").addClass("custom-control custom-radio");
  $(divControlGroup2).append(divCustomRadio1);
  var inputRadio1 = $("<input>").attr({
    type: "radio",
    id: "build",
    value: "build",
    name: "serviceType",
    class: "custom-control-input"
  });
  $(divCustomRadio1).append(inputRadio1);
  var labelRadio1 = $("<label>").attr({
    class: "custom-control-label",
    style: "opacity: 1",
    for: "build"
  }).text("Build a website for your project");
  $(divCustomRadio1).append(labelRadio1);
  
  var divCustomRadio2 = $("<div>").addClass("custom-control custom-radio");
  $(divControlGroup2).append(divCustomRadio2);
  var inputRadio2 = $("<input>").attr({
    type: "radio",
    id: "redesign",
    value: "redesign",
    name: "serviceType",
    class: "custom-control-input"
  });
  $(divCustomRadio2).append(inputRadio2);
  var labelRadio2 = $("<label>").attr({
    class: "custom-control-label",
    style: "opacity: 1",
    for: "redesign"
  }).text("Redesign your current website");
  $(divCustomRadio2).append(labelRadio2);

  var divCustomRadio3 = $("<div>").addClass("custom-control custom-radio");
  $(divControlGroup2).append(divCustomRadio3);
  var inputRadio3 = $("<input>").attr({
    type: "radio",
    id: "repair",
    value: "repair",
    name: "serviceType",
    class: "custom-control-input"
  });
  $(divCustomRadio3).append(inputRadio3);
  var labelRadio3 = $("<label>").attr({
    class: "custom-control-label",
    style: "opacity: 1",
    for: "repair"
  }).text("Repair your current website");
  $(divCustomRadio3).append(labelRadio3);

  $("input[type=radio]").click(function() {
    // console.log("clicked: ", $("input[type=radio][name=serviceType]:checked").attr("value"));
    var serviceType = $("input[name=serviceType]:checked").val();
    console.log("service type: ", serviceType);
    if (serviceType === "build") {
      var appTypeGroup = $("<div>").addClass("control-group");
      $(quoteForm).append(appTypeGroup);
      var appTypeQuestion = $("<p>").text("What type of app would you like for your project?");
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
      }).text("Authority app: company, porfolio");
      $(authorityDiv).append(authorityLabel);

      var ecommerceDiv = $("<div>").addClass("custom-control custom-radio");
      $(appTypeGroup).append(ecommerceDiv);
      var ecommerceInputRadio = $("<input>").attr({
        type: "radio",
        id: "ecommerce",
        value: "ecommerce",
        name: "appType",
        class: "custom-control-input"
      });
      $(ecommerceDiv).append(ecommerceInputRadio);
      var ecommerceLabel = $("<label>").attr({
        class: "custom-control-label",
        style: "opacity: 1",
        for: "ecommerce"
      }).text("E-commmerce");
      $(ecommerceDiv).append(ecommerceLabel);
    }
  });

});
