# Imager.js Findings

## The BBC News use case

On the 27th of November 2014, the [responsive homepage of BBC News](bbc-news.html) contains **32 images**.

```js
document.querySelectorAll('.responsive-image img').length
```

Images are served from an image proxy which pregenerates the 28 different sizes:

```
[96, 130, 165, 200, 235, 270, 304, 340, 375, 410, 445, 485, 520, 555, 590, 625, 660, 695, 736, 768, 772, 800, 834, 872, 904, 936, 950, 976];
```

A typical image tag looks like this:

```html
<img src="http://ichef.bbci.co.uk/news/270/media/images/79309000/jpg/_79309377_79309376.jpg"
     class="responsive-image__image js-image-replace"
     alt="A Border Force officer checking passports at Terminal 2, Heathrow Airport in June">
```

In an optimistic scenario, we assume image URLs have roughly the same size, which means 81 bytes per URL:

```
http://ichef.bbci.co.uk/news/270/media/images/79309000/jpg/_79309377_79309376.jpg
```

## `img[srcset]` and BBC News

If we wanted to use [native responsive images](https://dev.opera.com/articles/responsive-images/) on BBC News, the same image aforementioned would look like the following:

```html
<img src="http://ichef.bbci.co.uk/news/270/media/images/79309000/jpg/_79309377_79309376.jpg"
     srcset="http://ichef.bbci.co.uk/news/96/media/images/79309000/jpg/_79309377_79309376.jpg 96w,
             http://ichef.bbci.co.uk/news/130/media/images/79309000/jpg/_79309377_79309376.jpg 130w,
             http://ichef.bbci.co.uk/news/165/media/images/79309000/jpg/_79309377_79309376.jpg 165w,
             http://ichef.bbci.co.uk/news/200/media/images/79309000/jpg/_79309377_79309376.jpg 200w,
             http://ichef.bbci.co.uk/news/235/media/images/79309000/jpg/_79309377_79309376.jpg 235w,
             http://ichef.bbci.co.uk/news/270/media/images/79309000/jpg/_79309377_79309376.jpg 270w,
             http://ichef.bbci.co.uk/news/304/media/images/79309000/jpg/_79309377_79309376.jpg 304w,
             http://ichef.bbci.co.uk/news/340/media/images/79309000/jpg/_79309377_79309376.jpg 340w,
             http://ichef.bbci.co.uk/news/375/media/images/79309000/jpg/_79309377_79309376.jpg 375w,
             http://ichef.bbci.co.uk/news/410/media/images/79309000/jpg/_79309377_79309376.jpg 410w,
             http://ichef.bbci.co.uk/news/445/media/images/79309000/jpg/_79309377_79309376.jpg 445w,
             http://ichef.bbci.co.uk/news/485/media/images/79309000/jpg/_79309377_79309376.jpg 485w,
             http://ichef.bbci.co.uk/news/520/media/images/79309000/jpg/_79309377_79309376.jpg 520w,
             http://ichef.bbci.co.uk/news/555/media/images/79309000/jpg/_79309377_79309376.jpg 555w,
             http://ichef.bbci.co.uk/news/590/media/images/79309000/jpg/_79309377_79309376.jpg 590w,
             http://ichef.bbci.co.uk/news/625/media/images/79309000/jpg/_79309377_79309376.jpg 625w,
             http://ichef.bbci.co.uk/news/660/media/images/79309000/jpg/_79309377_79309376.jpg 660w,
             http://ichef.bbci.co.uk/news/695/media/images/79309000/jpg/_79309377_79309376.jpg 695w,
             http://ichef.bbci.co.uk/news/736/media/images/79309000/jpg/_79309377_79309376.jpg 736w,
             http://ichef.bbci.co.uk/news/768/media/images/79309000/jpg/_79309377_79309376.jpg 768w,
             http://ichef.bbci.co.uk/news/772/media/images/79309000/jpg/_79309377_79309376.jpg 772w,
             http://ichef.bbci.co.uk/news/800/media/images/79309000/jpg/_79309377_79309376.jpg 800w,
             http://ichef.bbci.co.uk/news/834/media/images/79309000/jpg/_79309377_79309376.jpg 834w,
             http://ichef.bbci.co.uk/news/872/media/images/79309000/jpg/_79309377_79309376.jpg 872w,
             http://ichef.bbci.co.uk/news/904/media/images/79309000/jpg/_79309377_79309376.jpg 904w,
             http://ichef.bbci.co.uk/news/936/media/images/79309000/jpg/_79309377_79309376.jpg 936w,
             http://ichef.bbci.co.uk/news/950/media/images/79309000/jpg/_79309377_79309376.jpg 950w,
             http://ichef.bbci.co.uk/news/976/media/images/79309000/jpg/_79309377_79309376.jpg 976w" 
     class="responsive-image__image js-image-replace" 
     alt="A Border Force officer checking passports at Terminal 2, Heathrow Airport in June">
```

The URL definition does not take in account retina dimensions, and grows from *81 bytes* per image to *2433 bytes* (space chars removed).

It would mean a total of **77,856 additional bytes** of `srcset` URLs.

## Imager.jsx approach

A typical image tag looks like this:

```html
<imgr src="http://ichef.bbci.co.uk/news/{width}/media/images/79309000/jpg/_79309377_79309376.jpg"
     class="responsive-image__image js-image-replace"
     alt="A Border Force officer checking passports at Terminal 2, Heathrow Airport in June" />
```

The URL grows from *81 bytes* per image to *85 bytes*.

It would mean a total of **128 additional bytes** in the entire page – library excluded.

The request is made *render time* so as the browser makes the best decision when both the DOM tree and the CSS layout are merged together in the Render tree.
