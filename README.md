##Welcome to zenmode.js!

###Make sure to check out the [Official Website of zenmode.js](http://zenmodejs.tophathacker.com) for code examples and details!
Are you overwhelmed by your design environment? Do you wish you could focus on one thing at a time on your website?

I'm here to introduce zenmode.js, a very simple jQuery plugin that allows you to go to a *Zen* state with any HTML Element. Make sure to go to the [website](http://zenmodejs.tophathacker.com) for code examples and a better description, I'll do my best to explain it here. With jQuery being the only hard dependency, zenmode.js can be added quickly to any website. While using your normal selector syntax, you can call toggleZen() to use the default values and toggle the *Zen* mode from anywhere in your application. You can use goZen() to start a *Zen* session on an element, and unZen() to turn it off. You can always check the *Zen* state of a tag with the function checkZen();

For now, zenmode.js has two parameters that you can pass in with toggleZen() or goZen() and those are **options**, and **callback**. The Options are just like they sound... **options** to further configure your *Zen* experience.
  
The **callback** parameter is a function that get's called when the goZen() or unZen() functions are called. There is a third parameter however, that I didn't mention. That's the second callback for the toggleZen() function that you can pass in when you want different callback functions for goZen() and unZen(). This can be useful when you want other things to go on when you go in and out of zen mode. Maybe you want to save the page you're working on? Maybe you want to load a high res image, and go back to thumbnail view when you leave *Zen* mode? The possibilities are endless!
  
You can pass in a few different options to configure your *Zen* session. Here are the default values for the options, I'll explain these further, later on in the code examples.

zenmode.js has a bit of baked in CSS ... the reset, fullscreen, tempcss, and overlay are all css objects. If you're handy, you'll be able to style these yourself .. I'll explain them more as the plugin matures.
```javascript
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
``` 
It's probably not a bad idea to style the CSS yourself for a more advanced webpage, I can't be held responsible when zenmode.js breaks your site! That being said, this CSS should be simple enough that it fits into most existing sites. It fits right in with bootstrap, so no worries there.

Now for these code examples, I'm going to assume you have $ mapped to jQuery, and that you have jQuery loaded before calling any zenmode.js function.

Here's the three most basic function calls
```javascript
$('#mybox').goZen();
$('body').find('div').find('textarea').unZen();
$('#input-form').toggleZen();
```
As shown above, you can use any jQuery selector method. The first is going *Zen* on an Element with id = mybox, the second is traversing down to find a text area inside of the body and telling it to leave *Zen* mode, and the third is the toggleZen() function.

Here's another example, but now we're passing in an options object with a few attributes:
```javascript
$('#mybox').goZen({config:{fullscreen:false});
$('#myBox').unZen({},function(){alert('leaving zen mode');});
$('#myBox').toggleZen({},function(){alert('now in zen mode');},endofzen);
```

Now in this example the first goZen() call goes into *Zen* mode, and the fullscreen false tells goZen() not to go fullscreen, but to stay in place. The second example doesn't pass in any options but does create a callback function in line. This call will create an alert box when you leave *Zen* mode and the animations are done. The third example toggleZen() passes in the created function for goZen() that shows an alert and a predefined function called endofzen for the unZen() function.

I Might add more examples later, but for now check out [The Site](http://zenmodejs.tophathacker.com) for more examples and a bunch of functioning *Zen* modes!

There's also a [Gist](https://gist.github.com/tophathacker/5202452) that has some more code examples that'll be including in the website soon.
