const api_key = "49f195a4d85e4de2a00970d6a3d37c15";

let newslist = [];


let getnewslist = async ()=> {
    url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=49f195a4d85e4de2a00970d6a3d37c15`)
    const response = await fetch(url);
    const data = await response.json();
    newslist = data.articles;
    console.log(data)
    randering();
}

randering = () => {
    
    const putHtml = newslist.map((news) => 
    `<div class="row newslistpad">
        <div class="col-lg-4">
        <img class="imgsize"
            src="${news.urlToImage}" 
        />
        </div>
        <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>${news.description}</p>
        ${news.source.name} * ${news.publishedAt}
        </div>
    </div>`).join('');

  document.getElementById("putnews").innerHTML=putHtml;

}

getnewslist();