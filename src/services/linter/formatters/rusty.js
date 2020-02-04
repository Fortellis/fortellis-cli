// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const path = require('path');

function formatResults(results, srcMap, fileName) {
  let output = '';
  for (const r of results) {
    output += formatResult(r, srcMap, fileName) + '\n';
  }
  return output;
}

function formatResult(result, srcMap, filePath) {
  let output = '';

  const startLine = result.range.start.line;
  const startCol = result.range.start.character;
  const endLine = result.range.end.line;
  //const endCol = result.range.end.character;

  output += formatMessage(result.severity, result.message);
  output += formatLocation(filePath, startLine, startCol);
  output += formatSrcView(srcMap, startLine, endLine);

  return output;
}

//
// Output message as:
//
//   {severity}: {message}
//
function formatMessage(severity, message) {
  return formatSeverity(severity) + `: ${message}\n`;
}

//
// Output location as:
//
//   --> {file-name}:{start line #}:{start col #}
//
function formatLocation(filePath, startLine, startCol) {
  const fileName = path.basename(filePath);
  return `-->`.blue + ` ${fileName}:${startLine + 1}:${startCol + 1}\n`;
}

//
// Renders a view of the source code.
//
function formatSrcView(srcMap, startLine, endLine) {
  const borderLength = `${endLine + 1} |\n`.length;
  const border = '|\n'.padStart(borderLength, ' ').blue;

  let output = border;

  for (let l = startLine; l <= /*endLine*/ startLine; l++) {
    output += `${l + 1} |`.blue + ` ${srcMap[l]}\n`;
  }

  output += border;

  return output;
}

//
// Translates spectal severity code into a human readable output
//
function formatSeverity(code) {
  const levels = ['error'.red, 'warning'.yellow, 'info', 'hint'];
  return levels[code];
}

module.exports = {
  formatResults,
  formatResult,
  formatLocation,
  formatSrcView,
  formatSeverity
};
