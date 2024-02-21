const endpoint = "https://news2024.netlify.app";

let searchitem = document.getElementById("searchitem");
let searchstart = document.getElementById("searchstart"); 
let menus=document.querySelectorAll(".buttonstyle button");
let sidemenus=document.querySelectorAll(".side-menu-list button");
let newslist = [];
let url= new URL(`${endpoint}`);
let pageSize=5;
let page = 1;


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
        url.searchParams.set("page",page);
        url.searchParams.set("pageSize",pageSize);
        const response = await fetch(url);
        const data = await response.json();
            if(data.status === "error") {
                throw new Error(data.message);
            }

        newslist = data.articles;
            if(newslist.length === 0) {
                throw new Error("There is no data matching your search term");
            }
console.log(data)
        randering();
        pagenation(data.totalResults);
    
    } catch(error) {
        
        errorrandering(error.message);

    }
}

let getsearchitem = async (sitem)=> {

    url = new URL(`${endpoint}?country=us&q=${sitem}`)
    getitem();
}

let getmenuitem = async (menu)=> {

    url = new URL(`${endpoint}?country=us&category=${menu}`)
    getitem();
}

let getnewslist = async (page)=> {
    url = new URL(`${endpoint}?country=us`)
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

let pagenation = async (totalpage)=> {

    const groupsize=5;
    totalresult = Math.ceil(totalpage / pageSize);
    totalgruop = Math.ceil(totalresult / groupsize);
    const pagegroup = Math.ceil(page / groupsize);
    let lastpage = pagegroup * groupsize;
    let firstpage = lastpage - (groupsize -1);

    lastpage = lastpage > totalresult ? totalresult : lastpage;
       
    let putpage =`<nav aria-label="Page navigation example>"
    <ul class="pagination">`;
        if(pagegroup > 1 ) {putpage += `<li class="page-item "} "}><a class="page-link" onClick="changePage(1);">&laquo;&laquo;</a></li>
                                        <li class="page-item ${page === 1 ? "disabled" : ""} "}><a class="page-link" onClick="changePage(${page-1});">&laquo;</a></li>`;}
        
        for(i=firstpage; i<= lastpage; i++) {
            putpage += `<li class="page-item ${i === page ? "active" : ""}" onClick="changePage(${i});"><a class="page-link" >${i}</a></li>`;
        }

        if(pagegroup < totalgruop) {putpage += `<li class="page-item ${totalresult === lastpage ? "disabled" : ""}"><a class="page-link"  onClick="changePage(${page+1});">&raquo;</a></li>
                                                <li class="page-item "><a class="page-link"  onClick="changePage(${totalresult});">&raquo;&raquo;</a></li>`;}
        putpage += `</ul> </nav>`;

    document.getElementById("pagenate").innerHTML=putpage;
}

let changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalresult) { 
        page = newPage; 
        console.log(page)
        getnewslist(page); 
    }
};

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