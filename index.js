/**
 * Display module
 * 
 * http://iotdk.intel.com/docs/master/mraa/node/classes/i2c.html
 * http://www.instructables.com/id/Make-an-intelligent-desk-clock-powered-by-the-Inte/step7/Import-the-MRAA-and-UPM-LCD-libraries/
 */


var mraa = require('mraa')
  , jsUpmI2cLcd = require ('jsupm_i2clcd')
  , Color = require('color')
  , _ = require('lodash')


var displayCols, displayRows, blankWords;

/** 
 * Initialize the LCD.
 * The 1st param is the BUS ID:
 * Intel Edison: Use 6
 * Intel Galileo Gen 2: Use 6 (I think)
 * Intel Galileo Gen 1: Use 0
 */
var lcd = new jsUpmI2cLcd.Jhd1313m1(6, 0x3E, 0x62);


/**
 * Set backlight color
 *
 * @param {String} color
 */
function setColor (color) {
  var rgb = getRGB(color);
  lcd.setColor(rgb[0], rgb[1], rgb[2]);
//  lcd.setColor.apply({}, getRGB(color));
}

/**
 * Clear backlight color
 */
function clearColor () {
  lcd.setColor(0, 0, 0);
}

function getRGB (val) {
  var color = Color(val)
  // console.log(color);
  return color.rgbArray();
}


/**
 * Print words
 * 
 * lcd boards: 
 * row: 2
 * col: 16
 *
 * @param {String} data
 */
function getCursor (index, val) {
  return {
    col: Math.floor((displayCols - val.length) / 2),
    row: index
  }
}


/**
 * Print words
 * 
 * lcd boards: 
 * row: 2
 * col: 16
 *
 * @param {String or Array} data
 */
function write (data) {
  var count = 0;
  if(_.isArray(data)) {
    _.each(data, function(val, index) {
      var c = getCursor(index, val);
      lcd.setCursor(c.row, c.col);
      lcd.write(val);
      if((index + 1) === displayRows) return false;
    });
  } else if(_.isString(data)) {
    write([data]);
  } else {
    throw new Error('An argument has to be either String or Array');
  }
}

/**
 * Clear all words
 */
function clearWords () {
  var rows = displayRows;
  while(rows > 0) {
    lcd.setCursor((rows - 1), 0);
    lcd.write(blankWords);
    rows--;
  }
}

/**
 * Set display (rows and cols)
 */
function set (rows, cols) {
  displayRows = rows;
  displayCols = cols;
  blankWords = '';
  while(cols > 0) {
    blankWords += ' ';
    cols--;
  }
}



module.exports = {
  set: set,
  setColor: setColor,
  write: write,
  clearWords: clearWords,
  clearColor: clearColor
};
