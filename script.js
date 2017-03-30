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

/*
@namespace props - stores and sets css properties 
*/
/*jslint browser:true */
"use strict";

var props = {};

  //first color selected
  props.color1 = '#f70202';

  //second color selected
  props.color2 = '#fab707';

  // angle of linear gradient
  props.angle = 0;

  // tyoe of gradient - linear or radial
  props.type = 'linear';

  // few vars to reduce typing
  //css property
  props.BACK = 'background-image';

  // line break
  props.BR = '<br />';

  // preview box
  props.preview = 'gradient_div';

  // CSS output box
  props.output = 'output_css';

/*
@method setAngle - sets angle of gradient in props object from range slider
@param int angle - angle selected for linear gradient
@return angle
*/
props.setAngle = function( angle ) {
    this.angle = angle;
    return true;
};

/*
@method setCol- sets color value in props object
@param string colorId - color property in props to change
@param string color - hex code of selected color
@return
*/
props.setCol = function( colorId, color ) {
    this[colorId] = color;
    return true;
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
        modifyDOMStyle('angle', 'display', 'block');
    } else {
        // hide id = angle element
        modifyDOMStyle('angle', 'display', 'none');
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
    return this.linPrefix.w3[1] + '(' + this.angle + 'deg, ' + this.color1 + ', ' + this.color2 + ')';
};

/*
@method radialGradient - add style to preview box with radial gradient
@return style
*/
props.radialGradient = function() {
    return this.radPrefix.w3[1] + '('+ this.color1 + ', ' + this.color2 + ')';
};

/*
@method linearCSS - output css to display box
@return string - css
*/
props.linearCSS = function() {

    // get all values in linPrefix object  
    var prefix = Object.values(props.linPrefix),
    //string to hold output
        css = '', i = 0, l = prefix.length;
       
    for (  ; i < l;  i++ ) {
        if ( prefix.hasOwnProperty(i) ) {
            css +=  prefix[i][0].toString() + this.BR;// comment line
            css +=  this.BACK + ' : ' + prefix[i][1].toString() + '(' + this.angle + 'deg, ';
            css +=  this.color1 + ', ' + this.color2 + ')' + this.BR + this.BR;//css
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
        css = '', i = 0, l = prefix.length;
    
    for ( ; i < l; i++ ){
        if ( prefix.hasOwnProperty(i) ) {
            css +=  prefix[i][0].toString() + this.BR;//comment line
            css +=  this.BACK + ' : ' + prefix[i][1].toString() + '(';
            css +=  this.color1 + ', ' + this.color2 + ')' + this.BR + this.BR;//css
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

        modifyDOMStyle( this.preview, this.BACK, this.linearGradient() );
        modifyDOMHTML( this.output, this.linearCSS() );

    } else {

        modifyDOMStyle( this.preview, this.BACK, this.radialGradient() );
        modifyDOMHTML( this.output, this.radialCSS() );

    }
};

/*  
hash of vendor prexies for linear gradient
object property value = array
                        array[0] = css comment
                        array[1] = css vendor prefix + property   
*/
props.linPrefix = {

    'webkit' : [ '/* Webkit chrome */', '-webkit-linear-gradient' ],
    'moz' : [ '/* Mozilla Firefox */', '-moz-linear-gradient' ],
    'ms' : [ '/* MS IE10+ */', '-ms-linear-gradient' ],
    'o' : [ '/* O opera */', '-o-linear-gradient' ],
    'w3' : [ '/* W3  */', 'linear-gradient' ]
};  

/*  
hash of vendor prexies for radial gradient
object property value = array
                        array[0] = css comment
                        array[1] = css vendor prefix + property
*/
props.radPrefix = {

     'webkit' : [ '/* Webkit chrome */', '-webkit-radial-gradient' ],
     'moz' : [ '/* Mozilla Firefox */', '-moz-radial-gradient' ],
     'ms' : [ '/* MS IE10+ */', '-ms-radial-gradient' ],
     'o' : [ '/* O opera */', '-o-radial-gradient' ],
     'w3' : [ '/* W3  */', 'radial-gradient' ]
           
};  

/*
@function colorChanged - user invoked function to change prop.col and 
                         modify DOM after
@param string colorId - property of props to change
@param string value - hex code of color value
*/
props.colorChanged = function( colorId, value ) {

    props.setCol(colorId, value);

    modifyDOMHTML( colorId, value );

    return props.display();
};


/*
@function changeAngle - user invoked function to change prop.angle and 
                        modify DOM after
@param int value - angle value
*/
props.changeAngle = function( value ) {

    props.setAngle( value );
    
    return props.display();
};

/*
@function modifyDOMHTML - modify text on element by id
@param string id - id of element
@param string value - innerHTML=
@return modify text
*/
function modifyDOMHTML( id, value ) {

    document.getElementById(id).innerHTML=value;
    return true;
}

/*
@function modifyDOMSTYLE - modify preview box
@param string id - id of element
@param string property - css property to alter
@param string value - value of property 
*/
function modifyDOMStyle( id, property, value ) {

    document.getElementById(id).style[property]=value;
    return true;
}
