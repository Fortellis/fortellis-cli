const colors = require('colors');
const path = require('path');

function severityPrettyPrint(code) {
  const levels = ['error'.red, 'warning'.yellow, 'info', 'hint'];
  return levels[code];
}

function formatResult(result, srcMap, filePath) {
  let output = '';

  const fileName = path.basename(filePath);
  const startLine = result.range.start.line;
  const startCol = result.range.start.character;
  const endLine = result.range.end.line;
  const endCol = result.range.end.character;

  const pad = ''.padStart(`${endLine}`.length, ' ');

  output += severityPrettyPrint(result.severity) + `: ${result.message}\n`;
  output += `-->`.blue + ` ${fileName}:${startLine + 1}:${startCol + 1}\n`;

  output += `${pad} |\n`.blue;
  for (let l = startLine; l <= /*endLine*/ startLine; l++) {
    output += `${l + 1} | `.blue + `${srcMap[l]}\n`;
  }
  output += `${pad} |\n\n`.blue;

  return output;
}

function formatResults(linterResults, srcMap, fileName) {
  return linterResults.reduce((output, result) => {
    return output + formatResult(result, srcMap, fileName);
  });
}

module.exports = {
  formatResult,
  formatResults
};
