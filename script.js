/**
 * HTML5 gradient generator
 *
 * @version 1.4.1
 * @license GNU Lesser General Public License, http://www.gnu.org/copyleft/lesser.html
 * @author  David Norminton http://davenorm.me
 * @created 05-01-2017
 * @updated 29-03-2017
 * @link    http://davenorm.me
 */
/*jslint browser:true */


/*
@object supports - detect if browser supports gradients and if it does which
                   if any vendor prefix to use.
*/
var supports = {};

// store vendor prefix detected
supports.prefix = '';

/*
@method bool - determine if gradients are avaialble and which vendor prefix
             - sets prefix if found
@return bool true or false
*/  
supports.bool = function() {

    // create an invisible elemenet for testing
    var el = document.createElement('div');
    
    // set an id to div so it can be referenced
    el.setAttribute('id', 'support');
    
    // supports or not
    var bool = false,
    
        // array of possible vendor prefixes
        vendors = ['-ms-', '-o-', '-moz-', '-webkit-'],
        
        // css property to try
        property = 'linear-gradient',
        
        // initialiser
        i = 0, 
        
        l = vendors.length;

    for ( ; i < l; i++ ) {
    
        if ( vendors.hasOwnProperty(i)) {
        
            el.style.background = vendors[i] + property + '(black, white)';
            bool = el.style.background.indexOf(vendors[i] + property) > -1; 

            if( bool ) {

                this.prefix = ( i === 4 ) ? 'w3' : vendors[i];

            }
        }    
    }

    return bool;
};

/*
@namespace props - stores and sets css properties 
*/
var props = {

    //colors
    colors : {
         //first color selected
         color1 : {
             color: '#f70202',
             stop : 0
              },
        //second color selected
        color2 : {
             color : '#fab707',
             stop : 100
             }
        },                 
    // angle of linear gradient
    angle : 0,

    // tyoe of gradient - linear or radial
    type : 'linear',

    //css property
    BACK : 'background-image',

    // line break
    BR : '<br />',

    // preview box
    preview : 'gradient_div',

    // CSS output box
    output : 'output_css',
    
    // prefix to use defult w3 standard
    prefix : 'w3',
    
    // possible radial gradient positions
    radPos : ['left top', 'center top', 'right top', 'left center',  'center',
              'right center', 'left bottom', 'center bottom', 'right bottom'],
    
    // possible linear gradient directions ( used instead of angle )
    linDir : ['top left', 'top', 'top right', 'left',
              'right', 'bottom right', 'bottom', 'bottom left']          
};
/*
@method supports - detect if supports object is available
@return bool 
  */
props.supports = function() {
    return ( typeof supports === 'object' );   
};
  
/*
@method supported - Detect if gradients supported by browser
@return bool
*/
props.supported = function() {
    return ( props.supports() ) ? supports.bool() : false;  
};
  
/*
@method prefix - detected prefix to use on gradient preview box
@return if true set prefix else return false
*/
props.detectPrefix = function() {

    if ( supports.prefix ) {
    
        props.prefix = supports.prefix;
        
    } 
    
    return ( props.supported() ) ? supports.prefix : false;
    
};

/*
@method runBrowserCheck - detect if the browser supports gradients
@return the vendor prefix to use if true or return false
*/
props.runBrowserCheck = function() {
    return ( props.supports() && props.supported() ) ? props.detectPrefix() : false;
}

/*
@method setAngle - sets angle of gradient in props object from range slider
@param int angle - angle selected for linear gradient
@return angle
*/
props.setAngle = function( angle ) {
    this.angle = angle;
};

/*
@method setCol- sets color value in props object
@param string colorId - color property in props to change
@param string color - hex code of selected color
@return
*/
props.setCol = function( colorId, color ) {
    this.colors[colorId].color = color ;
};

/*
@method setStop - set color stop 
@param string colorId - color property in props to change
@param int stop - new stop value
*/
props.setStop = function( colorId, stop ) {

    this.colors[colorId].stop = stop;
    return props.display();
    
}

/*
@method setType - sets type in props object - type of gradient
@param string type - type of gradient (linear or radial)
@description - check for type then remove or add element with angle ID
@return props.display()
*/
props.setType = function( type ) {

    if ( type === 'linear' ) {
    
        // display id = angle element
        this.modifyDOMStyle('angle', 'display', 'block');
        
    } else {
    
        // hide id = angle element
        this.modifyDOMStyle('angle', 'display', 'none');
        
    }
    // set type of gradienti
    this.type = type;
    
    // run props.display() method
    return props.display();
    
};

/*
@method linearGradient - add style to preview box with linear gradient
@return style
*/
props.linearGradient = function() {

   var colors = Object.keys(this.colors);
   var colorsLength = colors.length;
   var output = this.linPrefix[this.prefix][1] + '(' + this.angle + 'deg, ';
  
   for( i in colors ){
        
        output += this.colors[colors[i]].color + ' ';
        output += this.colors[colors[i]].stop + '%';
        output += ( parseInt(i) + 1  != colorsLength ) ? ', ' : ')';
        
   }

   return output;

};

/*
@method radialGradient - add style to preview box with radial gradient
@return style
*/
props.radialGradient = function() {

   var colors = Object.keys(this.colors);
   var colorsLength = colors.length;
   var output = this.radPrefix[this.prefix][1] + '(';
  
   for( i in colors ){
        
        output += this.colors[colors[i]].color + ' ';
        output += this.colors[colors[i]].stop + '%';
        output += ( parseInt(i) + 1  != colorsLength ) ? ', ' : ')';
        
   }

   return output;
        
};

/*
@method linearCSS - output css to display box
@return string - css
*/
props.linearCSS = function() {

    // get all values in linPrefix object  
    var prefix = Object.values(props.linPrefix),
        colors = Object.keys(this.colors),
        colorsLength = colors.length,    
        css = '', 
        l = prefix.length;  
             
    while ( l-- ) {
    
        if ( prefix.hasOwnProperty(l) ) {
        
            css += prefix[l][0].toString() + this.BR;
            css += this.BACK + ' : ' + prefix[l][1].toString() + '(' + this.angle + 'deg, ';
  
            for( i in colors ){
        
                css += this.colors[colors[i]].color + ' ';
                css += this.colors[colors[i]].stop + '%';
                css += ( parseInt(i) + 1  != colorsLength ) ? ', ' : ');';
        
            } 
             css += this.BR + this.BR;    
            
        }
    }

    return css;
};

/*
@method radialCSS - output css to display box
@return string - css
*/
props.radialCSS = function() {

    var prefix = Object.values(props.radPrefix),
        css = '', l = prefix.length;   
        
    while ( l-- ){
    
        if ( prefix.hasOwnProperty(l) ) {
        
            css +=  prefix[l][0].toString() + this.BR;//comment line
            css +=  this.BACK + ' : ' + prefix[l][1].toString() + '(';
            css +=  this.colors.color1.color + ' ' + this.colors.color1.stop + '%, ';
            css +=  this.colors.color2.color + ' ' + this.colors.color2.stop;
            css +=  '%);' + this.BR + this.BR;//css
            
        }
     }
     
     return css;
};

/*
@method prop.display() - check for gradient type then change style on preview box
                         and run method to output css properties
*/
props.display = function() {

    if ( this.type  === 'linear' ) {
    
        this.modifyDOMStyle( this.preview, this.BACK, this.linearGradient() );
        this.modifyDOMHTML( this.output, this.linearCSS() );

    } else {
    
        this.modifyDOMStyle( this.preview, this.BACK, this.radialGradient() );
        this.modifyDOMHTML( this.output, this.radialCSS() );

    }
};

/*  
hash of vendor prexies for linear gradient
object property value = array
                        array[0] = css comment
                        array[1] = css vendor prefix + property   
*/
props.linPrefix = {
    'w3' : [ '/* W3  */', 'linear-gradient' ],
    '-webkit-' : [ '/* Webkit chrome */', '-webkit-linear-gradient' ],
    '-moz-' : [ '/* Mozilla Firefox */', '-moz-linear-gradient' ],
    '-ms-' : [ '/* MS IE10+ */', '-ms-linear-gradient' ],
    '-o-' : [ '/* O opera */', '-o-linear-gradient' ]
};  

/*  
hash of vendor prexies for radial gradient
object property value = array
                        array[0] = css comment
                        array[1] = css vendor prefix + property
*/
props.radPrefix = {
     'w3' : [ '/* W3  */', 'radial-gradient' ],
     '-webkit-' : [ '/* Webkit chrome */', '-webkit-radial-gradient' ],
     '-moz-' : [ '/* Mozilla Firefox */', '-moz-radial-gradient' ],
     '-ms-' : [ '/* MS IE10+ */', '-ms-radial-gradient' ],
     '-o-' : [ '/* O opera */', '-o-radial-gradient' ]           
};  

/*
@function colorChanged - user invoked function to change prop.col and 
                         modify DOM after
@param string colorId - property of props to change
@param string value - hex code of color value
*/
props.colorChanged = function( colorId, value ) {

    this.setCol(colorId, value);
    this.modifyDOMHTML( colorId, value );
    
    return props.display();
    
};


/*
@function changeAngle - user invoked function to change prop.angle and 
                        modify DOM after
@param int value - angle value
*/
props.changeAngle = function( value ) {
    this.setAngle( value );
    return props.display();
};

/*
@function modifyDOMHTML - modify text20 on element by id
@param string id - id of element
@param string value - innerHTML=
@return modify text
*/
props.modifyDOMHTML = function( id, value ) {
    document.getElementById(id).innerHTML=value;   
};

/*
@function modifyDOMSTYLE - modify preview box
@param string id - id of element
@param string property - css property to alter
@param string value - value of property 
*/
props.modifyDOMStyle = function( id, property, value ) {
    document.getElementById(id).style[property]=value;
};

/*
Actions to initiate when page load
- check browser supports gradients !important
- if it does does it require a vendor prefix if set !important
- set eventListeners on color pickers
- set eventListener on angle range slider
- when an event occurs update propeties in props object
*/

// check browser support for gradients
(function() {

    // run function to check browser support
    if ( ! props.runBrowserCheck() ) {
    
        // browser doesn't support gradients send a message to user
        var el = document.createElement('div');
        el.setAttribute('id', 'error')
        var body = document.getElementsByTagName('body');
        // add to body of page
        body[0].appendChild(el);
        // message to display
        el.innerHTML="Sorry Your browser doesn\'t support gradients please upgrade";

    }
    // bind all eventListeners to control elements
    bindEvents(); 
})();
/*
@function addElement - adds a new color picker to the DOM, sets and values, and
     attributes which need changing.
     Then ensures these elements are bound to event listeners

*/
function addElement(){

    /*
    first create a clone of the first color picker
    add this to the DOM
    then change all element attributes which are required for manipulating 
    the gradient of the preview box and ouput css
    */
    
    // color pickers are in alist
    var ul = document.getElementById('color-select');
    // get color picker element
    var newEl = document.getElementsByClassName('picker');
    var newElLen = newEl.length;

    // clone the top color picker
    var newColor = newEl[0].cloneNode(true, true);
    // increment the value in the string for new picker
    var colVar = 'color'+(newElLen+1);
    // add element to DOM
    ul.appendChild(newColor);
    // change text of previos last picker title
    document.getElementsByClassName('pick')[newElLen-1].innerHTML='Stop Color';
    // change new picker title
    document.getElementsByClassName('pick')[newElLen].innerHTML='End Color';
    // change data-var on stop element to reflect object property name
    document.getElementsByClassName('stop')[newElLen].setAttribute('data-stop-var', colVar);
    // set id of color-box to object property
    document.getElementsByClassName('color-box')[newElLen].children[0].setAttribute('id', colVar);
    // set data-var to object property on color picker
    document.getElementsByClassName('color')[newElLen].setAttribute('data-var', colVar);     
    // add propery to props.colors object
    props.colors[colVar] = {
                           color : props.colors.color1.color,
                           stop : 0
                           };
   /*
   Stop values need adding to css properties
   due to the ordering of the props.colors object this can cause
   visual propblems on the gradient. So the properties are given correct
   values that match their placement in order !important
   */
   
   // grab all colors object keys
   var colors = Object.keys(props.colors);
   var colorsLength = colors.length;
   // This value helps calculate how many properties we need to calculate for
   var numberToSort = colorsLength - 1;
   var percentMax = 100, last = 50;
   // regex to match number in string of object property key 
   var reg = /\d+/;
   // an ordered array containing the stop values to use
   var percentArray = [];
   
   // populate the perecentArray 
   for ( var i = 0; i < colorsLength ; i ++ ) {
       // the first value will always be set to 0 and the last to 100
       if ( i == 0) {
           percentArray.push(0);
       } else if ( i == colorsLength -1) {
           percentArray.push(100);
       } else {
           percentArray.push( percentMax - last );       
           last = last  / 2;
           console.log(last)

       }
       
   }
   // loop over the keys of the props.colors object and set the 
   // props.colors.stop values
   // ordering matches the order of the percentArray
   // these values should be used !important
   for( i in colors ){
       // extract number from key   
       var num = colors[i].match(reg)[0];
       // set the props.colors.stop value
       props.colors[colors[i]].stop=parseInt(percentArray[num-1]);
       
       // grab the stop number inputs
       // use data-stop-var attribute to locate
       var data = "[data-stop-var=\'" + colors[i] + "\']";
       
       var stopEle = document.querySelectorAll(data)
       // change the stop values
       stopEle[0].value = parseInt(percentArray[num-1]);
   } 

    // ensure all elements are bound to event listeners
    bindEvents();
          
};
/*
@function setColor -execute props.colorChanged to change color of color picker 
                   which fired event
the name of props property to change is stored in data-var attribute       
*/
function setColor() {
    var val = this.value;
    var att = this.getAttribute('data-var');
    props.colorChanged( att, val );
}
    
/*
@function setStop - execute props.setStop to change stop percentage
*/
function setStop() {
     var val = this.value;
     var att = this.getAttribute('data-stop-var');
     props.setStop( att, val );
}
     
/*
@function defiineAngle - change props.angle through props.changeAngle when
                         event fired
*/   
function defineAngle() {
    props.changeAngle(this.value)
}

function bindEvents() {

    var addColor = document.getElementById('add_color');
    addColor.addEventListener('click', addElement);
    
    // grab all color pickers ( class="color" )
    var colorPicker = document.getElementsByClassName('color');

    // length of colorPicker object
    var l = colorPicker.length;

    // loop over colorPicker object to add event listeners
    for ( var i = 0; i < l; i++ ){
         colorPicker[i].addEventListener('input', setColor);
    }

    // add event listener to stop values
    var stop = document.getElementsByClassName('stop');
    var stopLen = stop.length;
    
    // loop over stop object and add event listeners
    for ( var i = 0; i < stopLen; i++ ) {
        stop[i].addEventListener('change', setStop);
    }       
 
    // grab angle range slider
    var angle = document.getElementById('set_angle');
    angle.addEventListener('input', defineAngle);
}    
