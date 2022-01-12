# Newsify
** PLEASE NOTE: This is a proof of concept for a future paid subscription app. As a result,  because we used the free plan for the news api we chose, it does not support https fetch requests. Because github pages only supports https, in order to get the deployed app to work, you need to change the security settings in your browser to allow insecure content. We apologize for this inconvenience, but we plan to improve this in our future development by making it a paid subscription app.

# Table of Contents
* [Project Description](#desc)
* [How I Made It](#process)
* [Usage](#usage)
* [URL](#URL)

<a name= "desc"></a>
## 
Proof of concept for news accessibility app whose purpose is to expand news consumption habits for people with difficulties with sight/reading, lack of patience for reading the news, and the desire to have a news feed not governed by algorithms but by their input choices.

Uses [MediaStack API's Free Plan](https://mediastack.com/documentation) to fetch news data and the free [ResponsiveVoice API](https://responsivevoice.org/api/) to read the articles aloud.

<a name="process"> </a>
## 



<a name= "usage"></a>
## Acceptance Criteria

```
GIVEN I am searching for news articles to be spoken out to me
WHEN I input the category, source, language, keywords, excluded words, and sort options
THEN I am presented with options that fit my requirements
WHEN I sort based on popularity and date published and hit search
THEN my options refresh again
WHEN I hit the start button
THEN the top-most article's description text is read out to me 
WHEN I hit the stop button
THEN the speaker stops
WHEN I input unique searches for news articles
THEN the search inputs are saved to local storage 
WHEN I return back to the homepage
THEN I see my saved search persist on the page below the input jumbotron

```

## Wish list

```
WHEN I hit the save button
THEN the search I liked is saved to localStorage
WHEN I return back to the homepage
THEN I see my saved search persist as a playlist of articles that I can have read out to me

WHEN I hit the sort button
THEN it automatically submits the search again

WHEN I customize the voice speaker 
THEN the customized voice reads the articles out to me

WHEN I hit the next button
THEN the speaker skips the current article and goes to the next one
```

## User Story

```
AS A person who struggles with vision and/or reading, having the time or patience to read the news, or who is frustrated with news feed algorithms

I WANT TO be able to listen to the news that I like 

SO THAT I CAN stay aware and up-to-date with what is happening in the world.
```

<a name= "URL"></a>
## URL

Deployed App: https://yoowook1207.github.io/Newsify/

Repo: https://github.com/yoowook1207/Newsify.git
