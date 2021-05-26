const colorize = require('json-colorizer');
const chalk = require('chalk');

const colorOptions = {
  pretty: true,
  colors: {
    BRACE: 'white.dim',
    BRACKET: 'white.dim',
    COLON: 'cyan.bold',
    COMMA: 'cyan.bold',
    STRING_KEY: 'cyan',
    STRING_LITERAL: 'green.bold',
    NUMBER_LITERAL: 'blue.bold',
    BOOLEAN_LITERAL: 'yellow.bold',
    NULL_LITERAL: 'magenta.bold',
  },
};

module.exports = {
  json: (json) => console.log(colorize(json, colorOptions)),
  title: (title) => console.log(chalk.white(chalk.bgBlue(`\n\n  ${title}  `))),
  error: (error) =>
    console.log(chalk.white(chalk.bgRed(`\n\n  ${error}  `))),
};
