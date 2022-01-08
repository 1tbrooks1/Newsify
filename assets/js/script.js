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

// tied to an event listener at the bottom, operational
function sortList() {
    let sort = sortChoice.value;
    console.log(sort);
    // buildUrl(sort);
    // displayArticles();
}

/*function getDate() {
    let from = document.querySelector(".from");
    let until = document.querySelector(".until");
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
    responsiveVoice.speak({volume: sVolume}, {pitch: sPitch}, {rate: sRate});
    console.log(volume.value, pitch.value, rate.value);
}

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
        console.log(category, outlet);
      buildUrl(outlet, category, language)
    }
    else // edge case for no input
     {
         // modal: You must input at least one of the parameters in the search box.
     

}
}


function buildUrl(outlet, category, language, sort) {
    const apiKey = "afe8ca7e3a00ff67fd299fec29cce5c7";
    let apiUrl = `http://api.mediastack.com/v1/news?sources=${outlet}&categories=${category}&languages=${language}&sort=${sort}&limit=5&access_key=${apiKey}`;

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
                    $("#no-articles").foundation("open")
                }
            })
            .catch(function (error) {
                // modal: error 404: bad network connection.
                $("#network-error").foundation("open")
            });
}

function displayArticles(data) {
    console.log(data)
    for (i = 0; i < data.data.length; i++) {
        let articleEl = document.createElement("div");
        articleContainer.appendChild(articleEl);

        let articleTitle = document.createElement("h3");
        let articleStop = document.createElement("button");
        let articleStart = document.createElement("button");

        articleStart.classList.add("button");
        articleStop.classList.add("button");

        articleStart.textContent = "Start Article"
        articleStop.textContent = "Stop Article"

        articleTitle.textContent = data.data[i].title;

        responsiveVoice.speak(data.data[i].title);
        articleStart.addEventListener("click", function() {
            responsiveVoice.speak(articleTitle.textContent);
        })
        articleStop.addEventListener("click", function() {
            responsiveVoice.cancel();
        })
        articleEl.appendChild(articleTitle);
        

        let articleDescription = document.createElement("p");
        articleDescription.textContent = data.data[i].description;
        responsiveVoice.speak("Article description is");
        responsiveVoice.speak(data.data[i].description);
        articleEl.appendChild(articleDescription);

        let articleUrl = document.createElement("a");
        articleUrl.text = data.data[i].url;
        articleEl.appendChild(articleUrl);

        let articleSource = document.createElement("p");
        articleSource.textContent = data.data[i].source;
        responsiveVoice.speak("The source of the article comes from");
        responsiveVoice.speak(data.data[i].source);
        articleEl.appendChild(articleSource);

        let articleImage = document.createElement("img");
        articleImage.setAttribute("src", data.data[i].image);
        articleEl.appendChild(articleImage);

        articleEl.appendChild(articleStart);
        articleEl.appendChild(articleStop);

        // speaker button dynamically generates
        // event listener for read information

        // readInformation(articleTitle, articleDescription, articleSource);
    }
}



// Event Listeners
// Starts app
searchBtn.addEventListener("click", formSubmitHandler);

// Sets volume settings
volumeEl.addEventListener("click", setVolumes);
pitchEl.addEventListener("click", setVolumes);
rateEl.addEventListener("click", setVolumes);

// Sorts the way news is presented
sortChoice.addEventListener("click", sortList);










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
