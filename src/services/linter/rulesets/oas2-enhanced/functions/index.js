const caseTypes = {
    flatCase: {
        regex: RegExp('^[a-z][a-zA-Z0-9]+$'),
        prettyName: 'flatcase'
    },
    camelCase: {
        regex: RegExp('^[a-z]+[a-zA-Z0-9]*$'),
        prettyName: 'camelCase'
    },
    pascalCase: { 
        regex: RegExp('^[A-Z]+[a-zA-Z0-9]*$'),
        prettyName: 'PascalCase'
    },
    kebabCase: { 
        regex: RegExp('^[a-z][a-z0-9]+(?:-[a-z0-9]+)*$'),
        prettyName: 'kebab-case'
    },
    upperKebabCase: {
        regex: RegExp('^[A-Z][a-zA-Z0-9]+(?:-[A-Z][a-zA-Z0-9]+)*$'), 
        prettyName: 'Upper-Kebab-Case'
    },
    cobolCase: {
        regex: RegExp('^[A-Z][A-Z0-9]+(?:-[A-Z0-9]+)*$'), 
        prettyName: 'COBAL-CASE'
    },
    snakeCase: {
        regex: RegExp('^[a-z][a-z0-9]+(?:_[a-z0-9]+)*$'),
        prettyName: 'snake_case'
    },
    macroCase: {
        regex: RegExp('^[A-Z][A-Z0-9]+(?:-[A-Z0-9]+)*$'),
        prettyName: 'MACRO_CASE'
    }
}

function casing(targetVal, opts) {
    /**
     * This rule verifies that the value matches the specified case type.
     */
    
    const { casing } = opts;
    if(casing === void 0)
        throw "must include 'casing' option";

    const caseType = caseTypes[casing];
    if(casing === void 0)
        throw "invalid 'casing' option";

    if(!caseType.regex.test(targetVal)) {
        return [{
            message: "'" + targetVal + "' should be " + caseType.prettyName
        }];
    }

    return [];
}

function pathCasing(targetVal, opts) {
    /**
     * This rule verifies that every path segment matches the specified case type.
     */
    
    if(typeof opts.casing !== 'string') {
        throw "must include 'casing' option";
    }

    const caseType = caseTypes[opts.casing];
    if(!casing) {
        throw "invalid 'casing' option";
    }
    
    let results = [];

    for(const segment of targetVal.split(RegExp('\/|{|}'))) {
      if(segment && !caseType.regex.test(segment)) {
        results.push({
          message: "path segment '" + segment + "' should be " + caseType.prettyName
        })
      }
    }
  
    return results;
  }

  module.exports = {
    caseTypes,
    casing,
    pathCasing
  };