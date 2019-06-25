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
        startIndex: 3,
        onStepChanging: function(event, currentIndex, newIndex) {
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
            console.log('ну привет');
            if (form.children("div").steps("getCurrentIndex") == 0) {
                $("body").css("background-color", "#fff");
            } else {
                $("body").css("background-color", "#F4F4F4");
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



    // js_checklist
    var goalList = $('.js_checklist');
    var countGoalList = $('.js_checklist li').length;
    var elems = $('.js_checklist li');
    console.log(countGoalList);
    $(".js_add_goal").on("click", function() {
        countGoalList++;
        goalList.append("<li>" +
            "<label>" +
            "Цель №<span>1</span>" +
            "<input type='text' placeholder='Введите сюда свою цель''>" +
            "<span class='delete_btn js_delete_btn'></span>" +
            "</label>" +
            "</li>"
        );
        iconRemove();
        NumberingList();
    });
    iconRemove();

    function iconRemove() {
        $(".js_delete_btn").click(function() {
            $(this).closest('li').remove();

            NumberingList();
        });
    }

    function NumberingList() {
        $(goalList).each(function() {
            $('li', this).each(function(i) {
                $(this).find('label span:first-of-type').text(i + 1);
            })
        })
    }

});
