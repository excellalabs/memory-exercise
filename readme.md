# Memory React - Object Oriented

## Getting Started

### Running the app

To run, add your JavaScript to the app.js file and open the index.html in Chrome

### ES6

Since this will be run in Chrome, ES6 features will be available including `Class`, which allows for easier use of object-oriented architecture.

Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

### jQuery (or lack there of)

There will not be jQuery available. You can reference how to do typical jQuery functions using vanilla JavaScript here: https://github.com/oneuijs/You-Dont-Need-jQuery

Some of the popular ones are:

Query by selector

```
// jQuery
$('.class');

// Native
document.querySelectorAll('.class');

// or
document.getElementsByClassName('class');
```

Query by Id

```
// jQuery
$('#id');

// Native
document.querySelector('#id');

// or
document.getElementById('id');
```

Query in descendants
```
// jQuery
$el.find('li');

// Native
el.querySelectorAll('li');
```

Closest
```
// jQuery
$el.closest(selector);

// Native - Only latest, NO IE
el.closest(selector);
```

Add class
```
// jQuery
$el.addClass(className);

// Native
el.classList.add(className);
```

Remove class
```
// jQuery
$el.removeClass(className);

// Native
el.classList.remove(className);
```

Has class
```
// jQuery
$el.hasClass(className);

// Native
el.classList.contains(className);
```

Toggle class
```
// jQuery
$el.toggleClass(className);

// Native
el.classList.toggle(className);
```