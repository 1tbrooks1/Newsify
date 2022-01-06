let noArticleModal = document.getElementById("no-articles")

let searchBtn = document.getElementById("search-button")

let noArticlesBtn = document.getElementById("no-articles-btn")

searchBtn.onclick = function(event) {
    event.preventDefault()
    noArticleModal.style.display = "block";
}

noArticlesBtn.onclick = function() {
    noArticleModal.style.display = "none";
}



//user inputs category (general could be default? dropdown), source (typed in: grab value and trim), 
//language (dropdown)
    // at least one input otherwise error message modal
    // this dynamically generates a search history input button on the page
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
//they have the option to save the search inputs into a "playlist"
    // pull up new modal from save button 
    // saves to local storage
    // button on the homepage to get the item from local storage (if not  null)
    // send the user to a new htmL?
    // get item from local storage to persist on homepage?
        //can this playlist update automatically with most recent posts from sources/category
        // set attribute to display visible