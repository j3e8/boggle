import wordlist from './wordlists/en-US.json';
const dictionary = buildTrie(wordlist);

function addToTrie(node, word) {
  if (!word) {
    node._word = true;
    return;
  }

  const ch = word.substring(0, 1);
  if (!node[ch]) {
    node[ch] = {};
  }

  addToTrie(node[ch], word.substring(1));
}

function buildTrie(list) {
  const root = {};

  list.forEach((word) => {
    addToTrie(root, word.toLowerCase());
  });

  return root;
}

function findInTrie(node, word) {
  if (!word && node._word) {
    return true;
  }

  const ch = word.substring(0, 1);
  if (!node[ch]) {
    return false;
  }

  return findInTrie(node[ch], word.substring(1));
}

export function checkWord(word) {
  return findInTrie(dictionary, word.toLowerCase());
}
