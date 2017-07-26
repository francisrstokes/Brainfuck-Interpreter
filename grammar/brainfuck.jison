/* description:  Bf symbols: ><+-.,[] */
%lex
%%

\s+                   /*skip*/
">"                   return '>';
"<"                   return '<';
"+"                   return '+';
"-"                   return '-';
"."                   return '.';
","                   return ',';
"["                   return '[';
"]"                   return ']';
<<EOF>>               return 'EOF';

/lex

%start expressions

%{
const tree = [];
let depthPointer = 0;
const addToken = (token) => {
  let level = tree;
  for (let i = 0; i < depthPointer; i++) {
    //set the level to the rightmost deepest branch
    level = level[level.length-1];
  }
  level.push(token);
}

const startLoopBranch = () => {
    addToken([]);
    depthPointer++;
}

const endLoopBranch = () => depthPointer--;
%}

%% /* language grammar */

expressions
    : symbols "EOF" {return tree;}
;

symbols
  : symbol
  | symbol symbols
;

symbol
    : ">" { addToken($1); }               /* Advance data pointer */
    | "<" { addToken($1); }               /* Regress the data pointer */
    | "+" { addToken($1); }               /* Increment the data pointer */
    | "-" { addToken($1); }               /* Decrement the data pointer */
    | "." { addToken($1); }               /* Output the byte at the data pointer */
    | "," { addToken($1); }               /* Get one byte of input at the data pointer */
    | "[" { startLoopBranch(); }
    | "]" { endLoopBranch(); }
;
