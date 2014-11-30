JpCaricksel (jp_caricksel)
============

A simple responsive carousel for AngularJS.


## Usage :
With bower:
```sh
bower install jp-caricksel --save
```

Add the `jp-caricksel.js` and `jp-caricksel.css` to your code.
```html
<link rel="stylesheet" href="bower_components/jp-caricksel/lib/jp-caricksel.css" />
<script src="bower_components/jp-caricksel/lib/jp-caricksel.js"></script>
```

Add the `jp-caricksel` attribute to the div you want to make into a carousel.

```html
<div data-jp-caricksel>
</div>
```
Register the module as and dependency on your application.

```js
angular.module('myApp', [
    'rickheere.jpCaricksel'
]);
```

You can now easily define some images on $scope.images in the controller you want to use.

```js
'use strict';

angular.module('myApp')
  .controller('MainCtrl', function ($scope) {

    $scope.images = [
        'http://lorempixel.com/640/480/sports/',
        'http://lorempixel.com/640/480/food/',
        'http://lorempixel.com/640/480/animals/'
    ];

});

```

Add the following code to your css file. It will specify the maximum width of the carousel.
It is recommended to pick the width of the images you're going to use.

```css
div[jp-caricksel],
div[data-jp-caricksel] {
    max-width: 640px;
}
```

In order to ensure that the carousel will scale with the proper ratio, it is necessary to calculate the ratio of the images you'll be using. And

For example we will be using a image with the size of 640px by 480px. The proper percentage will be
75 = 480 / 640 * 100

Set this on the padding-bottom.


```css
div[jp-caricksel] div.imageContainer,
div[data-jp-caricksel] div.imageContainer {
    padding-bottom: 75%; /* height to width ratio: 480 / 640 * 100 */
}
```

Enjoy the ride!

##Todo:
 * Make tests...
 * Add lazy loading.
 * Abstract away the need of have to calculate the image ratio by hand.
