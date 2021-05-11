const cardSuits = ["D", "C", "S", "H"];
const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
let boardDk = [];
competitors = [];
currentCompetitor = 0;


const boardDkCreation = () => {
  boardDk = [];

  for (let boardDkcard of ranks) {
    // console.log(boardDkcard)
    for (let suits of cardSuits) {
      //  console.log(suits)
    //   console.log(ranks[suits] + cardSuits[boardDkcard]);
      let values = parseInt(ranks[boardDkcard]);
      if (
        ranks[boardDkcard] == "J" ||
        ranks[boardDkcard] == "Q" ||
        ranks[boardDkcard] == "K"
      )
        values = 10;
      if (ranks[boardDkcard] == "A") values = 11;
      let card = {
        Rank: ranks[boardDkcard],
        Suit: cardSuits[suits],
        Value: values,
      };
      boardDk.push(card);
    }
  }
};
// boardDkCreation();


const playersCreated = (number) => {
  competitors = [];
  for (let num of number) {
    let playHand = [];
    let player = { Name: "Player " + num, ID: num, scored: 0, Hand: playHand };
    cardplayers.push(player);
  }
};

const userInterface = () =>{
    document.querySelector('competitors').innerHTML = '';

    for(let ply of competitors){

        let divP = document.createElement('div');
        document.querySelector('players').appendChild(divP); 
        divP.className = 'player';
        divP.id = 'player_' + ply;
        divP.appendChild(divPI);
        divP.appendChild(divH);
        divP.appendChild(divPts);
        

        let divPI = document.createElement('div');
        divPI.innerHTML = 'Player ' + players[ply].ID;

        let divH = document.createElement('div');
        divH.id = 'hand_' + ply;

        let divPts = document.createElement('div');
        divPts.className = 'scored';
        divPts.id = 'scored_' + ply;

        console.log(divP)
    }

}
