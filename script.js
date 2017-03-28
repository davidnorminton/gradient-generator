
/**
 * HTML5 gradient generator
 *
 * @version 1.3.1
 * @license GNU Lesser General Public License, http://www.gnu.org/copyleft/lesser.html
 * @author  David Norminton http://davenorm.me
 * @created 05-01-2017
 * @updated 28-03-2017
 * @link    http://davenorm.me
 */

/*
@Object props - stores and sets css properties 
*/
var props = {

           'col1' : '#f70202',//first color selected
           'col2' : '#fab707',//second color selected   
           'angle' : 0, // angle of linear gradient
           'type' : 'linear',// tyoe of gradient - linear or radial
           // few vars to reduce typing
           'back' : 'background : ',//css property
           'br' : '<br />'// break
           
};

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
props.setCol1 = function( color ) {

    return this.col1 = color;
}

/*
@method setCol2 - sets col2 in props object - second color selected 
@param string color - hex code of selected color 
@return col2 
*/
props.setCol2 = function( color ) {
    return this.col2 = color;
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
        return this.linPrefix['w3'][1] + '(' + this.angle + 'deg, ' + this.col1 + ', ' + this.col2 + ')';  
}

/*
@method radialGradient - add style to preview box with radial gradient
@return style
*/
props.radialGradient = function() {
        return this.radPrefix['w3'][1] + '('+ this.col1 + ', ' + this.col2 + ')';  
}

/*
@method linearCSS - output css to display box
@return string - css
*/
props.linearCSS = function() {

        // get all values in linPrefix object  
        var value = Object.values(props.linPrefix),
            len = Object.values(value).length,// store length of object
            i = 0, // initailiser
            css = '';//string to hold output
          
                    
        for ( i; i < len; i++) {

            css +=  value[i][0].toString() + this.br;// comment line
            css +=  this.back + value[i][1].toString() + '(' + this.angle + 'deg, '; 
            css +=  this.col1 + ', ' + this.col2 + ')' + this.br + this.br;//css
            
        }
        return css;

}

/*
@method radialCSS - output css to display box
@return string - css
*/
props.radialCSS = function() {

        // get all values in radPrefix object
        var value = Object.values(props.radPrefix),
            len = Object.values(value).length,
            i = 0,
            css = '';
                    
        for ( i; i < len; i++) {

            css +=  value[i][0].toString() + this.br;//comment line
            css +=  this.back + value[i][1].toString() + '(' + this.angle + 'deg, '; 
            css +=  this.col1 + ', ' + this.col2 + ')' + this.br + this.br;//css
            
        }
        return css;

}

/*
@method prop.display() - check for gradient type then change style on preview box
                         and run method to output css properties
*/
props.display = function() {

    if ( this.type  === 'linear' ) {

        modifyDOMStyle( 'gradient_div', 'background', this.linearGradient() );
        modifyDOMHTML( 'output_css', this.linearCSS() );    
            
    } else {

        modifyDOMStyle( 'gradient_div', 'background', this.radialGradient() );
        modifyDOMHTML( 'output_css', this.radialCSS() );    
             
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
function firstColorChanged( value ) { 

    props.setCol1(value);

    modifyDOMHTML( 'color1', value );
    
    return props.display();
}

/*
@function secondColorChanged - user invoked function to change prop.col2 and 
                              modify DOM after
@param string value - hex code of color value                              
*/
function secondColorChanged( value ) { 

    props.setCol2(value);

    modifyDOMHTML( 'color2', value );
    
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
