const getByte = require('./getByte');

const stack = [];
const memory = new Int32Array(30000);
let dataPointer = 0;
let instructionPointer = -1;
let branch = [];

module.exports = (tree) => {
  branch = [...tree];

  const step = async function () {
    instructionPointer++;

    if (stack.length === 0 && !branch[instructionPointer]) {
      return true;
    } else if (branch[instructionPointer] && typeof branch[instructionPointer] !== 'string') {
      const stackItem = [instructionPointer, [...branch]];
      stack.push(stackItem);
      branch = branch[instructionPointer];
      instructionPointer = 0;
    }

    const ins = branch[instructionPointer];
    if (instructionPointer === branch.length) {
      if (memory[dataPointer] === 0) {
        [instructionPointer, branch] = stack.pop();
      } else {
        instructionPointer = -1;
      }
    } else {
      switch (ins) {
        case '>':
          dataPointer++;
          break;
        case '<':
          dataPointer--;
          break;
        case '+':
          memory[dataPointer]++;
          break;
        case '-':
          memory[dataPointer]--;
          break;
        case '.':
          process.stdout.write(String.fromCharCode(memory[dataPointer]));
          break;
        case ',':
          memory[dataPointer] = await getByte();
          break;
      }
    }

    return false;
  };

  const run = () => {
    step().then(done => {
      if (!done) setImmediate(run);
      else process.exit(0);
    });
  }

  return run;
}