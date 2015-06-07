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
 * @param {String/Object} color
 * @example "red", rgb(255, 255, 255)", {r: 255, g: 255, b: 255}
 */
function setColor (color) {
  var rgb = getRGB(color)
    , r = rgb[0]
    , g = rgb[1]
    , b = rgb[2]
  lcd.setColor(r, g, b);
  return [r , g, b];
}


/**
 * Set backlight color from 2 colors and range
 *
 * @param {String/Object} from
 * @param {String/Object} from
 * @param {Number} range (0-1)
 */
function setColorFromTwoColors (from, to, range) {
  if(_.isNumber(range)) {
    range = Math.max(0, Math.min(1, range));
  } else {
    range = .5;
  }
  var rgbFrom = getRGB(from)
    , rgbTo = getRGB(to)
    , r0 = rgbFrom[0]
    , r1 = rgbTo[0]
    , rangeR = (r0 < r1)? range : (1 - range)
    , g0 = rgbFrom[1]
    , g1 = rgbTo[1]
    , rangeG = (g0 < g1)? range : (1 - range)
    , b0 = rgbFrom[2]
    , b1 = rgbTo[2]
    , rangeB = (b0 < b1)? range : (1 - range)
    , r = Math.abs(r0 - r1) * rangeR + Math.min(r0, r1)
    , g = Math.abs(g0 - g1) * rangeG + Math.min(g0, g1)
    , b = Math.abs(b0 - b1) * rangeB + Math.min(b0, b1)
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  lcd.setColor(r , g, b);
  return [r , g, b];
}


/**
 * Clear backlight color
 */
function clearColor () {
  lcd.setColor(0, 0, 0);
}

function getRGB (val) {
  var color = Color(val)
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
    _.each(data, function(val, row) {
      if(!_.isNull(val) && _.isString(val)) {
        clearWord(row);
        var c = getCursor(row, val);
        lcd.setCursor(c.row, c.col);
        lcd.write(val);
        if((row + 1) === displayRows) return false;
      }
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
function clearWord (row) {
  lcd.setCursor(row, 0);
  lcd.write(blankWords);
}
function clearWords () {
  var rows = displayRows;
  while(rows-- > 0) {
    clearWord(rows);
  }
}

/**
 * Set display (rows and cols)
 */
function set (rows, cols) {
  displayRows = rows;
  displayCols = cols;
  blankWords = '';
  while(cols-- > 0) {
    blankWords += ' ';
  }
}



module.exports = {
  set: set,
  setColor: setColor,
  setColorFromTwoColors: setColorFromTwoColors,
  write: write,
  clearWords: clearWords,
  clearWord: clearWord,
  clearColor: clearColor
};
