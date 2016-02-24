# eslint-plugin-warwick

An [eslint plugin](http://eslint.org/docs/developer-guide/working-with-plugins) containing JavaScript code style rules for apps built by the [University of Warwick web team](http://warwick.ac.uk/webteam).

## Usage

* Ensure that your *package.json* includes the following `devDependency`:

        ```json
        "eslint-plugin-warwick": "git://github.com/UniversityofWarwick/eslint-plugin-warwick.git",
        ```
* `npm install`
* Ensure that your *.eslintrc* contains the following properties:

        ```json
        {
          "plugins": [
            "warwick"
          ],
          "env": {
            "mocha": true,
            "es6": true
          },
          "parserOptions": {
            "ecmaVersion": 6,
            "ecmaFeatures": {
              "experimentalObjectRestSpread": true
            }
          },
          "rules": {
            "eqeqeq": [2, "allow-null"],
            "warwick/no-object-assign": 2
          }
        }
        ```

        Valid values for the rule properties in the *.eslintrc* are `2` to error, `1` to warn, and `0` to ignore instead.

## Our rules
### eqeqeq

This is a standard rule, but we prefer a specific configuration in our *.eslintrc* which permits `x == null` expressions.
The type-coercing double-equals operator will match both `null` and `undefined` types, which is usually
more useful in practice than enforcing the strict equality `===` operator and having to check against both types.

### no-object-assign

This reports uses of `Object.assign()` or `_.assign()` to initialise object literals, and to merge or clone objects.
It's more readable to use the [proposed ES7 rest and spread syntax](https://github.com/sebmarkbage/ecmascript-rest-spread)
for [object destructuring](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment):

```javascript
// old (linted)
var newProps = Object.assign({}, oldProps);
// preferred
var newProps = { ...oldProps };

// old (linted)
var newProps = Object.assign({}, oldProps { prop: 'replaced' });
// preferred
var newProps = { ...oldProps, prop: 'replaced' };
```

Providing you use a recent version of [Babel](https://babeljs.io/) to transpile/de-sugar ES6 syntax,
no further config changes should be required for the new syntax to compile.

## Copyright and license
This plugin is copyright of the University of Warwick, and licensed under the [MIT license](http://warwick.mit-license.org/2016).
