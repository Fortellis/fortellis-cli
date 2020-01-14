const caseTypes = {
  flatCase: {
    regex: new RegExp('^[a-z][a-zA-Z0-9]+$'),
    prettyName: 'flatcase'
  },
  camelCase: {
    regex: new RegExp('^[a-z]+[a-zA-Z0-9]*$'),
    prettyName: 'camelCase'
  },
  pascalCase: {
    regex: new RegExp('^[A-Z]+[a-zA-Z0-9]*$'),
    prettyName: 'PascalCase'
  },
  kebabCase: {
    regex: new RegExp('^[a-z][a-z0-9]+(?:-[a-z0-9]+)*$'),
    prettyName: 'kebab-case'
  },
  upperKebabCase: {
    regex: new RegExp('^[A-Z][a-zA-Z0-9]+(?:-[A-Z][a-zA-Z0-9]+)*$'),
    prettyName: 'Upper-Kebab-Case'
  },
  cobolCase: {
    regex: new RegExp('^[A-Z][A-Z0-9]+(?:-[A-Z0-9]+)*$'),
    prettyName: 'COBAL-CASE'
  },
  snakeCase: {
    regex: new RegExp('^[a-z][a-z0-9]+(?:_[a-z0-9]+)*$'),
    prettyName: 'snake_case'
  },
  macroCase: {
    regex: new RegExp('^[A-Z][A-Z0-9]+(?:-[A-Z0-9]+)*$'),
    prettyName: 'MACRO_CASE'
  }
};

function casing(targetVal, opts) {
  /**
   * This rule verifies that the value matches the specified case type.
   */

  const { casing } = opts;
  if (casing === void 0) throw "must include 'casing' option";

  const caseType = caseTypes[casing];
  if (casing === void 0) throw "invalid 'casing' option";

  if (!caseType.regex.test(targetVal)) {
    return [
      {
        message: "'" + targetVal + "' should be " + caseType.prettyName
      }
    ];
  }

  return [];
}

function pathCasing(targetVal, opts) {
  /**
   * This rule verifies that every path segment matches the specified case type.
   */

  if (typeof opts.casing !== 'string') {
    throw "must include 'casing' option";
  }

  const caseType = caseTypes[opts.casing];
  if (!casing) {
    throw "invalid 'casing' option";
  }

  let results = [];

  for (const segment of targetVal.split(new RegExp('/|{|}'))) {
    if (segment && !caseType.regex.test(segment)) {
      results.push({
        message:
          "path segment '" + segment + "' should be " + caseType.prettyName
      });
    }
  }

  return results;
}

module.exports = {
  caseTypes,
  casing,
  pathCasing
};
