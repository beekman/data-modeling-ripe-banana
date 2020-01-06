const fetch = require('node-fetch');


// promise
//   .then(fulfilledValue => {

//   })
//   .catch(err => {

//   })
//   .finally(() => {

//   });

async function getCharacters() {
  const res = await fetch('https://rickandmortyapi.com/api/character/');
  const characters = await res.json();
  console.log(json);
  return characters;
}


// Promise
// pending
// resolved
// rejected
let characters;
const promise = getCharacters()
  .then(c => {
    characters = c;
  })
  .then(() => {
    console.log(characters);
  });

console.log(promise);

setTimeout(() => {
  console.log(promise);


}, 2000);
