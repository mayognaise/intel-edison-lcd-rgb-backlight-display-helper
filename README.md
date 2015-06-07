# intel-edison-lcd-rgb-backlight-display-helper

Display helper for Grove-LCD RGB Backlight (I2c). This works on the Intel Edison.

## Example

```
var display = require('intel-edison-lcd-rgb-backlight-display-helper');


// Set display rows/cols
display.set(2, 16);

// Set color
display.setColor('red');

// Display keyword on row 1
display.write('HELLO!');

// You can add Array too...
display.write(['HELLO', 'BYE']);

// If you want to update only row 2
display.write([null, 'OH MY!']);

// Clear back light color
display.clearColor();

// Clear all copies
display.clearWords();

// Clear specific row
display.clearWord(rowNumber);

```