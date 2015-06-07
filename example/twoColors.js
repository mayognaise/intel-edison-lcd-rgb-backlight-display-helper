/**
 * This example shows random copies and backlight 10 times
 */

var _ = require('lodash')

var display = require('../');

// Set display rows/cols
display.set(2, 16);

// Clear display
display.clearWords();
display.clearColor();


function update (count) {

  if(count > 1) {
    console.log('done!');
    count = 1;
    display.setColorFromTwoColors('green', 'yellow', count);
  } else {
    display.setColorFromTwoColors('green', 'yellow', count);
    count += .3;
    setTimeout(function() { update(count); }, 3000);
  }

}

update(0);