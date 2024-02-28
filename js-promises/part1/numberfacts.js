let favNum = 9;
let baseURL = "http://numbersapi.com"


//1. Make a request to the Numbers API to get a fact about your favorite number.
async function favNum() {
    let data = await $.getJSON(`${baseURL}/${favNum}?json`)
    console.log(data);
}
favNum()
//2. Figure out how to get data on multiple numbers in a single request, make that request and when you get the data back put all of the number facts on the page
let favNums = [3, 9, 15];
async function favoriteNums() {
    let data = await $.getJSON(`${baseURL}/${favNums}?json`)
    console.log(data);
}
favoriteNums()
//3. use API to get 4 facts on your favorite number. Once you have them all, put them on the page.
async function favNumFact() {
    let facts = await Promise.all(
        Array.from({length: 4}, () => $.getJSON(`${baseURL}/${favNum}?json`))
    );
    facts.forEach(data => {
        $('body').append(`<p>${data.text}</p>`);
    });
}
favNumFact()