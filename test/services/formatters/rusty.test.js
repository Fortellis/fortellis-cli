const colors = require('colors');
const { expect } = require('chai');
const rusty = require('../../../src/services/linter/formatters/rusty');

const testData = {
  results: [
    {
      message: "foo",
      severity: 0,
      range: {
        start: { line: 0, character: 2 },
        end: { line: 0, character: 4 },    
      }
    }, 
    {
      message: "bar",
      severity: 1,  
      range: {
        start: { line: 1, character: 3 },
        end: { line: 1, character: 6 },    
      }
    }, 
    {
      message: "baz",
      severity: 2,
      range: {
        start: { line: 2, character: 4 },
        end: { line: 2, character: 7 },    
      }
    },    
  ],
  filePath: "./foo/bar/baz.yaml",
  srcMap: [
    "aaa bbb ccc ddd",
    "eee fff ggg hhh",
    "iii jjj kkk lll",
    'mmm nnn ooo ppp',
  ], 
};

describe('rusty.formatSeverity()', () => {
  it("should translate spectral severity codes to human readable strings", async function() {
    const tests = [
      { severity: 0, expected: 'error'.red },
      { severity: 1, expected: 'warning'.yellow },
      { severity: 2, expected: 'info' },
      { severity: 3, expected: 'hint' },
    ];
    
    for(t of tests) {
        const result = rusty.formatSeverity(t.severity);
        expect(result).to.equal(t.expected);
    }
  });
});

describe('rusty.formatLocation()', () => {
  it("should correctly format the location of the result in the ", async function() {
    const expected = "-->".blue + " baz.yaml:1:3\n"

    const result = rusty.formatLocation(
      testData.filePath, 
      testData.results[0].range.start.line, 
      testData.results[0].range.start.character,
    );
 
    expect(result).to.equal(expected);
  });
});

describe('rusty.formatSrcView()', () => {
  it("should correctly format a view of the source code", async function() {
     
    const expected = "  |\n".blue + 
                     "1 |".blue + " aaa bbb ccc ddd\n" +
                     "  |\n".blue;
      
    const result = rusty.formatSrcView(
      testData.srcMap, 
      testData.results[0].range.start.line, 
      testData.results[0].range.start.character, 
      testData.results[0].range.end.line, 
      testData.results[0].range.end.character 
    );
      
    expect(result).to.equal(expected);
  });
});

describe('rusty.formatResults()', () => {
  it("should correctly format a collection of results", async function() {
    const expected = rusty.formatResult(testData.results[0], testData.srcMap, testData.filePath) + '\n' +
      rusty.formatResult(testData.results[1], testData.srcMap, testData.filePath) + '\n' + 
      rusty.formatResult(testData.results[2], testData.srcMap, testData.filePath) + '\n';

      const result = rusty.formatResults(testData.results, testData.srcMap, testData.filePath);
        
      expect(result).to.eql(expected);
  });
});