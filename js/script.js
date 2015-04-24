var paused,
    music;

$(document).ready(function() {

    var win = $(window),
        doc = $(document),
        allowed = true, // to prevent multi keydown
        body = $('body'),
        keyboard = $('.keyboard'),
        button = $('.keyboard button'),
        sound = $('.keyboard audio');
    paused = false;   

    doc.keydown(function(e) {

        if (!allowed) return;
        allowed = false;

        button.each(function() {

            var keyBtn = $(this).data('keycode');
            var idIcon = $(this).data('icon');
 
            if (e.keyCode == keyBtn) {
                $(this).addClass('active');
                $(".keyboard audio[data-sound='" + idIcon + "']").trigger('play');
                if (e.keyCode == "32") {
                    e.preventDefault();
                    toggleMusic();
                } else { 
                    updatePanel($(this));
                }
            }

        });

    });

    doc.keyup(function(e) {
        allowed = true;
        button.removeClass('active');
    });

    doc.focus(function(e) {
        allowed = true;
        button.removeClass('active');
    });

    button.on('mousedown', function() {

        var idIcon = $(this).data('icon');
        $(".keyboard audio[data-sound='" + idIcon + "']").trigger('play');

        if (idIcon == "30") {
            toggleMusic();
        } else {
            updatePanel($(this));
        }


    });

});

function toggleMusic() {
    music = $('audio[data-sound="30"]');
    if (paused === true) {
        music.trigger('pause');
        paused = false;
    } else {
        music.trigger('play');
        paused = true;
    }
}

function updatePanel(btnPressed) {
    $('.panel span').text(btnPressed.data('name'));
}
