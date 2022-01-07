// DOM variables
var articleContainer = document.querySelector(".article-section");

function sourceInput() {
    let outletChoice = document.querySelector("#press-names");
    let outlet = outletChoice.value.trim();
    console.log(outlet);
    buildUrl(outlet);
}

function categoryDd() {
    let categoryChoice = document.querySelector(".dropdown-category");
    let category = categoryChoice.value;
    console.log(category);
    buildUrl(category);
}

function languageDd() {
    let languageChoice = document.querySelector(".dropdown-language");
    let language = languageChoice.value;
    console.log(language);
    buildUrl(language);
}

// needs to be dropdown in html, wont work possibly like this
function sortList() {
    let sortChoice = document.querySelector(".control-panel");
    let sort = sortChoice.value;
    console.log(sort);
    buildUrl(sort);
    displayArticles();
}

function getDate() {
    let from = document.querySelector(".from");
    let until = document.querySelector(".until");
    let date1 = from.value;
    let date2 = until.value;
    buildUrl(date1, date2);
}

function buildUrl(outlet, category, language, sort, date1, date2) {
    const apiKey = "afe8ca7e3a00ff67fd299fec29cce5c7";
    let apiUrl = `http://api.mediastack.com/v1/news?sources=${outlet}&categories=${category}&languages=${language}&sort=${sort}&date=${date1},${date2}&access_key=${apiKey}`;

    if (outlet || category || language) {
        fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                        displayArticles(data);
                        //local storage function call
                    });
                } else {
                    // response failed
                    let error1 = document.querySelector("#no-articles")
                    error1.setAttribute("class", "reveal")
                    // not sure if blank quotes work to set attribute instead of class
                    error1.setAttribute("", "data-reveal")
                    let error1Btn = document.querySelector("#no-articles-btn")
                    error1Btn.setAttribute("", "data-close")
                }
            })
            .catch(function (error) {
                // modal: error 404: bad network connection.
                // let error1 = document.querySelector("#no-articles")
                //     error1.setAttribute("class", "reveal")
                //     // not sure if blank quotes work to set attribute instead of class
                //     error1.setAttribute("", "data-reveal")
                //     let error1Btn = document.querySelector("#no-articles-btn")
                //     error1Btn.setAttribute("", "data-close")
            });
    } else if (!outlet && !category && !language) {
        // modal: You must input atleast one of the parameters in the search box.
        // let error1 = document.querySelector("#no-articles")
        //             error1.setAttribute("class", "reveal")
        //             // not sure if blank quotes work to set attribute instead of class
        //             error1.setAttribute("", "data-reveal")
        //             let error1Btn = document.querySelector("#no-articles-btn")
        //             error1Btn.setAttribute("", "data-close")
    }
}

function displayArticles(data) {
    for (i = 0; i < data.length; i++) {
        let articleEl = document.createElement("div");
        articleContainer.appendChild(articleEl);

        let articleTitle = document.createElement("h4");
        articleTitle.textContent = data.data[i].title;
        articleEl.appendChild(articleTitle);

        let articleDescription = document.createElement("p");
        articleDescription.textContent = data.data[i].description;
        articleTitle.appendChild(articleDescription);

        let articleUrl = document.createElement("a");
        articleUrl.text = data.data[i].url;
        articleTitle.appendChild(articleUrl);

        let articleSource = document.createElement("p");
        articleSource.textContent = data.data[i].source;
        articleTitle.appendChild(articleSource);

        let articleImage = document.createElement("img");
        articleImage.setAttribute("src", data.data[i].image);
        articleTitle.appendChild(articleImage);

        // speaker button dynamically generates
        // event listener for read information

        readInformation(articleTitle, articleDescription, articleSource);
    }
}

function readInformation(title, description, source) {


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
