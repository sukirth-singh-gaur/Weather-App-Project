function renderData(weather) {
  console.log(weather);
  if(document.querySelector(".Weather-Results")){
    document.querySelector(".Weather-Results").remove();
  }
  let ResultContainer = document.createElement("div");
  ResultContainer.className="Weather-Results";
  document.querySelector("#Weather-Results").append(ResultContainer);
  let city = document.createElement("h1");
  city.innerText = weather.location.name;
  city.className = "CityName";
  ResultContainer.append(city);
  let timeDate = document.createElement("p");
  timeDate.innerText = `${weather.location.localtime}`;
  timeDate.className = "time";
  ResultContainer.append(timeDate);
  let temperature = document.createElement("p");
  temperature.innerText = `Temperature ${weather.current.temp_c}°C`;
  temperature.className = "details";
  ResultContainer.append(temperature);
  let humidity = document.createElement("p");
  humidity.innerText = `Humidity ${weather.current.humidity}%`;
  humidity.className = "details";
  ResultContainer.append(humidity);
  let wind = document.createElement("p");
  wind.innerText = `Wind ${weather.current.wind_kph} km/h`;
  wind.className = "details";
  ResultContainer.append(wind);
}

async function getData(query) {
  const url = `http://api.weatherapi.com/v1/current.json?key=770115e627d44483991144853240508&q=${query}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    renderData(data);
  } catch (e) {
    console.error(e.message);
  }
}

let form = document.querySelector("#searchHere");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityName = document.querySelector("#cityName");
  getSearch(form.elements.cityName.value);
});

let count = 0;
function renderSearch(search) {
  if (document.querySelector(".searchResults")) {
    document.querySelector(".searchResults").remove();
  }
  console.log(search);
  let DisplayHere = document.querySelector("#DisplayHere");
  let SearchArea = document.createElement("div");
  SearchArea.className = "searchResults";
  DisplayHere.append(SearchArea);
  for (let city of search) {
    console.log(city);
    let cityName = document.createElement("p");
    cityName.innerText = `${city.name}`;
    cityName.className = "searched";
    SearchArea.append(cityName);
    count++;
  }
  let queryOnClick = document.querySelectorAll("p");
  console.dir(queryOnClick);
  for(let p of queryOnClick){
  p.addEventListener("click", () => {
    if (document.querySelector(".searchResults")) {
      document.querySelector(".searchResults").remove();
    }
    let query = p.innerText;
    console.log(query);
    getData(query);
  });
}
}

async function getSearch(query) {
  const url = `http://api.weatherapi.com/v1/search.json?key=770115e627d44483991144853240508&q=${query}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    renderSearch(data);
  } catch (e) {
    console.error(e.message);
  }
}
