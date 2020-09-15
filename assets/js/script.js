var urlArticles = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
var urlGuardian = "https://content.guardianapis.com/search?q=";
var apiKeyNyt = "&api-key=lxhiYmDkE544uuZFkAV0NsGeWmRGaISS";
var apiKeyGuard = "&api-key=81a87914-244c-43b2-8f36-eaabf65fe9e3"; 
var nytimesDiv = document.getElementById("nytimes");
var guardianDiv = document.getElementById("theguardian");
var searchTerm = document.getElementById("searchInput");
var searchButton = document.getElementById("btn-search");
var requestNyTimes = function() {
    var searchInputEl = document.getElementById("searchInput").value;
    fetch(urlArticles + searchInputEl + apiKeyNyt).then(function(response) {
        return response.json()
    }).then(function(nyt) {
        console.log(nyt);
        console.log(nyt.response)
        console.log(nyt.response.docs)
        console.log(nyt.response.docs[0])
        console.log(nyt.response.docs[0].web_url)
        console.log(nyt.response.docs[0].multimedia[0])
        console.log(nyt.response.docs[0].headline)
        console.log("New York Times: ", nyt.response.docs[0].headline.main)
        var nytURL = nyt.response.docs[0].web_url
        var nytHeadline = nyt.response.docs[0].headline.main;
        var newDivHeadlineElNyt = document.createElement("a");
        var newDivAbstractElNyt = document.createElement("div");
        newDivHeadlineElNyt.href = nytURL
        newDivHeadlineElNyt.setAttribute("target", "_blank");
        newDivHeadlineElNyt.innerHTML = "<h4>" + "NYT: " + nytHeadline + "<h4>"
        newDivHeadlineElNyt.setAttribute("style", "font-weight: bold; color: red; text-decoration: none;");
        newDivAbstractElNyt.appendChild(newDivHeadlineElNyt);
        nytimesDiv.appendChild(newDivAbstractElNyt);
    })
}
var guardianAPI = function(){
    var searchInputEl = document.getElementById("searchInput").value;
    fetch(urlGuardian + searchInputEl + apiKeyGuard)
    .then(function(response){
        // the promise
        return response.json()
    })
    .then(function(guard) {
        // the return
        console.log(guard)
        //what we're looking for
        console.log(guard.response.results)
        // run the function that runs the loop with the parameters of search and results by getting the information from the search input when I click submit
        //console.log(findSearchResult(response.response.results, searchInputEl));
        console.log("Guardian:", guard.response.results[0].webTitle)
        console.log(guard.response.results[0].webUrl)
        var guardURL = guard.response.results[0].webUrl
        var guardianWebTitle = guard.response.results[0].webTitle
        var newDivTitleEl = document.createElement("a")
        var newDivAbstractEl = document.createElement("div")
        newDivTitleEl.href = guardURL
        newDivTitleEl.setAttribute("target", "_blank")
        newDivTitleEl.innerHTML = "<h4>" + "Guardian: " + guardianWebTitle + "<h4>"
        newDivTitleEl.setAttribute("style", "font-weight: bold; color: blue; text-decoration: none;")
        newDivAbstractEl.appendChild(newDivTitleEl);
        guardianDiv.appendChild(newDivAbstractEl);
    })
}
var requestAll = function() {
    //empty divs that hold headlines so you do not have to refresh when you type over last search term
    $(nytimesDiv).empty()
    $(guardianDiv).empty()
    requestNyTimes();
    guardianAPI();
    $("#searchInput").val("")
}