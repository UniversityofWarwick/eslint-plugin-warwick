/* global module */

"use strict";

/*
 This eslint rule reports uses of Object.assign() or _.assign() to initialise, merge or clone objects.
 It's more readable to use the proposed ES7 rest and spread properties for object destructuring assignment and literals.
 See README.md for use.
 */
module.exports = function(context) {
    var checkCallExpression = function(node) {
        var callee = node.callee;
        if (
            callee
            && callee.type === "MemberExpression"
            && callee.property != null
            && callee.property.name === "assign"
            && callee.object
            && (callee.object.name === "Object" || callee.object.name === "_")
        ) {
            var args = node.arguments;
            if (
                args
                && Array.isArray(args)
                && args.length >= 2
            ) {
                context.report(node, "using assign instead of ES7 object spread");
            }
        }
    };

    return {
        CallExpression: checkCallExpression
    };
};
