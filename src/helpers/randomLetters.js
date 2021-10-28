const cloneDeep  = require('lodash/cloneDeep');

const GAME_SIZE = {
  COLUMNS: 10,
  ROWS: 10,
};

const DICE = [
  { letters: ['a','a','e','i','o','e'] },
  { letters: ['a','a','e','i','o','e'] },
  { letters: ['r','s','t','l','n','s'] },
  { letters: ['a','e','e','i','o','e'] },
  { letters: ['b','b','m','m','n','n'] },
  { letters: ['c','d','m','n','h','h'] },
  { letters: ['a','e','e','i','o','u'] },
  { letters: ['a','e','i','o','o','u'] },
  { letters: ['a','e','i','o','o','u'] },
  { letters: ['r','s','t','t','n','s'] },
  { letters: ['r','s','t','t','n','s'] },
  { letters: ['b','b','d','d','g','m'] },
  { letters: ['b','c','c','c','n','n'] },
  { letters: ['z','p','x','qu','j','v'] },
  { letters: ['w','p','f','g','k','qu'] },
  { letters: ['j','y','f','g','k','h'] },
  { letters: ['a','e','e','i','o','u'] },
  { letters: ['r','s','t','t','n','s'] },
  { letters: ['b','b','m','m','n','n'] },
  { letters: ['c','d','m','n','d','h'] },
  { letters: ['w','p','f','g','k','qu'] },
  { letters: ['b','b','d','d','d','m'] },
  { letters: ['j','y','f','g','k','h'] },
  { letters: ['a','a','e','i','o','e'] },
  { letters: ['r','s','t','t','n','s'] },
  { letters: ['a','a','e','i','o','e'] },
  { letters: ['a','a','e','i','o','e'] },
  { letters: ['r','s','t','l','n','s'] },
  { letters: ['a','e','e','i','o','e'] },
  { letters: ['b','b','m','m','n','n'] },
  { letters: ['c','d','m','n','h','h'] },
  { letters: ['a','e','e','i','o','u'] },
  { letters: ['a','e','i','o','o','u'] },
  { letters: ['a','e','i','o','o','u'] },
  { letters: ['r','s','t','t','n','s'] },
  { letters: ['r','s','t','t','n','s'] },
  { letters: ['b','b','d','d','g','m'] },
  { letters: ['b','c','c','c','n','n'] },
  { letters: ['z','p','x','qu','j','v'] },
  { letters: ['w','p','f','g','k','qu'] },
  { letters: ['j','y','f','g','k','h'] },
  { letters: ['a','e','e','i','o','u'] },
  { letters: ['r','s','t','t','n','s'] },
  { letters: ['b','b','m','m','n','n'] },
  { letters: ['c','d','m','n','d','h'] },
  { letters: ['w','p','f','g','k','qu'] },
  { letters: ['b','b','d','d','d','m'] },
  { letters: ['j','y','f','g','k','h'] },
  { letters: ['a','a','e','i','o','e'] },
  { letters: ['r','s','t','t','n','s'] },
  { letters: ['a','a','e','i','o','e'] },
  { letters: ['a','a','e','i','o','e'] },
  { letters: ['r','s','t','l','n','s'] },
  { letters: ['a','e','e','i','o','e'] },
  { letters: ['b','b','m','m','n','n'] },
  { letters: ['c','d','m','n','h','h'] },
  { letters: ['a','e','e','i','o','u'] },
  { letters: ['a','e','i','o','o','u'] },
  { letters: ['a','e','i','o','o','u'] },
  { letters: ['r','s','t','t','n','s'] },
  { letters: ['r','s','t','t','n','s'] },
  { letters: ['b','b','d','d','g','m'] },
  { letters: ['b','c','c','c','n','n'] },
  { letters: ['z','p','x','qu','j','v'] },
  { letters: ['w','p','f','g','k','qu'] },
  { letters: ['j','y','f','g','k','h'] },
  { letters: ['a','e','e','i','o','u'] },
  { letters: ['r','s','t','t','n','s'] },
  { letters: ['b','b','m','m','n','n'] },
  { letters: ['c','d','m','n','d','h'] },
  { letters: ['w','p','f','g','k','qu'] },
  { letters: ['b','b','d','d','d','m'] },
  { letters: ['j','y','f','g','k','h'] },
  { letters: ['a','a','e','i','o','e'] },
  { letters: ['r','s','t','t','n','s'] },
  { letters: ['a','a','e','i','o','e'] },
  { letters: ['a','a','e','i','o','e'] },
  { letters: ['r','s','t','l','n','s'] },
  { letters: ['a','e','e','i','o','e'] },
  { letters: ['b','b','m','m','n','n'] },
  { letters: ['c','d','m','n','h','h'] },
  { letters: ['a','e','e','i','o','u'] },
  { letters: ['a','e','i','o','o','u'] },
  { letters: ['a','e','i','o','o','u'] },
  { letters: ['r','s','t','t','n','s'] },
  { letters: ['r','s','t','t','n','s'] },
  { letters: ['b','b','d','d','g','m'] },
  { letters: ['b','c','c','c','n','n'] },
  { letters: ['z','p','x','qu','j','v'] },
  { letters: ['w','p','f','g','k','qu'] },
  { letters: ['j','y','f','g','k','h'] },
  { letters: ['a','e','e','i','o','u'] },
  { letters: ['r','s','t','t','n','s'] },
  { letters: ['b','b','m','m','n','n'] },
  { letters: ['c','d','m','n','d','h'] },
  { letters: ['w','p','f','g','k','qu'] },
  { letters: ['b','b','d','d','d','m'] },
  { letters: ['j','y','f','g','k','h'] },
  { letters: ['a','a','e','i','o','e'] },
  { letters: ['r','s','t','t','n','s'] },
];

export function initialLetters() {
  const letters = [];
  for (let r = 0; r < GAME_SIZE.ROWS; r++) {
    letters.push([]);
    for (let c = 0; c < GAME_SIZE.COLUMNS; c++) {
      letters[r].push('x');
    }
  }
  return letters;
}

function randomLetter(dice) {
  const d = Math.floor(Math.random() * dice.length);
  const [die] = dice.splice(d, 1);
  const l = Math.floor(Math.random() * die.letters.length);
  const letter = die.letters[l];
  return letter;
}

export function randomLetters() {
  const dice = cloneDeep(DICE.slice(0, GAME_SIZE.ROWS * GAME_SIZE.COLUMNS));
  const letters = [];
  for (let r = 0; r < GAME_SIZE.ROWS; r++) {
    for (let c = 0; c < GAME_SIZE.COLUMNS; c++) {
      if (!letters[r]) {
        letters[r] = [];
      }
      letters[r][c] = randomLetter(dice)
    }
  }
  return letters;
}

function findWordFromPoint(word, r, c, letters, pigeon) {
  if (!word) {
    return true;
  }

  const height = letters.length;
  const width = letters[0].length;
  if (c > 0 && word.startsWith(letters[r][c-1]) && !pigeon[r][c-1]) {
    pigeon[r][c-1] = true;
    if (findWordFromPoint(word.substring(letters[r][c-1].length), r, c-1, letters, pigeon)) {
      return true;
    }
  }
  if (c > 0 && r > 0 && word.startsWith(letters[r-1][c-1]) && !pigeon[r-1][c-1]) {
    pigeon[r-1][c-1] = true;
    if (findWordFromPoint(word.substring(letters[r-1][c-1].length), r-1, c-1, letters, pigeon)) {
      return true;
    }
  }
  if (r > 0 && word.startsWith(letters[r-1][c]) && !pigeon[r-1][c]) {
    pigeon[r-1][c] = true;
    if (findWordFromPoint(word.substring(letters[r-1][c].length), r-1, c, letters, pigeon)) {
      return true;
    }
  }
  if (c < width - 1 && r > 0 && word.startsWith(letters[r-1][c+1]) && !pigeon[r-1][c+1]) {
    pigeon[r-1][c+1] = true;
    if (findWordFromPoint(word.substring(letters[r-1][c+1].length), r-1, c+1, letters, pigeon)) {
      return true;
    }
  }
  if (c < width - 1 && word.startsWith(letters[r][c+1]) && !pigeon[r][c+1]) {
    pigeon[r][c+1] = true;
    if (findWordFromPoint(word.substring(letters[r][c+1].length), r, c+1, letters, pigeon)) {
      return true;
    }
  }
  if (c < width - 1 && r < height - 1 && word.startsWith(letters[r+1][c+1]) && !pigeon[r+1][c+1]) {
    pigeon[r+1][c+1] = true;
    if (findWordFromPoint(word.substring(letters[r+1][c+1].length), r+1, c+1, letters, pigeon)) {
      return true;
    }
  }
  if (r < height - 1 && word.startsWith(letters[r+1][c]) && !pigeon[r+1][c]) {
    pigeon[r+1][c] = true;
    if (findWordFromPoint(word.substring(letters[r+1][c].length), r+1, c, letters, pigeon)) {
      return true;
    }
  }
  if (c > 0 && r < height - 1 && word.startsWith(letters[r+1][c-1]) && !pigeon[r+1][c-1]) {
    pigeon[r+1][c-1] = true;
    if (findWordFromPoint(word.substring(letters[r+1][c-1].length), r+1, c-1, letters, pigeon)) {
      return true;
    }
  }
  return false;
}

function createPigeonArray(letters) {
  return letters.map((row) => {
    return row.map(l => false);
  });
}

export function findWordInLetters(word, letters) {
  for (let r = 0; r < GAME_SIZE.ROWS; r++) {
    for (let c = 0; c < GAME_SIZE.COLUMNS; c++) {
      const letter = letters[r][c];
      if (word.startsWith(letter)) {
        const pigeon = createPigeonArray(letters);
        pigeon[r][c] = true;
        const found = findWordFromPoint(word.substring(letter.length), r, c, letters, pigeon);
        if (found) {
          return true;
        }
      }
    }
  }

  return false;
}
