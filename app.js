let boardDk = [];
let competitors = [];
let currentCompetitor = 0;

const boardDkCreation = () => {
  boardDk = [];
  const cardSuits = ["S", "H", "D", "C"];
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

  for (let i = 0; i < ranks.length; i++) {
    for (let n = 0; n < cardSuits.length; n++) {
      let values = parseInt(ranks[i]);
      if (ranks[i] == "J" || ranks[i] == "Q" || ranks[i] == "K") values = 10;
      if (ranks[i] == "A") values = 11;
      let card = {
        Rank: ranks[i],
        Suit: cardSuits[n],
        Value: values,
      };
      boardDk.push(card);
    }
  }
};

const playersCreated = (number) => {
  competitors = [];
  for (let i = 1; i <= number; i++) {
    let hand = [];
    let player = {
      Name: "Player " + i,
      ID: i,
      Scored: 0,
      Hand: hand,
    };
    competitors.push(player);
  }
};

const userInterface = () => {
  document.getElementById("competitors").innerHTML = "";

  for (let e = 0; e < competitors.length; e++) {
    let playdiv = document.createElement("div");
    playdiv.id = "player_" + e;
    playdiv.className = "player";

    let playdivid = document.createElement("div");
    playdivid.innerHTML = "Player" + competitors[e].ID;

    let handiv = document.createElement("div");
    handiv.id = "hand_" + e;

    let pointdiv = document.createElement("div");
    pointdiv.className = "scorepts";
    pointdiv.id = "scorepts_" + e;

    playdiv.appendChild(playdivid);
    playdiv.appendChild(handiv);
    playdiv.appendChild(pointdiv);

    document.getElementById("competitors").appendChild(playdiv);
  }
};
// got inspiration from a popular card shuffle code
const cardShuffle = () => {
  for (let i = 0; i < 200; i++) {
    let placement0 = Math.floor(Math.random() * boardDk.length);
    let placement1 = Math.floor(Math.random() * boardDk.length);
    let spot = boardDk[placement0];

    boardDk[placement0] = boardDk[placement1];
    boardDk[placement1] = spot;
  }
};

const beginBJGame = () => {
  document.getElementById("reset").value = "DEAL";
  currentCompetitor = 0;
  boardDkCreation();
  cardShuffle();
  playersCreated(2);

  userInterface();
  document
    .getElementById("player_" + currentCompetitor)
    .classList.add("current");
  dealerhand();
};

const dealerhand = () => {
  // distributes the cards to the players each player gets two cards.
  for (let j = 0; j < 2; j++) {
    for (let q = 0; q < competitors.length; q++) {
      let card = boardDk.pop();
      competitors[q].Hand.push(card);
      displayCard(card, q);
      newScores();
    }
  }

  newDeck();
};

//// created card symbols and userInterface, will updated to a colored image through CSS
const displayCard = (card, player) => {
  let hand = document.getElementById("hand_" + player);
  hand.appendChild(cardInterface(card));
};

const cardInterface = (card) => {
  let intface = document.createElement("div");
  let symbol = "";

  if (card.Suit == "H") {
    symbol = "&#9829;";
  } else if (card.Suit == "S") {
    symbol = "&#9824;";
  } else if (card.Suit == "D") {
    symbol = "&#9830;";
  } else {
    symbol = "&#9827;";
  }

  intface.className = "card";
  intface.innerHTML = card.Rank + "<br/>" + symbol;
  return intface;
};

const getScores = (player) => {
  // returns the number of points at hand
  let scorpts = 0;
  for (let j = 0; j < competitors[player].Hand.length; j++) {
    scorpts += competitors[player].Hand[j].Value;
  }
  competitors[player].Scored = scorpts;
  return scorpts;
};
const newScores = () => {
  for (let i = 0; i < competitors.length; i++) {
    getScores(i);
    document.getElementById("scorepts_" + i).innerHTML = competitors[i].Scored;
  }
};

const hit = () => {
  // removes card from deck to player and chesk for points over 21
  let card = boardDk.pop();
  competitors[currentCompetitor].Hand.push(card);
  displayCard(card, currentCompetitor);
  newScores();
  newDeck();
  dealChk();
};

const stand = () => {
  // moves to the next player or alternates between players
  if (currentCompetitor != competitors.length - 1) {
    document
      .getElementById("player_" + currentCompetitor)
      .classList.remove("current");
    currentCompetitor += 1;
    document
      .getElementById("player_" + currentCompetitor)
      .classList.add("current");
  } else {
    gameOver();
  }
};

// ends the game if one of the player's scores more  than 21 pts and the other has less  the total needed points to win.
const gameOver = () => { 
  let Winner_is = "";
  let pointscored = 0;
  for (let vic = 0; vic < competitors.length; vic++) {
    if (competitors[vic].Scored > pointscored && competitors[vic].Scored < 22) {
      Winner_is = vic;
    }
    pointscored = competitors[vic].Scored;
  }
  document.getElementById("stateOfGame").innerHTML =
    "Player  " + competitors[Winner_is].ID + ": Won !!";
  document.getElementById("stateOfGame").style.display = "inline-block";
};


const dealChk = () => {
  // displays and check player who lost the game, and scored more than the needed points.
  if (competitors[currentCompetitor].Scored > 21) {
    document.getElementById("stateOfGame").innerHTML =
      "Player " + competitors[currentCompetitor].ID + ":  Lost";

    document.getElementById("stateOfGame").style.display = "inline-block";
  }
};

const drawGame = () => {
  let draw = "";
  let ptsSore = 0;
  for (let dr = 0; dr < competitors.length; dr++) {
    if (
      competitors[dr].Scored === ptsSore &&
      competitors[dr].Scored === ptsSore
    ) {
      draw = dr;
      ptsSore = competitors[dr].Scored;
    }
    
  document.getElementById("stateOfGame").innerHTML =
      "Player  " + competitors[draw].ID + ": Draw !!";
  }
  document.getElementById("stateOfGame").style.display = "inline-block";
};

const newDeck = () => {
  document.getElementById("total-number-cards").innerHTML = boardDk.length;
};

boardDkCreation();
cardShuffle();
playersCreated();
