/**
 * This example shows random copies and backlight 10 times
 */

var _ = require('lodash');

var display = require('../');


// Set display rows/cols
display.set(2, 16);


var keywords = ['HELLO!', 'BYE!', 'I LOVE YOU', 'HOW ARE YOU?', 'YOU ARE SO MEAN :(']
  , colorPallete = ['green', 'yellow', 'red'];


function udpate(count) {

  // Clear display
  display.clearWords();
  display.clearColor();
  

  // Keeps changing copies/back light for 10 times
  if(count < 10) {
    
    // Set back light color
    display.setColor(colorPallete[count++ % colorPallete.length]);

    // Display copies randomly
    display.write(_.shuffle(keywords));

    // Repeat after 3 seconds
    setTimeout(function() { udpate(count); }, 3000);
    
  } else {
    
    // Done!
    console.log('done!');
    
  }
}

// Start
udpate(0);