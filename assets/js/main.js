const apiKey = "763b23697a3ae6a8f0f035e83af199ca"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")
const weatherElement = document.querySelector(".weather")

async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`)

    if (response.ok) {
      let data = await response.json()

      const cityElement = document.querySelector(".city")
      const tempElement = document.querySelector(".temp")
      const humidityElement = document.querySelector(".humidity")
      const windElement = document.querySelector(".wind")

      cityElement.innerHTML = data.name
      tempElement.innerHTML = `${Math.round(data.main.temp)}°C`
      humidityElement.innerHTML = `${data.main.humidity}%`
      windElement.innerHTML = `${data.wind.speed} km/h`

      switch (data.weather[0].main) {
        case "Clouds":
          weatherIcon.src = "/assets/img/clouds.png"
          break
        case "Clear":
          weatherIcon.src = "/assets/img/clear.png"
          break
        case "Rain":
          weatherIcon.src = "/assets/img/rain.png"
          break
        case "Drizzle":
          weatherIcon.src = "/assets/img/drizzle.png"
          break
        case "Mist":
          weatherIcon.src = "/assets/img/mist.png"
          break
        default:
          weatherIcon.src = ""
      }

      weatherElement.style.display = "block"
    } else {
      // Se response.ok for falso, esconde a classe "weather"
      weatherElement.style.display = "none"
    }
  } catch (error) {
    console.error("Erro ao buscar dados meteorológicos:", error)
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value)
})
