$(document).ready(function() {
    var form = $("#steps_form");
    form.validate({
        errorPlacement: function errorPlacement(error, element) {
            element.before(error);
        },
        rules: {
            confirm: {
                equalTo: "#password"
            }
        }
    });
    form.children("div").steps({
        headerTag: "h3",
        titleTemplate: "<span class='number'>#index#</span>",
        bodyTag: "section",
        showBackButton: false,
        enablePagination: false,
        saveState: true,
        startIndex: 2,
        onStepChanging: function(event, currentIndex, newIndex) {
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
            console.log('ну привет');
            if (form.children("div").steps("getCurrentIndex") == 0) {
                $("body").css("background-color","#fff");
            } else {
                $("body").css("background-color","#F4F4F4");
            }
        },
        onFinishing: function(event, currentIndex) {
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: function(event, currentIndex) {
            alert("Submitted!");
        }
    });

    $(document).delegate('.js-next-step-btn', 'click', function() {
        form.children("div").steps("next");
    });
});
