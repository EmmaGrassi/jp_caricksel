/*global describe, beforeEach, it, expect, inject*/
'use strict';

function click(el){
    var ev = document.createEvent("MouseEvent");
    ev.initMouseEvent(
        "click",
        true /* bubble */, true /* cancelable */,
        window, null,
        0, 0, 0, 0, /* coordinates */
        false, false, false, false, /* modifier keys */
        0 /*left*/, null
    );
    el.dispatchEvent(ev);
}

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
    });

    it ('should go to left when clicked on \'go to left\'', function() {
        var element = $compile('<div data-jp-caricksel></div data-jp-caricksel>')($rootScope)[0];
        dump(element.querySelectorAll('img.seat').length);


        click(element.getElementsByClassName('ctrlLeft')[0]);




        $rootScope.$digest();
    });
});
