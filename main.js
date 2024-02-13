const api_key = "49f195a4d85e4de2a00970d6a3d37c15";


let searchitem = document.getElementById("searchitem");
let searchstart = document.getElementById("searchstart"); 
let menus=document.querySelectorAll(".buttonstyle button");
let sidemenus=document.querySelectorAll(".side-menu-list button");
let newslist = [];
let url=`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${api_key}`;


const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
    };
  
const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    };

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
        inputArea.style.display = "none";
    } else {
        inputArea.style.display = "inline";
    }
    };

searchstart.addEventListener("click", function() {
    getsearchitem(searchitem.value); 
});
    

for (let i = 0; i < sidemenus.length; i++) {
    sidemenus[i].addEventListener("click", function() {
        getmenuitem(this.textContent.toLowerCase()); 
    });
}

for (let i = 0; i < menus.length; i++) {
    menus[i].addEventListener("click", function() {
        getmenuitem(this.textContent.toLowerCase()); 
    });
}

let getitem = async (sitem)=> {
    
    try{
        const response = await fetch(url);
        const data = await response.json();
            if(data.status === "error") {
                throw new Error(data.message);
            }

        newslist = data.articles;
            if(newslist.length === 0) {
                throw new Error("There is no data matching your search term");
            }

        randering();
    
    } catch(error) {
        
        errorrandering(error.message);

    }
}

let getsearchitem = async (sitem)=> {

    url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&q=${sitem}&apiKey=${api_key}`)
    getitem();
}

let getmenuitem = async (menu)=> {

    url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${menu}&apiKey=${api_key}`)
    getitem();
}

let getnewslist = async ()=> {
    url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=${api_key}`)
    getitem();
}

randering = () => {
    
    const putHtml = newslist.map(function(news) { 
    
    const description = news.description === null ? "내용없음" : (news.description.length > 200 ? news.description.substring(0, 200) + "..." : news.description);
    const imageUrl = news.urlToImage ? news.urlToImage : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
    const source = news.source.name ? news.source.name : "No Source";
    const publish = moment().endOf('Day').fromNow(news.publishedAt); 
    return `<div class="row newslistpad">
        <div class="col-lg-4">
        <img class="imgsize"
            src="${imageUrl}" 
        />
        </div>
        <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>${description}</p>
        ${source} * ${publish}
        </div>
    </div>`}).join('');

  document.getElementById("putnews").innerHTML=putHtml;

}

errorrandering = (message) => {
    const putHtml = `<br><div class="row">
        <div >
            <div class="alert alert-danger" role="alert">
            ${message}
            </div>
        
        </div>
    </div>`;
    document.getElementById("putnews").innerHTML=putHtml;
}

getnewslist();