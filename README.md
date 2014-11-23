# Imager.jsx

> Reactive responsive images for desktop and mobiles browsers.

# Usage

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
React.renderComponent(<ResponsiveImage src="http://placehold.it/{width}" alt="alternative text" />, container);
</script>
```