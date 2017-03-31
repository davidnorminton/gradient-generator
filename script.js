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

    //first color selected
    color1 : '#f70202',

    //second color selected
    color2 : '#fab707',

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
    prefix : 'w3'
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

*/
props.runBrowserCheck = function() {
    if ( props.supports() && props.supported() ) {
        return props.detectPrefix();
    }
    return false;
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
    this[colorId] = color ;
};

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
    // set type of gradient
    this.type = type;
    // run props.display() method
    return props.display();
};

/*
@method linearGradient - add style to preview box with linear gradient
@return style
*/
props.linearGradient = function() {
    return this.linPrefix[this.prefix][1] + '(' + this.angle + 'deg, ' + this.color1 + ', ' + this.color2 + ')';
};

/*
@method radialGradient - add style to preview box with radial gradient
@return style
*/
props.radialGradient = function() {
    return this.radPrefix.[this.prefix][1] + '('+ this.color1 + ', ' + this.color2 + ')';
};

/*
@method linearCSS - output css to display box
@return string - css
*/
props.linearCSS = function() {
    // get all values in linPrefix object  
    var prefix = Object.values(props.linPrefix),
    //string to hold output
        css = '', l = prefix.length;       
    while ( l-- ) {
        if ( prefix.hasOwnProperty(l) ) {
            css +=  prefix[l][0].toString() + this.BR;// comment line
            css +=  this.BACK + ' : ' + prefix[l][1].toString() + '(' + this.angle + 'deg, ';
            css +=  this.color1 + ', ' + this.color2 + ');' + this.BR + this.BR;//css
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
            css +=  this.color1 + ', ' + this.color2 + ');' + this.BR + this.BR;//css
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
@function modifyDOMHTML - modify text on element by id
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
window.onload = function() {


    // run function to check browser support
    if ( ! props.runBrowserCheck() ) {
    
        // browser doesn't support gradients send a message to user
        var el = document.createElement('div');
        el.setAttribute('id', 'error')
        var body = document.getElementsByTagName('body');
        body[0].appendChild(el);
        el.innerHTML="Sorry Your browser doesn\'t gradients please upgrade";

    } 

    // grab all color pickers ( class="color" )
    var colorPicker = document.getElementsByClassName('color');

    // length of colorPicker object
    var l = colorPicker.length;

    // grab angle range slider
    var angle = document.getElementById('set_angle');
    angle.addEventListener('input', defineAngle);

    // loop over colorPicker object to add event listeners
    for ( var i = 0; i < l; i++ ){
         colorPicker[i].addEventListener('input', setColor);
    }
    
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
    @function defiineAngle - change props.angle through props.changeAngle when
                             event fired
    */   
    function defineAngle() {
        props.changeAngle(this.value)
    }

}
