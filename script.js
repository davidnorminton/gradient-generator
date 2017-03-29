
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

    return this.angle = angle;
}

/*
@method setCol1 - sets col1 in props object - first color selected
@param string color - hex code of selected color
@return col1
*/
props.setCol = function( colorId, color ) {
    
    return this[colorId] = color;
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
        modifyDOMStyle('angle', 'display', 'block');  
 
    } else {

        // hide id = angle element
        modifyDOMStyle('angle', 'display', 'none'); 
                   
    }
    // set type of gradient
    this.type = type;
    
    // run props.display() method
    return props.display();
    
}

/*
@method linearGradient - add style to preview box with linear gradient
@return style
*/
props.linearGradient = function() {
    return this.linPrefix['w3'][1] + '(' + this.angle + 'deg, ' + this.color1 + ', ' + this.color2 + ')';  
}

/*
@method radialGradient - add style to preview box with radial gradient
@return style
*/
props.radialGradient = function() {
    return this.radPrefix['w3'][1] + '('+ this.color1 + ', ' + this.color2 + ')';  
}

/*
@method linearCSS - output css to display box
@return string - css
*/
props.linearCSS = function() {

    // get all values in linPrefix object  
    var prefix = props.linPrefix,

        //string to hold output     
        css = '';         
                    
    for ( var i in prefix ) {

        css +=  prefix[i][0].toString() + this.BR;// comment line
        css +=  this.BACK + ' : ' + prefix[i][1].toString() + '(' + this.angle + 'deg, '; 
        css +=  this.color1 + ', ' + this.color2 + ')' + this.BR + this.BR;//css
            
    }
    return css;

}

/*
@method radialCSS - output css to display box
@return string - css
*/
props.radialCSS = function() {

    var  css = '',
         prefix = props.radPrefix;
         
    for ( var i in props.radPrefix ){ 

        css +=  prefix[i][0].toString() + this.BR;//comment line
        css +=  this.BACK + ' : ' + prefix[i][1].toString() + '('; 
        css +=  this.color1 + ', ' + this.color2 + ')' + this.BR + this.BR;//css
            
     }
     return css;

}

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
}   

/*
@function modifyDOMHTML - modify text on element by id
@param string id - id of element
@param string value - innerHTML=
@return modify text
*/
function modifyDOMHTML( id, value ) {

    return document.getElementById(id).innerHTML=value;

}

/*
@function modifyDOMSTYLE - modify preview box
@param string id - id of element
@param string property - css property to alter
@param string value - value of property 
*/
function modifyDOMStyle( id, property, value ) {

    return document.getElementById(id).style[property]=value;

}
   
            
//  hash of vendor prexies for linear gradient    
props.linPrefix = {

    'webkit' : [ '/* Webkit chrome */', '-webkit-linear-gradient' ],
    'moz' : [ '/* Mozilla Firefox */', '-moz-linear-gradient' ],
    'ms' : [ '/* MS IE10+ */', '-ms-linear-gradient' ],
    'o' : [ '/* O opera */', '-o-linear-gradient' ],
    'w3' : [ '/* W3  */', 'linear-gradient' ]
};  

// hash of vendor prexies for radial gradient   
props.radPrefix = {

     'webkit' : [ '/* Webkit chrome */', '-webkit-radial-gradient' ],
     'moz' : [ '/* Mozilla Firefox */', '-moz-radial-gradient' ],
     'ms' : [ '/* MS IE10+ */', '-ms-radial-gradient' ],
     'o' : [ '/* O opera */', '-o-radial-gradient' ],
     'w3' : [ '/* W3  */', 'radial-gradient' ]
           
};  

/*
@function firstColorChanged - user invoked function to change prop.col1 and 
                              modify DOM after
@param string value - hex code of color value                              
*/
function colorChanged( colorId, value ) { 

    props.setCol(colorId, value);

    modifyDOMHTML( colorId, value );
    
    return props.display();
}


/*
@function changeAngle - user invoked function to change prop.angle and 
                         modify DOM after
@param int value - angle value  
*/
function changeAngle( value ) {

    props.setAngle( value );
    
    return props.display();
}     
