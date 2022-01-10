//user inputs category (general could be default? dropdown), source (typed in: grab value and trim), 
//language (dropdown)
// at least one input otherwise error message modal
// this dynamically generates a search history input button on the page
//fetches api using appropriate parameters
//foundation: find display none and put that for homepage, 
//and then we change that attribute once the input is entered

// DOM variables
let articleContainer = document.querySelector(".article-section");
let searchBtn = document.getElementById("search-button");
let volumeEl = document.querySelector(".speaker-volume");
let pitchEl = document.querySelector(".pitch-rate");
let rateEl = document.querySelector(".rate");
let sortChoice = document.querySelector(".dropdown-sort");
let clearBtn = document.querySelector(".clear-button")

// global variables
let history = JSON.parse(localStorage.getItem("inputs")) || []
let userInputs = { source: "", topic: "", text: "", order: "" }

// tied to an event listener at the bottom, operational
// function sortList(outlet, category, language) {
//     let sort = sortChoice.value;
//     console.log(sort);
//     buildUrl(outlet, category, language, sort)
// }

/*function getDate() {
    let from = document.querySelector("#from-date");
    let until = document.querySelector("#to-date");
    let date1 = from.value;
    let date2 = until.value;
    buildUrl(date1, date2);
}*/

// operational
function setVolumes() {
    speakerVolume = volumeEl.value;
    console.log("volume: " + speakerVolume);
    pitchRate = pitchEl.value;
    console.log("pitch: " + pitchRate);
    speedRate = rateEl.value;
    console.log("rate: " + speedRate);

    speakerSettings(speakerVolume, pitchRate, speedRate);
}

// not working at the moment
function speakerSettings(sVolume, sPitch, sRate) {
    console.log(sVolume, sPitch, sRate);
    responsiveVoice.speak({ volume: sVolume }, { pitch: sPitch }, { rate: sRate });
    console.log(volume.value, pitch.value, rate.value);
}

function formSubmitHandler(event) {
    event.preventDefault()
    // get values of dropdowns
    let outletChoice = document.querySelector("#press-names");
    let outlet = outletChoice.value.trim();
    let categoryChoice = document.querySelector(".dropdown-category");
    let category = categoryChoice.value;
    let languageChoice = document.querySelector(".dropdown-language");
    let language = languageChoice.value;
    let sort = sortChoice.value



    if (outlet || category || language || sort) {
        // if input combinations are unique, set to localstorage and show in history DOM
        if (userInputs.source !== outlet ||
            userInputs.topic !== category ||
            userInputs.text !== language ||
            userInputs.order !== sort) {

            userInputs = {
                source: outlet,
                topic: category,
                text: language,
                order: sort
            }
            history.push(userInputs)
            localStorage.setItem("inputs", JSON.stringify(history))
            showHistory(history)
            //sortList(outlet, category, language)

            buildUrl(outlet, category, language, sort)


        } // otherwise, show history anyways
        // else if (sort) { // Sorts the way news is presented: ***not refreshing display on click
        //     sortChoice.addEventListener("click", function () {

        //         buildUrl(outlet, category, language, sort)

        //     })
        // }
        else {
            showHistory(history)

        }
    }

}


function buildUrl(outlet, category, language, sort) {
    const apiKey = "afe8ca7e3a00ff67fd299fec29cce5c7";
    // its saying sort comes up undefined
    let apiUrl = `http://api.mediastack.com/v1/news?sources=${outlet}&categories=${category}&languages=${language}&sort=${sort}&limit=5&access_key=${apiKey}`;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(response);
                    console.log(data);
                    displayArticles(data);

                    if (data.data.length === 0) {
                        // if response succeeds but returns nothing
                        $("#no-articles").foundation("open")
                    }
                });
            } else {
                // response failed
                $("#wrong-input").foundation("open")
            }
        })
        .catch(function (error) {
            // modal: error 404: bad network connection.
            $("#network-error").foundation("open")
        });
}

function displayArticles(data) {
    // to refresh the display with every search
    articleContainer.innerHTML = ""
    for (i = 0; i < data.data.length; i++) {

        let articleEl = document.createElement("div");
        // margin doesnt work
        articleEl.setAttribute("class", "border margin-bottom-2")
        articleContainer.appendChild(articleEl);

        let articleTitle = document.createElement("h3");
        let articleStop = document.createElement("button");
        let articleStart = document.createElement("button");
        let nextBtn= document.createElement("button")
        articleStart.textContent = "Start Article"
        articleStop.textContent = "Stop Article"
        nextBtn.textContent = "Skip"
        // margin doesnt work here either 
        articleStart.setAttribute("class", "button radius bordered shadow margin-2");
        articleStop.setAttribute("class", "button radius bordered shadow margin-2");
        nextBtn.setAttribute("class", "button radius bordered shadow margin-2 primary");

        articleTitle.textContent = data.data[i].title;
        articleEl.appendChild(articleTitle);

        responsiveVoice.speak(data.data[i].title);

        articleStart.addEventListener("click", function () {
            responsiveVoice.speak(`${articleTitle.textContent} ${articleDescription.textContent} ${articleSource.textContent}`);
        })
        articleStop.addEventListener("click", function () {
            responsiveVoice.pause();
        }) 
        // next btn doesnt skip because doesnt read title
        nextBtn.addEventListener("click", function(){ 
            console.log("skip")
            responsiveVoice.cancel()
            responsiveVoice.speak(`${data.data[i+1].title} 
            Article description is ${data.data[i+1].description}
            The source of the article comes from ${data.data[i+1].source}`)
            console.log(data.data[i+1].title)
        })

        let articleDescription = document.createElement("p");
        articleDescription.textContent = data.data[i].description;

        responsiveVoice.speak(`Article description is ${data.data[i].description}`);
        articleEl.appendChild(articleDescription);

        let articleUrl = document.createElement("a");
        articleUrl.textContent = `URL: ${data.data[i].url}`;
        articleEl.appendChild(articleUrl);

        let articleSource = document.createElement("p");
        articleSource.textContent = `Source: ${data.data[i].source}`;
        responsiveVoice.speak("The source of the article comes from");
        responsiveVoice.speak(data.data[i].source);
        articleEl.appendChild(articleSource);

        let articleImage = document.createElement("img");
        articleImage.setAttribute("src", data.data[i].image);
        // to prevent page clutter, remove null images
        if (data.data[i].image !== null) {
            articleEl.appendChild(articleImage)
        }
        // to make button elements display block
        let buttonDivEl = document.createElement("div")
        buttonDivEl.appendChild(articleStart)
        buttonDivEl.appendChild(articleStop)
        buttonDivEl.appendChild(nextBtn)
        articleEl.appendChild(buttonDivEl)
    }
}

function showHistory(history) {
    let searchHistoryEl = document.getElementById("search-history")
    // to allow it to clear when clear button is pressed
    searchHistoryEl.innerHTML = ""
    for (let i = 0; i < history.length; i++) {
        let searchedInputEl = document.createElement("button")
        searchHistoryEl.appendChild(searchedInputEl)
        searchHistoryEl.setAttribute("style", "display:flex-column")
        searchedInputEl.classList.add("search-button")
        searchedInputEl.textContent = `${i + 1}.${history[i].source} ${history[i].topic} ${history[i].text}`
        searchedInputEl.style.display = "block"
        // fetch the api with old searches
        searchedInputEl.addEventListener("click", function () {
            buildUrl(history[i].source, history[i].topic, history[i].text, history[i].order)
        })
    }
}

function clearHistory() {
    localStorage.clear()

    history = []
    // show cleared history DOM
    showHistory(history)
}



// Event Listeners
// Starts app
searchBtn.addEventListener("click", formSubmitHandler);

// Sets volume settings
volumeEl.addEventListener("click", setVolumes);
pitchEl.addEventListener("click", setVolumes);
rateEl.addEventListener("click", setVolumes);


// clears local storage and search history DOM
clearBtn.addEventListener("click", clearHistory)
// allow search history to persist on refresh
showHistory(history)







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
