const { parseWithPointers } = require("@stoplight/yaml");
const OpenAPISpecValidator = require("../utils/spec-validation/index");
const axios = require("axios");
const defaultConfigs = require("../config/defaultConfigs");
const { logService: logger } = require("@cdkglobal/fortellis-dev-utils");
const ERROR_PATH_DELIM = "/";

// This will need to be moved to an ENV variable (and possibly set by Terraform)
const domainServiceUrl =
  "https://h9mfexl1db.execute-api.us-west-2.amazonaws.com/api/v1/domains";

/**
 * Validates a spec by first linting the spec against the OpenAPI and Fortellis schema standards.
 * Throws error listing validation failures if spec is invalid.
 *
 * Set options.standard to true to validate based on Fortellis standards
 *
 * @param {string} spec
 * @param {Object} options
 * @returns {Object} parsed spec as a corresponding Object
 */

let auth = {
  username: defaultConfigs.username,
  password: defaultConfigs.password
};

async function validate(
  spec,
  options = { standard: false, ignoreBasePathCheck: false }
) {
  // Oct-01-2018 Note: Set to non-standard default for now to disable header validation
  if (typeof spec !== "string") {
    throw new Error("Spec is a currently unsupported type");
  }

  const parsedSpec = parseWithPointers(spec);
  const { data = {} } = parsedSpec;
  const { Authorization } = options;

  let errors = [];

  const domainError = await validateDomain(data, Authorization);
  if (domainError.message) {
    errors.push({ message: domainError.message });
  }

  if (!options.ignoreBasePathCheck) {
    const { basePathValid, message } = await validateBasepath(data.basePath);
    if (!basePathValid && message) {
      errors.push({ message });
    }
  }

  const specErrors = await OpenAPISpecValidator.validate(data);
  // Concatinating basePathValidation error with open api spec validation errors.
  errors = errors.concat(specErrors);
  // Converting the validation error objects returned by Spectral to strings with line breaks for UI.
  errors = errors
    .filter(error => error && error.message)
    .map(error => {
      const errorPath = error.path
        ? ` at #/${error.path.join(ERROR_PATH_DELIM)}`
        : "";
      return `${error.message}${errorPath}`;
    });
  return errors;
}

function getDomainNameError(domainName = "") {
  return {
    message: `The '${domainName}' domain does not exist. Please use a valid domain name in the prefix of the basePath. Example: /{valid-domain}/xxx/xxx`
  };
}

function validateDomain(spec, Authorization) {
  //   const domainServiceUrl = process.env.DOMAIN_SERVICE_URL;
  const { basePath = "" } = spec;
  const domainName = basePath.split("/")[1];
  if (!domainName) {
    return getDomainNameError(domainName);
  }
  return axios
    .get(`${domainServiceUrl}/${domainName}`, { headers: { Authorization } })
    .then(res => {
      if (res.data) {
        logger.info({ message: "Domain found", domainName, basePath });
        return { domain: res.data.name };
      } else {
        logger.info({ message: "Domain not found", domainName, basePath });
        return getDomainNameError(domainName);
      }
    })
    .catch(err => {
      logger.error({ message: err.toString(), domainName, basePath });
      return {
        message:
          "Error finding domain name from basepath. Please contact Fortellis support"
      };
    });
}

function validateBasepath(basePath = "") {
  if (!basePath) {
    return { basePathValid: false };
  }

  let apigeeHost;
  if (process.env.NODE_ENV === "development") {
    apigeeHost = defaultConfigs.portal.apigeeHostDev;
  } else {
    apigeeHost = defaultConfigs.portal.apigeeHost;
  }

  const url = `https://${apigeeHost}${basePath}/ping`;

  logger.debug(
    `Pinging apigee at: ${url} in environment: ${process.env.NODE_ENV}.`
  );

  const basePathDataSuccess = {
    basePathValid: true,
    message: "Valid basepath."
  };

  const basePathDataFailure = {
    basePathValid: false,
    message:
      "Basepath already exists. A unique basepath is required for each spec."
  };

  return axios
    .get(url, { auth: auth })
    .then(() => basePathDataFailure)
    .catch(err => {
      if (err.response.status === 404) {
        return basePathDataSuccess;
      } else {
        return basePathDataFailure;
      }
    });
}

module.exports = {
  validate,
  validateBasepath,
  validateDomain
};
