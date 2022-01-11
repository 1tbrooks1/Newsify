
// DOM variables
let articleContainer = document.querySelector(".article-section");
let searchBtn = document.getElementById("search-button");
let sortChoice = document.querySelector(".dropdown-sort");
let outletChoice = document.querySelector("#press-names");
let categoryChoice = document.querySelector(".dropdown-category");
let languageChoice = document.querySelector(".dropdown-language");
let clearBtn = document.querySelector(".clear-button")
let keywordEL = document.querySelector("#keywords")
let excludedEl = document.querySelector("#excluding")


// global variables
let history = JSON.parse(localStorage.getItem("inputs")) || []

let userInputs = { source: "", topic: "", text: "", order: "", word: "", nothanks: "" }


function formSubmitHandler(event) {
    // to prevent page refresh on click
    event.preventDefault()
    // get values of dropdowns and inputs
    let outlet = outletChoice.value.trim();
    let category = categoryChoice.value;
    let language = languageChoice.value;
    let sort = sortChoice.value
    let keyword = keywordEL.value.trim()
    let excluded = excludedEl.value.trim()

    if (outlet || category || language || sort || keyword || excluded) // if any are entered
    {
        // if input combinations are unique, set to localstorage and show in history DOM
        if (userInputs.source !== outlet || userInputs.topic !== category ||
            userInputs.text !== language || userInputs.order !== sort ||
            userInputs.word !== keyword || userInputs.nothanks !== excluded) {

            userInputs = {
                source: outlet,
                topic: category,
                text: language,
                order: sort,
                word: keyword,
                nothanks: excluded
            }

            history.push(userInputs)
            localStorage.setItem("inputs", JSON.stringify(history))
            showHistory(history)
            // fetch api with inputs
            buildUrl(outlet, category, language, sort, keyword, excluded)

        } // otherwise, show old history anyways and fetch anyways
        else {
            showHistory(history)
            buildUrl(outlet, category, language, sort, keyword, excluded)

        }
    }

}

function buildUrl(outlet, category, language, sort, keyword, excluded) {
    const apiKey = "50db9deb9962e4e61015af3116dce036";

    let apiUrl = `http://api.mediastack.com/v1/news?sources=${outlet}&categories=${category}&languages=${language}&sort=${sort}&keywords=${keyword} -${excluded}&limit=5&access_key=${apiKey}`;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // display articles from data array on page
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
            // error 404: bad network connection.
            $("#network-error").foundation("open")
        });
}

function displayArticles(data) {
    // to refresh the display with every search
    articleContainer.innerHTML = ""

    for (i = 0; i < data.data.length; i++) {
        // dynamically create elements and assign textcontent to properties from data array objects

        let articleEl = document.createElement("div");

        articleEl.setAttribute("class", "border div")
        articleContainer.appendChild(articleEl);

        let articleTitle = document.createElement("h3");

        let articleStop = document.createElement("button");
        let articleStart = document.createElement("button");

        articleStart.textContent = "Start Article"
        articleStop.textContent = "Stop Article"


        articleStart.setAttribute("class", "button radius bordered shadow img");
        articleStop.setAttribute("class", "button radius bordered shadow img");


        articleTitle.textContent = data.data[i].title;
        responsiveVoice.speak(`${data.data[i].title}`);
        articleTitle.setAttribute("class", "title")
        articleEl.appendChild(articleTitle);

        // start and stop speaking the articles
        articleStart.addEventListener("click", function () {
            responsiveVoice.speak(`${articleTitle.textContent} 
            ${articleDescription.textContent} ${articleSource.textContent}`)
        })
        articleStop.addEventListener("click", function () {
            responsiveVoice.cancel();
        })


        let articleDescription = document.createElement("p");
        articleDescription.textContent = data.data[i].description;
        articleDescription.setAttribute("class", "text")

        responsiveVoice.speak(`Article description is ${data.data[i].description}`);
        articleEl.appendChild(articleDescription);

        let articleUrl = document.createElement("a");
        articleUrl.textContent = `URL: ${data.data[i].url}`;
        articleUrl.setAttribute("class", "text")
        articleEl.appendChild(articleUrl);

        let articleSource = document.createElement("p");
        articleSource.textContent = `Source: ${data.data[i].source}`;
        articleSource.setAttribute("class", "text")
        responsiveVoice.speak("The source of the article comes from");
        responsiveVoice.speak(data.data[i].source);
        articleEl.appendChild(articleSource);

        let articleImage = document.createElement("img");
        articleImage.setAttribute("src", data.data[i].image);
        articleImage.setAttribute("class", "img")

        // to prevent page clutter, remove null images
        if (data.data[i].image !== null || data.data[i].image !== ""
            || data.data[i].image !== `${null}`
            || data.data[i].image !== undefined) {
            articleEl.appendChild(articleImage)
        }
        // to make button elements display block
        let buttonDivEl = document.createElement("div")
        buttonDivEl.appendChild(articleStart)
        buttonDivEl.appendChild(articleStop)
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
        searchedInputEl.classList.add("history-button")
        // display content of old searches to distinguish between them along with index of search
        searchedInputEl.textContent =
            `${i + 1}.${history[i].source} ${history[i].topic} ${history[i].text} ${history[i].word} ${history[i].nothanks}`
        searchedInputEl.style.display = "block"
        // fetch the api with old searches
        searchedInputEl.addEventListener("click", function () {
            buildUrl(history[i].source, history[i].topic, history[i].text, history[i].order, history[i].word, history[i].nothanks)
        })
    }
}

function clearHistory() {
    // clear localstorage
    localStorage.clear()

    history = []
    // show cleared history DOM
    showHistory(history)
}


// submits inputs to fetch api data 
searchBtn.addEventListener("click", formSubmitHandler);
// clears local storage and search history DOM
clearBtn.addEventListener("click", clearHistory)
// allow search history to persist on refresh
showHistory(history)


