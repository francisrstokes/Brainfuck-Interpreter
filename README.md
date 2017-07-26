# Brainfuck-Interpreter

Brainfuck interpreter using Jison. Tokens and grammar are defined in `grammar/brainfuck.jison`. To compile the grammar to a parser, run `npm run generate_parser`. The parser generates a tree structure representing the operations which is used for the actual interpretation.
