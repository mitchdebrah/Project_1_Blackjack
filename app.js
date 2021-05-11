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
    let player = { Name: "Player " + num, ID: num, Scored: 0, Hand: playHand };
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
        divPts.className = 'scorepts';
        divPts.id = 'scorepts_' + ply;

        console.log(divP)
    }

}
// got inspiration from a popular card shuffle code
const cardShuffle = () =>{
    for (let i = 0; i < 200; i++){
            
        let placement0 = Math.floor((Math.random() * boardDk.length));
        let placement1 = Math.floor((Math.random() * boardDk.length));
        let spot = boardDk[placement0];

        boardDk[placement0] = boardDk[placement1];
        boardDk[placement1] = spot;
    }
}

const beginBJGame = ()=>{
    document.querySelector('reset').value = 'Reset';
    document.querySelector("status").style.display="none";
    boardDkCreation();
    playersCreated(2);
    cardShuffle();
    userInterface();
    document.querySelector('player_' + currentCompetitor).classList.add('active');
    dealerhand();

    currentCompetitor = 0;


}

const dealerhand = ()=>{ // distributes the cards to the players each player gets two cards.
    for(let j = 0; j < 2; j++){
        for(let comp of competitors){
            let card = boardDk.pop();
            competitors[comp].Hand.push(card);
            displayCard(card, comp);
            newScores();

        }
    }

    newDeck();


}


const displayCard = (card, player)=>{
    let hd = document.getElementById('hand_' + player);
    hd.appendChild(cardInterface(card));

}

const cardInterface = (card) =>{
    let intface = document.createElement('div');
    let symbol = '';
    if (card.Suit == 'H')
    symbol = '&hearts;'
    else if (card.Suit == 'S')
    symbol = '&spades;'
    else if(card.Suit == 'D')
    symbol = '&diamonds'
    else 
    symbol ='&clubs;'


    intface .className = 'card';
    intface .innerHTML = card.Rank + '<br/>' + symbol;
    return intface;

    


    
    
    
    
    

    
}

const getScores = (player) =>{ // returns the number of points at hand
    let scores = 0;
    for(let pts of competitors[player].Hand.length){
      scores += competitors[player].Hand[pts].Value

    }
    competitors[player].Scored = scores;
    return scores;


    
}
const newScores = () =>{
  for(let newsc of competitors.length){
    getScores();
    document.getElementById('scorepts_' + newsc).innerHTML = competitors[newsc].Scored
  }
}

const hit = ()=>{  // removes card from deck to player and chesk for points over 21
  let cardplayed = boardDk.pop();
  competitors[currentCompetitor].Hand.push(cardplayed)
  displayCard(card, currentCompetitor)
  newScores();
  newDeck();
  dealChk();
}

const stand = () =>{ // alternates between players
  if (currentCompetitor != competitors.length -1){
    document.getElementById('player_' + currentCompetitor).classList.remove('active')
    currentCompetitor += 1;
    document.getElementById('player_' + currentCompetitor).classList.add('active')
  }
  else {
    gameOver();
  }

}
