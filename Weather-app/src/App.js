import React, { useEffect, useState } from "react";
import { createMuiTheme, Container, ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Weather from "./components/Weather";

export default function App() {
  const [city, setCity] = useState("Konya");
  const [error] = useState(null);
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    getWeather(city).then(weather => {
      setCurrentWeather(weather);
    });
  }, [city, error]);

  useEffect(() => {
    getForecast(city).then(data => {
      setForecast(data);
    });
  }, [city, error]);

  const handleCityChange = city => {
    setCity(city);
  };

  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(","),
      fontSize: 14,
      h5: {
        fontWeight: 500
      }
    }
  });

  if (
    (currentWeather && Object.keys(currentWeather).length) ||
    (forecast && Object.keys(forecast).length)
  ) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Weather
            city={city}
            currentWeather={currentWeather}
            forecast={forecast}
            onCityChange={handleCityChange}
            error={error}
          />
        </Container>
      </ThemeProvider>
    );
  } else {
    return <div></div>;
  }
}

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error: Location " + response.statusText.toLowerCase());
  }
}

function getWeather(city) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/weather/?q=${city}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
  )
    .then(res => handleResponse(res))
    .then(weather => {
      if (Object.entries(weather).length) {
        const mappedData = mapDataToWeatherInterface(weather);
        return mappedData;
      }
    });
}

function getForecast(city) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/forecast/?q=${city}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
  )
    .then(res => handleResponse(res))
    .then(forecastData => {
      if (Object.entries(forecastData).length) {
        return forecastData.list
          .filter(forecast => forecast.dt_txt.match(/09:00:00/))
          .map(mapDataToWeatherInterface);
      }
    });
}

function mapDataToWeatherInterface(data) {
  const mapped = {
    city: data.name,
    country: data.sys.country,
    date: data.dt * 1000,
    humidity: data.main.humidity,
    icon_id: data.weather[0].id,
    sunrise: data.sys.sunrise * 1000,
    sunset: data.sys.sunset * 1000,
    temperature: Math.round(data.main.temp),
    timezone: data.timezone / 60
  };
  if (data.dt_txt) {
    mapped.dt_txt = data.dt_txt;
  }

  if (data.weather[0].icon) {
    mapped.icon = data.weather[0].icon;
  }

  if (data.main.temp_min && data.main.temp_max) {
    mapped.max = Math.round(data.main.temp_max);
    mapped.min = Math.round(data.main.temp_min);
  }
  Object.entries(mapped).map(
    ([key, value]) => value === undefined && delete mapped[key]
  );

  return mapped;
}
