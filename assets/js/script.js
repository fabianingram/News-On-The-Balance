var urlArticles = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=";
var urlGuardian = "https://content.guardianapis.com/search?q=";
var apiKeyNyt = "&api-key=lxhiYmDkE544uuZFkAV0NsGeWmRGaISS";
var apiKeyGuard = "&api-key=81a87914-244c-43b2-8f36-eaabf65fe9e3"; 
var nytimesDiv = document.getElementById("nytimes");
var guardianDiv = document.getElementById("theguardian");
var searchTerm = document.getElementById("searchInput");
var searchButton = document.getElementById("btn-search");
var searchHistory = JSON.parse(localStorage.getItem("History")) || []


var renderHistory = function(){

    // empties the history of the div
    $("#history").empty()

    for (var i = 0; i < searchHistory.length; i++){

        var historyButton = $("<button>");
        historyButton.text(searchHistory[i]);
        $('#history').append(historyButton);
        historyButton.click(function(){
            var textContent = this.textContent;
            requestNyTimes(textContent);
            guardianAPI(textContent);
        })
    }
}
var requestNyTimes = function(searchInputEl) {
    $(nytimesDiv).empty()

    fetch(urlArticles + searchInputEl + apiKeyNyt).then(function(response) {
        return response.json()
    }).then(function(nyt) {
        var newHeaderDivNyt = document.createElement("div");
        newHeaderDivNyt.setAttribute("style", "color: red; text-align: center;")
        newHeaderDivNyt.innerHTML = "<h4>" + "New York Times " + "<h4>"
        nytimesDiv.appendChild(newHeaderDivNyt);

        for (var i = 0; i <= 2; i++ ){
            var nytURL = nyt.response.docs[i].web_url
            var nytHeadline = nyt.response.docs[i].headline.main;
            var newDivHeadlineElNyt = document.createElement("a");
            var newDivAbstractElNyt = document.createElement("div");
            newDivAbstractElNyt.setAttribute("style", "border-style: solid; border-width: thin; border-color: #f5f5f5; margin-bottom: 4px; border-radius: 10px; text-align: center; padding: 15px; margin-bottom: 10px; box-shadow: 10px 5px 5px red;");
            newDivHeadlineElNyt.href = nytURL
            newDivHeadlineElNyt.setAttribute("target", "_blank");
            newDivHeadlineElNyt.innerHTML = "<h5>" + nytHeadline + "</h5>"
            newDivHeadlineElNyt.setAttribute("style", "font-weight: bold; color: red; text-decoration: none;");
            newDivAbstractElNyt.appendChild(newDivHeadlineElNyt);
            nytimesDiv.appendChild(newDivAbstractElNyt);
        }
        
    })
}
var guardianAPI = function(searchInputEl){

    $(guardianDiv).empty()

    fetch(urlGuardian + searchInputEl + apiKeyGuard)
    .then(function(response){
        // the promise
        return response.json()
    })
    .then(function(guard) {
        var newHeaderDivGuard = document.createElement("div");
        newHeaderDivGuard.setAttribute("style", "color: blue; text-align: center;")
        newHeaderDivGuard.innerHTML = "<h4>" + "The Guardian UK " + "<h4>"
        guardianDiv.appendChild(newHeaderDivGuard);

        for (var i = 0; i <= 2; i++ ){
            var guardURL = guard.response.results[i].webUrl
            var guardianWebTitle = guard.response.results[i].webTitle
            var newDivTitleEl = document.createElement("a")
            var newDivAbstractEl = document.createElement("div")
            newDivAbstractEl.setAttribute("style", "border-style: solid; border-width: thin; border-color: #f5f5f5; margin-bottom: 4px; border-radius: 10px; text-align: center; padding: 15px; margin-bottom: 10px; box-shadow: 10px 5px 5px blue;");
            newDivTitleEl.href = guardURL
            newDivTitleEl.setAttribute("target", "_blank")
            newDivTitleEl.innerHTML = "<h5>" + guardianWebTitle + "</h5>"
            newDivTitleEl.setAttribute("style", "font-weight: bold; color: blue; text-decoration: none;")
            newDivAbstractEl.appendChild(newDivTitleEl);
            guardianDiv.appendChild(newDivAbstractEl);
        }
        
    })
}
var storeHistory = function(searchInputEl) {
    searchHistory.unshift(searchInputEl);
    localStorage.setItem("History", JSON.stringify(searchHistory)) 
}
var requestAll = function() {
    var searchInputEl = document.getElementById("searchInput").value;
    //empty divs that hold headlines so you do not have to refresh when you type over last search term
    renderHistory()
    requestNyTimes(searchInputEl);
    guardianAPI(searchInputEl);
    storeHistory(searchInputEl);
    $("#searchInput").val("")
}