# intel-edison-lcd-rgb-backlight-display-helper

Display helper for Grove-LCD RGB Backlight (I2c). This works on the Intel Edison.

## Example

```
var display = require('intel-edison-lcd-rgb-backlight-display-helper');


// Set display rows/cols
display.set(2, 16);

// Set color
display.setColor('red');

// Display keyword
display.write('HELLO!');

// You can add Array too...
display.write(['HELLO :)', 'BYE :(']);

// Clear back light color
display.clearColor();

// Clear copies
display.clearWords();


```