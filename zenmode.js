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
            //make sure it's not already in zen mode
            if ($(this).checkZen())
                return;
            //look for zen modes in place.. and if there are any, take them out and 
            //Settings list and the default values
            var defaultoptions = {
                animate : false,
                dark : false,
                fullscreen : true,
                background : '',
                dblclick : false,
                nocss : false
            };

            var defaultcss = {
                'zen-mode':{
                    'background-color':'white',
                    'position': 'absolute'
                },
                'zen-fullscreen':{
                    'top': '0',
                    'left': '0',
                    'height':'80%',
                    'width':'90%',
                    'margin':'5%'
                },
                'zen-background':{
                    'background-color':'white',
                    'position':'absolute',
                    'top':'0',
                    'left':'0',
                    'height':'100%',
                    'width':'100%'
                }
            };
            options = $.extend(defaultoptions, options);
            var stylesheet = '<style type="text/css" id="zenstyle">'
            $.each(defaultcss, function(classname,classarray){
                stylesheet += '\n.' + classname + '{';
                $.each(classarray, function(tag,value){
                    stylesheet += '\n' + tag + ':' + value + ';';
                });
                stylesheet += '\n}';
            });
            stylesheet += '</style>';

            //make sure there is no style already
            if($('#zenstyle').length != 0)
                $('#zenstyle').remove();
            //make sure they want css then output the stylesheet
            if(!options.nocss)
                $('head').append(stylesheet);
            //add background div
            if($('.zen-background').length == 0)
                $('body').prepend('<div class="zen-background"></div>');

            //add zen classes
            var zenclasses = 'zen-mode';
            if(options.dark == true) zenclasses += ' zen-dark';
            if(options.fullscreen == true) zenclasses += ' zen-fullscreen';

            $(this).addClass(zenclasses);

            //do all the dblclick jazz
            if(options.dblclick) $(this).on('dblclick',function(){
                $(this).unZen();
            });

            //make sure callback is valid
            if(typeof callback == 'function')
                callback();

            //only apply to first
            return this;
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
            //get rid of the zen style? might not need to do this.
            // should get rid of it in case it messes with someone's css
            if($('#zenstyle').length != 0)
                $('#zenstyle').remove();
            //get rid of the background div
            if($('.zen-background').length != 0)
                $('.zen-background').remove();

            //get rid of the class, could use $('.zen-mode') .. I'll do some testing
            $('.zen-mode').removeClass('zen-mode zen-dark zen-fullscreen zen-animate');

            //run callback if it's valid
            if(typeof callback == 'function')
                callback();
            return this;
        }
    });
    //for each Element in the DOM that has the auto-toggle-zen class,
    // add a simple toggle event. I'll flush this out later
    $('.auto-toggle-zen').on('dblclick', function(){
        document.getSelection().removeAllRanges();
        $(this).toggleZen($(this).data('options'),function(){},function(){});
    });
    $('.auto-toggle-zen').each(function(i,obj){
        if($(obj).data('autozen'))
        {
            var options = {};
            if($(obj).data('options'))
                options = $(obj).data('options');
            $(obj).toggleZen(options);
        }
    });
})(jQuery);