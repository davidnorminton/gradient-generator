/*jshint browser, single, multivar, for */
/*
if running through jslint - assume browser
                          - allow multi vars
                          - allow this
                          - allow for
*/
/**
 * HTML5 gradient generator
 *
 * @version 1.4.1
 * @license GNU Lesser General Public License, http://www.gnu.org/copyleft/lesser.html
 * @author  David Norminton http://davenorm.me
 * @created 05-01-2017
 * @updated 03-04-2017
 * @link    http://davenorm.me
 */
/*
@object supports - detect if browser supports gradients and if it does which
                   if any vendor prefix to use.
*/
var supports = {};
/*
@method prefix - determine if gradients are avaialble and which vendor prefix
sets prefix if found
@return prefix on true or false
*/
supports.prefix = function () {
    "use strict";
    // create an invisible elemenet for testing
    var el = document.createElement('div');
    // set an id to div so it can be referenced
    el.setAttribute('id', 'support');
    // supports or not
    var bool = false, vendors = ['-ms-', '-o-', '-moz-', '-webkit-', ''];
    var property = 'linear-gradient', prefix = '';
    vendors.map(function (value, index) {
        el.style.background = value + property + '(black, white)';
        bool = el.style.background.indexOf(value + property) > -1;
        if (bool) {
            prefix = (index === 4)
                ? 'w3'
                : value;
        }
    });
    return prefix;
};

/*
@namespace props - stores and sets css properties
*/
var props = {
    //colors
    colors: {
         //first color selected
        color1: {
            color: '#f70202',
            stop: 0
        },
        //second color selected
        color2: {
            color: '#fab707',
            stop: 100
        }
    },
    // angle of linear gradient
    angle: 0,
    // tyoe of gradient - linear or radial
    type: 'linear',
    //css property
    BACK: 'background-image',
    // line break
    BR: '<br />',
    // preview box
    preview: 'gradient_div',
    // CSS output box
    output: 'output_css',
    // prefix to use defult w3 standard
    prefix: 'w3',
    // possible radial gradient positions
    radPos: [
        'left top', 'center top', 'right top', 'left center', 'center',
        'right center', 'left bottom', 'center bottom', 'right bottom'
    ],
    // possible linear gradient directions ( used instead of angle )
    linDir: [
        'top left', 'top', 'top right', 'left',
        'right', 'bottom right', 'bottom', 'bottom left'
    ],
    //hash of vendor prexies for linear gradient
    linPrefix: {
        'w3': ['/* W3  */', 'linear-gradient'],
        '-webkit-': ['/* Webkit chrome */', '-webkit-linear-gradient'],
        '-moz-': ['/* Mozilla Firefox */', '-moz-linear-gradient'],
        '-ms-': ['/* MS IE10+ */', '-ms-linear-gradient'],
        '-o-': ['/* O opera */', '-o-linear-gradient']
    },
    // hash of vendor prexies for radial gradient
    radPrefix: {
        'w3': ['/* W3  */', 'radial-gradient'],
        '-webkit-': ['/* Webkit chrome */', '-webkit-radial-gradient'],
        '-moz-': ['/* Mozilla Firefox */', '-moz-radial-gradient'],
        '-ms-': ['/* MS IE10+ */', '-ms-radial-gradient'],
        '-o-': ['/* O opera */', '-o-radial-gradient']
    }
};

/*
@method runBrowserCheck - detect if the browser supports gradients
@return the vendor prefix to use if true or return false
*/
props.runBrowserCheck = function () {
    "use strict";
    this.prefix = supports.prefix();
    return supports.prefix;
};

/*
@method setAngle - sets angle of gradient in props object from range slider
@param int angle - angle selected for linear gradient
@return angle
*/
props.setAngle = function (angle) {
    "use strict";
    this.angle = angle;
};

/*
@method setCol- sets color value in props object
@param string colorId - color property in props to change
@param string color - hex code of selected color
@return
*/
props.setCol = function (colorId, color) {
    "use strict";
    this.colors[colorId].color = color;
};

/*
@method setStop - set color stop
@param string colorId - color property in props to change
@param int stop - new stop value
*/
props.setStop = function (colorId, stop) {
    "use strict";
    this.colors[colorId].stop = stop;
    return props.display();
};

/*
@method setType - sets type in props object - type of gradient
@param string type - type of gradient (linear or radial)
@description - check for type then remove or add element with angle ID
@return props.display()
*/
props.setType = function (type) {
    "use strict";
    this.modifyDOMStyle(
        'angle',
        'display',
        (type === 'linear'
            ? 'block'
            : 'none')
    );
    this.type = type;
    return props.display();
};

/*
@method gradient - add style to preview box with gradient
@param type - type of gradient
@return style
*/
props.gradient = function (type) {
    "use strict";
    var keys = Object.keys(this.colors);
    var keysLength = keys.length, i = 0;
    var prefix = (type === 'linear')
        ? this.linPrefix[this.prefix][1]
        : this.radPrefix[this.prefix][1];
    var output = prefix + '(';
    output += (type === 'linear')
        ? this.angle + 'deg, '
        : ' ';
    while (i < keysLength) {
        if (keys.hasOwnProperty(i)) {
            output += this.colors[keys[i]].color + ' ';
            output += this.colors[keys[i]].stop + '%';
            output += (
                parseInt(i) + 1
                    !== keysLength
            )
                ? ', '
                : ')';
        }
        i += 1;
    }
    return output;
};

/*
@method css - output css to display box
@param string gradient - type of gradient
@return string - css
*/
props.css = function (type) {
    "use strict";
    // get all values in linPrefix object
    var prefix = (type === 'linear')
            ? Object.values(props.linPrefix)
            : Object.values(props.radPrefix),
        keys = Object.keys(this.colors),
        keysLength = keys.length,
        css = '',
        l = prefix.length,
        i = 0;
    while (l > 0) {
        if (prefix.hasOwnProperty(l)) {
            css += prefix[l][0].toString() + this.BR;
            css += this.BACK + ' : ' + prefix[l][1].toString() + '(';
            css += (type === 'linear')
                ? this.angle + 'deg, '
                : '';
            while (i < keysLength) {
                if (keys.hasOwnProperty(i)) {
                    css += this.colors[keys[i]].color + ' ';
                    css += this.colors[keys[i]].stop + '%';
                    css += (
                        parseInt(i) + 1
                        !== keysLength
                    )
                        ? ', '
                        : ');';
                }
                i += 1;
            }
            css += this.BR + this.BR;
        }
        l -= 1;
    }
    return css;
};

/*
@method prop.display() - check for gradient type then change style on preview box
                         and run method to output css properties
*/
props.display = function () {
    "use strict";
    this.modifyDOMStyle(this.preview, this.BACK, this.gradient(this.type));
    this.modifyDOMHTML(this.output, this.css(this.type));
};

/*
@function colorChanged - user invoked function to change prop.col and
                         modify DOM after
@param string colorId - property of props to change
@param string value - hex code of color value
*/
props.colorChanged = function (colorId, value) {
    "use strict";
    this.setCol(colorId, value);
    this.modifyDOMHTML(colorId, value);
    return props.display();
};

/*
@function changeAngle - user invoked function to change prop.angle and
                        modify DOM after
@param int value - angle value
*/
props.changeAngle = function (value) {
    "use strict";
    this.setAngle(value);
    return props.display();
};

/*
@function modifyDOMHTML - modify text20 on element by id
@param string id - id of element
@param string value - innerHTML=
@return modify text
*/
props.modifyDOMHTML = function (id, value) {
    "use strict";
    document.getElementById(id).innerHTML = value;
};

/*
@function modifyDOMSTYLE - modify preview box
@param string id - id of element
@param string property - css property to alter
@param string value - value of property
*/
props.modifyDOMStyle = function (id, property, value) {
    "use strict";
    document.getElementById(id).style[property] = value;
};

/*
@function addElement - run a series of functions
    createColorPicker() - creates new color picker element
    calculateStopValues() - gives each stop value a new logical value
    bindEvents() - ensure all elements have correct event listener
*/
var events = {};
events.addElement = function () {
    "use strict";
    // crate new color picker element
    events.createColorPicker();
    // reset stop values and order
    events.calculateStopValues();
    // ensure all elements are bound to event listeners
    events.bindEvents();
};

events.createColorPicker = function () {
    "use strict";
    // color pickers are in alist
    var ul = document.getElementById('color-select');
    // get color picker element
    var newEl = document.getElementsByClassName('picker');
    var newElLen = newEl.length;

    // clone the top color picker
    var newColor = newEl[0].cloneNode(true, true);
    // increment the value in the string for new picker
    var colVar = 'color' + (newElLen + 1);
    // add element to DOM
    ul.appendChild(newColor);
    // change text of previos last picker title
    document.getElementsByClassName('pick')[newElLen - 1].innerHTML = 'Stop Color';
    // change new picker title
    document.getElementsByClassName('pick')[newElLen].innerHTML = 'End Color';
    // change data-var on stop element to reflect object property name
    document.getElementsByClassName('stop')[newElLen].setAttribute('data-stop-var', colVar);
    // set id of color-box to object property
    document.getElementsByClassName('color-box')[newElLen].children[0].setAttribute('id', colVar);
    // set data-var to object property on color picker
    document.getElementsByClassName('color')[newElLen].setAttribute('data-var', colVar);
    // add propery to props.colors object
    props.colors[colVar] = {color: props.colors.color1.color, stop: 0};
};
/*
@function calculateStopValues -
Stop values need adding to css properties
due to the ordering of the props.colors object this can cause
visual propblems on the gradient. So the properties are given correct
values that match their placement in order !important
*/
events.calculateStopValues = function () {
    "use strict";
    // grab all colors object keys
    var colors = Object.keys(props.colors), colorsLength = colors.length;
    var percentMax = 100,
        last = 50,
        reg = /\d+/,
        percentArray = [],
        i = 0;
    // populate the perecentArray
    while (i < colorsLength) {
        // the first value will always be set to 0 and the last to 100
        if (i === 0) {
            percentArray.push(0);
        } else if (i === colorsLength - 1) {
            percentArray.push(100);
        } else {
            percentArray.push(percentMax - last);
            last = last / 2;
        }
        i += 1;
    }
    // loop over the keys of the props.colors object and set the
    // props.colors.stop values
    // ordering matches the order of the percentArray
    // these values should be used !important
    colors.map(function (value) {
        // extract number from key
        var num = value.match(reg)[0];
        // set the props.colors.stop value
        props.colors[value].stop = parseInt(percentArray[num - 1]);
        // grab the stop number inputs
        // use data-stop-var attribute to locate
        var data = "[data-stop-var='" + value + "']";
        var stopEle = document.querySelectorAll(data);
        // change the stop values
        stopEle[0].value = parseInt(percentArray[num - 1]);
    });
};
// run functions to bind event listeners
events.bindEvents = function () {
    "use strict";
    events.addListenerByClass('color', 'input');
    events.addListenerByClass('stop', 'change');
    events.addListenerById('add_color', 'click');
    events.addListenerById('set_angle', 'input');
};
// bind eventListeners using class name
events.addListenerByClass = function (el, type) {
    "use strict";
    var element = document.getElementsByClassName(el), i = 0, l = element.length;
    while (i < l) {
        element[i].addEventListener(
            type,
            (el === 'color')
                ? this.setColor
                : this.setStop
        );
        i += 1;
    }
};
// bind eventlisteners using id name
events.addListenerById = function (el, type) {
    "use strict";
    var element = document.getElementById(el);
    element.addEventListener(
        type,
        (el === 'add_color')
            ? this.addElement
            : this.defineAngle
    );
};
/*
@function setColor -execute props.colorChanged to change color of color picker
                   which fired event
the name of props property to change is stored in data-var attribute
*/
events.setColor = function () {
    "use strict";
    props.colorChanged(this.getAttribute('data-var'), this.value);
};

/*
@function setStop - execute props.setStop to change stop percentage
*/
events.setStop = function () {
    "use strict";
    props.setStop(this.getAttribute('data-stop-var'), this.value);
};

/*
@function defiineAngle - change props.angle through props.changeAngle when
                         event fired
*/
events.defineAngle = function () {
    "use strict";
    props.changeAngle(this.value);
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
var run = function () {
    "use strict";
    // run function to check browser support
    if (!props.runBrowserCheck()) {
        // browser doesn't support gradients send a message to user
        var el = document.createElement('div');
        el.setAttribute('id', 'error');
        var body = document.getElementsByTagName('body');
        // add to body of page
        body[0].appendChild(el);
        // message to display
        el.innerHTML = "Sorry Your browser doesn't support gradients please upgrade";
    }
    // bind all eventListeners to control elements
    events.bindEvents();
};
run();
