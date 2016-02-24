"use strict";

var rule = require("../../lib/rules/no-object-assign-cloning");
var RuleTester = require("eslint").RuleTester;
var ruleTester = new RuleTester();

ruleTester.run("no-object-assign-cloning", rule, {
  valid: [
    "var foo = assign;", // not a call expression
    "var x = assign(foo);", // assign method not a member expression
    "var x = foo.assign(bar);", // assign method not a member of Object or underscore/lodash
    "var x = Object.assign(1);" // assign to create a singleton array of Number, not an object
  ],
  invalid: [
    {
      code: "var c = _.assign({}, { a: 1 } , { b: 2 });",
      errors: [
        { message: "using assign instead of ES6 object spread" }
      ]
    },
    {
      code: "var c = Object.assign({}, { a: 1 } , { b: 2 });",
      errors: [
        { message: "using assign instead of ES6 object spread" }
      ]
    },
    {
      code: "var c = _.assign({ a: 1 }, { b: 1 } , { c: 2 });",
      errors: [
        { message: "using assign instead of ES6 object spread" }
      ]
    },
    {
      code: "var c = Object.assign({ a: 1 }, { b: 1 } , { c: 2 });",
      errors: [
        { message: "using assign instead of ES6 object spread" }
      ]
    }

  ]
});