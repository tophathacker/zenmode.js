/*
*   zenmode.js library created by Ryan Hatfield
*
*   Give credit where credit is due, otherwise use as needed.
*   Initial version 0.1
*
*   Simple library for jQuery that allows any (testing required) HTML 
*    Element to go full screen. Customizable and will easily fit any
*    of your needs, just depends on how much work you want to put in.
*    It should work for most applications out of the box. Enjoy!
*
*
*/

(function($){
    $.fn.extend({ 
        goZen: function(options,callback) {
            var obj = $(this);
            //make sure it's not already in zen mode
            if (obj.checkZen())
                return;
            var defaultoptions = {
                reset: {
                    top:'',
                    left:'',
                    width:'',
                    height:'',
                    position:'',
                    'margin':'',
                    'background-color':'',
                    'overflow':''                    
                },
                fullscreen: {
                    top: 20,
                    left: 20,
                    width:$(window).width() - 40,
                    height:$(window).height() - 60
                },
                tempcss: {

                    top: 0,
                    left: 0,
                    position: 'fixed',
                    width: obj.width(),
                    height: obj.height(),
                    margin: 0
                },
                overlay: {
                    position:'fixed',
                    top:0,
                    left:0,
                    width:$(window).width(),
                    height:$(window).height(),
                    'background-color':'white',
                    display:'none'
                },
                config: {
                    fullscreen: true,
                    animateoff: false,
                    overlayfade: true,
                    registerevent: '',
                    autozen: false
                }
            };
            
            if(options)
                $.each(options,function(index,value){
                    options[index] = $.extend(defaultoptions[index], options[index]);
                });
            options = $.extend(defaultoptions,options);

            var tempcss = options.tempcss;
            //make sure to set top and left for scroll bars
            var offset = obj.offset();
            tempcss.top = offset.top - $(window).scrollTop();
            tempcss.left = offset.left - $(window).scrollLeft();
            obj.data('tempcss',tempcss);
            obj.data('resetcss',options.reset);
            obj.before("<div id='zen-overlay'></div>");
            var overlay = $('#zen-overlay');
            overlay.css(options.overlay); 
            obj.addClass('zen-mode');
            obj.css(tempcss);
            if(options.config.overlayfade == true)
                overlay.fadeIn(function(){handleAnimation();});
            else
                overlay.show(function(){handleAnimation();});

            var handleAnimation = function(){
                obj.css(tempcss);
                if(options.config.fullscreen == true)
                    if(options.config.animateoff != true){
                        obj.animate(options.fullscreen,function(){
                            //run callback if it's valid
                            if(typeof callback == 'function')
                                callback();
                            //only apply to first
                            return this;
                        });
                    }
                    else{
                        obj.css(options.fullscreen);
                        //run callback if it's valid
                        if(typeof callback == 'function')
                            callback();
                        //only apply to first
                        return this;
                    }
            };
        },

        ooohhhmmm: function(options,callback){
            //simply put.
            return toggleZen(options,replacementcss,callback);
        },

        checkZen: function(){
            return $(this).hasClass('zen-mode');
        },

        toggleZen: function(options,callback1,callback2) {
            if($(this).hasClass('zen-mode'))
                return $(this).unZen(options,callback2);
            else
                return $(this).goZen(options,callback1);
        },

        unZen: function(options,callback) {
            var obj = $(this);
            if(obj.hasClass('zen-mode'))
              {
                obj.removeClass('zen-mode')
                obj.animate(obj.data('tempcss'),function(){
                    if(obj.data('resetcss'))obj.css(obj.data('resetcss'));
                  $('#zen-overlay').fadeOut(function(){
                    obj.removeClass('zen-mode');
                    if(obj.data('tempcss'))obj.data('tempcss','');
                    if(obj.data('resetcss'))obj.data('resetcss','');
                    $('#zen-overlay').remove();

                    //run callback if it's valid
                    if(typeof callback == 'function')
                        callback();
                    return this;
                  });
                });
              }
        },

        setupZenEvents: function(){
            //this this is the value passed in
            $('[data-zenoptions]').each(function(){
                //this this is the Element
                var obj = $(this);
                var options = obj.data('zenoptions');
                $.each(options, function(index,value){
                    switch(index)
                    {
                        case 'config':
                            if(value.hasOwnProperty('registerevent'))
                                obj.on(value.registerevent,function(){
                                    $(this).toggleZen(options);
                                });
                            if(value.hasOwnProperty('autozen'))
                                $(this).toggleZen(options);
                            break;
                    }
                });
                $(this).on()
            });
        }
    });

    $(window).resize(function(){
            console.log('resize zen');
        $('.zen-mode').each(function(){
            $(this).css({width:$(window).width()-40,height:$(window).height()-60});
        });
    });
})(jQuery);