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
        startIndex: 0,
        transitionEffect: "slideLeft",
        // forceMoveForward: true,
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
    $(document).delegate('.js-finish-step-btn', 'click', function() {
        form.children("div").steps("finish");
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
        ifMoreFive();
    });
    iconRemove();

    function iconRemove() {
        $(".js_delete_btn").click(function() {
            $(this).closest('li').remove();

            NumberingList();
            ifMoreFive();
        });
    }

    function NumberingList() {
        $(goalList).each(function() {
            $('li', this).each(function(i) {
                $(this).find('label span:first-of-type').text(i + 1);
            })
        })
    }

    function ifMoreFive() {
        countGoalList = $('.js_checklist li').length;
        if (countGoalList >= 5) {
            $(".js_add_goal").hide();
        } else {
            $(".js_add_goal").show();
        }
    }


    // js select choose_tags
    var selectWrapp = $('.js_select_tags');
    var selectItems = $('.js_select_tags li');
    var selectedWrapp = $('.js_selected_tags');
    var selectedItems = $('.js_selected_tags li');

    $(selectItems).on("click", function() {
        $(this).addClass('selected').append("<span class='close'>X</span>");
        var $this = $(this);
        var $thisHtml = $(this).clone();

        if (selectedWrapp.find('.empty').length !== 0) {
            selectedWrapp.find('.empty:first').before($thisHtml).remove('.empty:first');
        } else {
            selectedWrapp.find('ul').append($thisHtml);
        }

        CheckSaveBtn();
    });

    function CheckSaveBtn() {
        if (selectedWrapp.find('.selected').length >= 3) {
            $('.save_btn').removeClass('disable');
        } else {
            $('.save_btn').addClass('disable');
        }
    }

    function removeSelectedTag() {
        $(document).on("click", "span.close" , function() {
            console.log('был клик');
            var parent = $(this).parent();
            // selectWrapp.find(parent).removeClass('selected');
            // console.log();
            parent.remove();

            CheckSaveBtn();
        });
    }
    removeSelectedTag();
});
