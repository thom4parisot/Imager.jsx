# Imager.jsx

> A React component to use responsive images in desktop and mobiles browsers. Featuring [Imager.js](https://github.com/BBC-News/Imager.js)!

React rendering is used for the initial component rendering.
Its batch state mechanism is

# Usage

*Imager.jsx* is a two-steps use.

## The React Factory

The factory associates an [Imager.js](https://github.com/BBC-News/Imager.js) behaviour with a React component.

```js
var Imager = require('imager.jsx');

var ResponsiveImage = Imager({
  availableWidths: [ 333, 444, 555 ],
  availablePixelRatios: [1, 1.3, 2]
});
```

Please refer to the [Imager.js JavaScript Configuration documentation](https://github.com/BBC-News/Imager.js#javascript-configuration) for more informations.

## The React Component

The React component is used to render a responsive image (an `<img />` HTML element).

```html
<ResponsiveImage
 src="http://placehold.it/{width}"
 className="responsive-image"
 alt="alternative text" />,
```

The only mandatory attribute is `src`, the equivalent of [Imager.js `data-src` attribute](https://github.com/BBC-News/Imager.js#data-src).

`className` and `alt` are respectively rendered as `class` and `alt` HTML attributes.

# Example

```html
<div style="max-width: 800px; " class="container"></div>

<script>
var Imager = require('imager.jsx');

// Imager.js configuration
var ResponsiveImage = Imager({
  availableWidths: [200, 260, 320, 600]
});

var container = document.querySelector('.container');

// component rendering
React.render(<ResponsiveImage src="http://placehold.it/{width}" alt="alternative text" />, container);
</script>
```

# License

    The MIT License (MIT)

    Copyright (c) 2014 Thomas Parisot

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

