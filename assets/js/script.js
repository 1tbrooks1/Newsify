// DOM variables
var sourceEl = document.querySelector("");
var categoryEL = document.querySelector("");
var languageEl = document.querySelector("");


function sourceInput() {

    let outletChoice = document.querySelector(".source");
    let outlet = outletChoice.value().trim();
    console.log(outlet);
    buildUrl(outlet);

};

function categoryDd() {

    let categoryChoice = document.querySelector(".category");
    let category = categoryChoice.value;
    console.log(category);
    buildUrl(category);

};

function languageDd() {

    let languageChoice = document.querySelector(".language");
    let language = languageChoice.value;
    console.log(language);
    buildUrl(language);

};

function sortList() {

    let sortChoice = document.querySelector(".sort");
    let sort = sortChoice.value;
    console.log(sort);
    buildUrl(sort);
    displayArticles();
    
}

function getDate() {

    let from = document.querySelector(".from");
    let until = document.querySelector(".until");
    let date1 = from.value();
    let date2 = until.value();
    buildUrl(date1, date2);
    
}

function buildUrl(outlet, category, language, sort, date1, date2) {
    const apiKey = "afe8ca7e3a00ff67fd299fec29cce5c7";
    let apiUrl = `http://api.mediastack.com/v1/news?sources=${outlet}&categories=${category}&languages=${language}&sort=${sort}&date=${date1},${date2}&access_key=${apiKey}`

    if (outlet || category || language) {
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
            console.log(data);
            displayArticles(data);    
        })
        }
       else // response failed {
        // modal: error: Articles not found.
       }
    })
    .catch(function(error) {
        // modal?
    })
}
}

function displayArticles(data) {
    for(i=0; i < data.length; i++) {

    }
}











searchBtn.addEventListener("click", buildUrl);

//user inputs category (general could be default? dropdown), source (typed in: grab value and trim), 
//language (dropdown)
    // at least one input otherwise error message modal
//fetches api using appropriate parameters
    //foundation: find display none and put that for homepage, 
    //and then we change that attribute once the input is entered
//modal + calendar: sort dropdown with popularity and/or publish date
    //hidden on homepage, shows up after search in the news title element
    // user clicks on sort and pulls up modal
    //fetches api with sort
// pulls up articles within specified parameters 

//when they click on the article the speaker starts reading the text
    //use modal to change aspects of speaker
    //they can change the voice, pitch, rate, and volume of the speaker
    
//they have the option to save the search inputs into a "playlist"
    // pull up new modal from save button 
    // saves to local storage
    // button on the homepage to get the item from local storage (if not  null)
    // send the user to a new htmL?
    // get item from local storage to persist on homepage?
        //can this playlist update automatically with most recent posts from sources/category
        // set attribute to display visible