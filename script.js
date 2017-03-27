
// various strings used to build oupur
var col1 = '#f70202',
    col2 = '#fab707',   
    angle=0,
    back = 'background : ',
    deg = 'deg ',
    open = '(',
    close = ')'
    com = ', ',
    br = '<br />';   
// hash of vendor prexies    
var pre = {
        'webkit' : '-webkit-linear-gradient',
        'moz' : '-moz-linear-gradient',
        'ms' : '-ms-linear-gradient',
        'o' : '-o-linear-gradient',
        'w3' : 'linear-gradient'
    };    
// hash of vendor prexie comments    
var comment = {
        'webkit' : '/* Webkit chrome */',
        'moz' : '/* Mozilla Firefox */',
        'ms' : '/* MS IE10+ */',
        'o' : '/* O opera */',
        'w3' : '/* W3  */'
    };

     
/**
 * function - changeState
 * changes the style attribut on the div with an id of gradient_div
 * then changes the text inside the div with an id of output_css
 **/    
function changeState() {
    // build the output string with the color picked and chosen angle
    var output = 'linear-gradient(' + angle + 'deg , '+ col1 + ',' + col2 + ' )';
    // get the gradient on div with id of gradient-div
    document.getElementById('gradient_div').style.background=output;
    // this will be outputted to the div with id of output_css
    var outputText = 
    comment['webkit'] + br +
    back + pre['webkit'] + open + angle + deg + com + col1 + com + col2 + close + br + br +   
    comment['moz'] + br + 
    back + pre['moz'] + open + angle + deg + com + col1 + com + col2 + close + br + br +   
    comment['ms'] + br + 
    back + pre['ms'] + open + angle + deg + com + col1 + com + col2 + close + br + br +   
    comment['o'] + br + back + 
    pre['o'] + open + angle + deg + com + col1 + com + col2 + close + br + br +   
    comment['w3'] + br + 
    back + pre['w3'] + open + angle + deg + com + col1 + com + col2 + close + br + br; 

    // now change the text
    document.getElementById('output_css').innerHTML=outputText;
}    

/**
 * changeAngle
 * @param int - value of angle selected
 */
function changeAngle( value ) {
    // the global angle variable is equal to this value passed to function
    angle = value;
    // modify DOM
    return changeState();
}
function firstColorChanged( value ) { 
    // change global var
    col1 = value;
    // alter the span text with id of col1
    document.getElementById('color1').innerHTML=value;
    // modify DOM
    return changeState();
}
function secondColorChanged( value ) { 
    // change global var
    col2 = value;
    // alter the span text with id of col2
    document.getElementById('color2').innerHTML=value;    
    // modify DOM
    return changeState();
}

