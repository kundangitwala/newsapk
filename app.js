const API_KEY = "pub_408073e60f02f466c692a0983c28160bcca1e";
const url = "https://newsdata.io/api/1/news?apikey=";

window.addEventListener("load", () => fetchNews("India"));


async function fetchNews(query) {
    const res = await fetch(`${url}${API_KEY}&q=${query}`);
    const data = await res.json();
    console.log(data)
    bindData(data.results);
}
// https://newsdata.io/api/1/news?apikey=pub_408073e60f02f466c692a0983c28160bcca1e&q=india 

function bindData(results) {
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');
    cardsContainer.innerHTML = "";

    results.forEach((result) => {
        if (!result.image_url) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,result);
        cardsContainer.appendChild(cardClone);

    });
}
function fillDataInCard(cardClone,result)
{
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src=result.image_url;
    newsTitle.innerHTML=result.title;
    newsSource.innerHTML=result.pubDate;
    newsDesc.innerHTML=result.description;
    cardClone.firstElementChild.addEventListener("click",( ) => {
        window.open(result.link,"_blank");

    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem= document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav?.classList.add('active');

}
const searchButton=document.getElementById("search-button");
const searchText=document.getElementById("search-text");
searchButton.addEventListener("click", ( ) => {
    const query=searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;


})