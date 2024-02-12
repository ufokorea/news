const api_key = "49f195a4d85e4de2a00970d6a3d37c15";


let getnewslist = async ()=> {
    url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&apiKey=49f195a4d85e4de2a00970d6a3d37c15`)
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
}

getnewslist();