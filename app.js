const cards = ['Diamonds', 'Clubs', 'Spades', 'Hearts'];
const figures = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let boardDk = new Array();


const deckCreation = () => {

     boardDk = new Array();

    for (let deckcard of figures) {
        // console.log(deckcard)
         for (let suits of cards) {
         let  values = parseInt(figures[deckcard]);
             if (figures[deckcard] == 'J' || figures[deckcard] == 'Q'|| figures[deckcard] == 'K')
                 values = 10;
         if (figures[deckcard] == 'A')
             values = 11;
            let card = {
                Figures: figures[deckcard],
                 Suit: cards[suits],
                 Values: values
         };
            deck.push(card);
        }
    }
}
deckCreation();

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')