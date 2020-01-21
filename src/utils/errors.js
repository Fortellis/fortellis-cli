const ERRORS = {
    REPO_INVALID: {
        message: () => 'This is not a Fortellis repository. Run \'fortellis-cli init\' to create a new repository.',
        exit: 101
    },
    REPO_ALREADY_EXISTS: {
        message: () => 'This directory is already a Fortellis repository.',
        exit: 102
    },
    FILE_NOT_ADDED: {
        message: (file) => `${file || 'File'} is not in the local repository. Use the 'fortellis-cli add' command to add the spec to the repository.`,
        exit: 103
    },
    FILE_ALREADY_EXISTS: {
        message: (file) => `${file || 'File'} is already in the repository.`,
        exit: 104
    },
    FILE_NOT_EXIST: {
        message: (file) => `${file || 'File'} does not exist.`,
        exit: 105
    },
    SPECIFICATION_NOT_GIVEN: {
        message: () => 'No specification file specified. Please specify a file using \'-f\'.',
        exit: 106
    },
    FILE_NOT_GIVEN: {
        message: () => 'No file specified or given.',
        error: 107
    },
    CONFIG_NOT_EXIST: {
        message: () => 'No global configuration exists. Please execute the \'fortellis-cli configure\' command.',
        error: 108
    },
    UNEXPECTED_ERROR: {
        message: (errDetails) => `An unexpected error has occurred. Please contact support@fortellis.io for more help.\n${errDetails}`,
        exit: 199
    }
};

// Format an error to be used for @oclif/command's this.error
const toCommandError = (error, ...args) => {
    if (!Object.values(ERRORS).some(DEFINED_ERR => DEFINED_ERR.exit === error.exit)) {
        return [ERRORS.UNEXPECTED_ERROR.message(), { exit: ERRORS.UNEXPECTED_ERROR.exit }];
    }
    const message = typeof error.message === 'function' ? error.message(...args) : error.message;
    const commandError = [message, { exit: error.exit }];
    return commandError;
}

module.exports = {
    ERRORS: Object.freeze(ERRORS),
    COMMAND_ERRORS: Object.freeze(COMMAND_ERRORS),
    toCommandError
};