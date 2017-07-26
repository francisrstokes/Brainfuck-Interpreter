const readFileAsync = require('./readFileAsync');

if (process.argv.length < 3) {
  process.stdout.write(`Usage: node ${process.argv[1]} <brainfuck file>\n`);
  process.exit(1);
}

readFileAsync(process.argv[2], 'utf8')
  .then((file) => {
    const parser = require('./parser').parser;
    const tree = parser.parse(file);
    const run = require('./interpreter');

    run(tree);
  }, console.error);
