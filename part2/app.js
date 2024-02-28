$(function() {
    let baseURL = 'https://deckofcardsapi.com/api/deck';

//1. Make a request tot the apii to request a single card from a newly shuffles deck. 
async function part1() {
    let data = await $.getJSON(`${baseURL}/new/draw/`);
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
}
//2. Make a request to the deck of cards api to request a single card from a newly shuffled deck. Once you have the card, make a request to the same api to get one more card from the same deck.
async function part2() {
    let firstCard = await $.getJSON(`${baseURL}/new/draw/`);
    let deckId = firstCard.deck_id;
    let secondCard = await $.getJSON(`${baseURL}/${deckId}/draw/`);
    [firstCard, secondCard].forEach(card => {
        let { suit, value } = card.cards;
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
    })
}
//3. Build an html page that lets you draw cards from the deck. When the page loads, go to the api to create a new deck, and show a button on the page that will et you draw a card
async function setUp() {
    let $btn = $('button');
    let $cardArea = $('#card-area');

    let deck = await $.getJSON(`${baseURL}/new/shuffle/`);
    $btn.show().on('click', async function() {
        let card = await $.getJSON(`${baseURL}/${deck.deck_id}/draw/`);
        let cardSrc = card.cards[0].image;
        let angle = Math.random() * 90 -45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.randowm() * 40 - 20;
        $cardArea.append(
            $('<img>'), {
                src: cardSrc,
                css: {
                    transform: `translate(${randomX}px, ${randomY}px), rotate(${angle}deg)`
                }
            }
        )
    })
    if (card.remaining === 0) $btn.remove();
}
setUp()
})
