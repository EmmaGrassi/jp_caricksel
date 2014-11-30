/*global describe, beforeEach, it, expect, inject*/
/*
'use strict';

angular.module('myApp.version.interpolate-filter', [])

.filter('interpolate', ['version', function(version) {
  return function(text) {
    return String(text).replace(/\%VERSION\%/mg, version);
  };
}]);
*/

'use strict';

describe('Testing jp-caricksel directive', function() {
    var $compile,
        $rootScope;

    // Load the myApp module, which contains the directive
    beforeEach(module('rickheere.jpCaricksel'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_){
        var scope;

        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();

        $rootScope.images = [
            'http://lorempixel.com/640/480/sports/',
            'http://lorempixel.com/640/480/food/',
            'http://lorempixel.com/640/480/animals/'
        ];
    }));

    it ('should leave the rootElement the same', function() {

        var element = $compile('<div data-jp-caricksel></div data-jp-caricksel>')($rootScope);

        $rootScope.$digest();

        expect(element[0].nodeName).toBe('DIV');
        expect(element.attr('data-jp-caricksel')).toBe('');
    });

    it ('should add the imageContainer to the root element', function() {
        var element = $compile('<div data-jp-caricksel></div data-jp-caricksel>')($rootScope);

        $rootScope.$digest();

        expect(element[0].firstChild.nodeName).toBe('DIV');
        expect(element[0].firstChild.className).toBe('imageContainer');
    });

    it ('should add 3 images', function() {
        var element = $compile('<div data-jp-caricksel></div data-jp-caricksel>')($rootScope);

        $rootScope.$digest();

        expect(element.find('img').length).toBe(3);
    });

    it ('should add the controlls to the rootElement', function() {
        var element = $compile('<div data-jp-caricksel></div data-jp-caricksel>')($rootScope);

        $rootScope.$digest();

        expect(element.find('div')[1].tagName).toBe('DIV');
        expect(element.find('div')[1].className).toBe('ctrl ctrlLeft');

        expect(element.find('div')[2].tagName).toBe('DIV');
        expect(element.find('div')[2].className).toBe('ctrl ctrlRight');

        //expect(element.find('div')[1].html()).toBe('<div class="imageContainer">');
    });
});
