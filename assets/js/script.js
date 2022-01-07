//user inputs category (general could be default? dropdown), source (typed in: grab value and trim), 
//language (dropdown)
    // at least one input otherwise error message modal
    // this dynamically generates a search history input button on the page
//fetches api using appropriate parameters
    //foundation: find display none and put that for homepage, 
    //and then we change that attribute once the input is entered

// DOM variables
var articleContainer = document.querySelector(".article-section");
let searchBtn = document.getElementById("search-button")

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

// not sure if display articles will work here 
function sortList() {
    let sortChoice = document.querySelector(".dropdown-sort");
    let sort = sortChoice.value;
    console.log(sort);
    buildUrl(sort);
    displayArticles();
}

/*function getDate() {
    let from = document.querySelector(".from");
    let until = document.querySelector(".until");
    let date1 = from.value;
    let date2 = until.value;
    buildUrl(date1, date2);
}*/

function formSubmitHandler(event) {
    event.preventDefault()
    console.log("working");
    let outletChoice = document.querySelector("#press-names");
    let outlet = outletChoice.value.trim();
    let categoryChoice = document.querySelector(".dropdown-category");
    let category = categoryChoice.value;
    let languageChoice = document.querySelector(".dropdown-language");
    let language = languageChoice.value;


    if (outlet || category || language) {
      buildUrl(outlet, category, language)
    }
    else // edge case for no input
     {
         // modal: You must input atleast one of the parameters in the search box.
         let error3 = document.querySelector("#wrong-input")
         error3.setAttribute("class", "reveal")
         error3.setAttribute("class", "block")
         // not sure if blank quotes work to set attribute instead of class
         error3.setAttribute("", "data-reveal")
         let error3Btn = document.querySelector("#wrong-input-btn")
         error3Btn.setAttribute("", "data-close")
         error3Btn.addEventListener("click", function(){
             error3.setAttribute("class", "none")
    })
     

}
}


function buildUrl(outlet, category, language) {
    const apiKey = "afe8ca7e3a00ff67fd299fec29cce5c7";
    let apiUrl = `http://api.mediastack.com/v1/news?sources=${outlet}&categories=${category}&languages=${language}&access_key=${apiKey}`;

        fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(response);
                        console.log(data);
                        displayArticles(data);
                        //local storage function call
                    });
                } else {
                    // response failed
                    let error1 = document.querySelector("#no-articles")
                    error1.setAttribute("class", "reveal")
                    error1.setAttribute("class", "block")
                    // not sure if blank quotes work to set attribute instead of class
                    error1.setAttribute("", "data-reveal")
                    let error1Btn = document.querySelector("#no-articles-btn")
                    error1Btn.setAttribute("", "data-close")
                    error1Btn.addEventListener("click", function(){
                        error1.setAttribute("class", "none")
                    })
                }
            })
            .catch(function (error) {
                // modal: error 404: bad network connection.
                let error2 = document.querySelector("#network-error")
                error2.setAttribute("class", "reveal")
                error2.setAttribute("class", "block")
                // not sure if blank quotes work to set attribute instead of class
                error2.setAttribute("", "data-reveal")
                let error2Btn = document.querySelector("#network-error-btn")
                error2Btn.setAttribute("", "data-close")
                error2Btn.addEventListener("click", function(){
                    error2.setAttribute("class", "none")
                })
            });
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




searchBtn.addEventListener("click", formSubmitHandler);










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
    // when they save the speaker charcateristics, this also dynamically saves
    //to homepage

    




//wish list
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
