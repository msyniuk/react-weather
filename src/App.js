import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/Weather";

const API_KEY = "facadd73e69c8e2d5a37588b4a004581";

class App extends React.Component {

    state = {
        temp: undefined,
        temp_min: undefined,
        temp_max: undefined,
        feels_like: undefined,
        humidity: undefined,
        pressure: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: undefined
    }
    setError = (message) => {
        this.setState({
            feels_like: undefined,
            humidity: undefined,
            pressure: undefined,
            temp: undefined,
            temp_max: undefined,
            temp_min: undefined,
            city: undefined,
            country: undefined,
            sunrise: undefined,
            sunset: undefined,
            error: message
        });

    }
    getWeather = async (event) => {
        event.preventDefault();
        const city = event.target.elements.city.value;
        if (city) {
            const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await api_url.json();
            if (data.cod && data.cod == 404) {
                this.setError("Город не найден");
            } else {
                let sunRise = data.sys.sunrise;
                let sunSet = data.sys.sunset;
                let date = new Date();
                date.setTime(sunRise*1000);
                let sunRiseString = date.toString();
                date.setTime(sunSet*1000);
                let sunSetString = date.toString();
                console.log(data);
                this.setState({
                    feels_like: data.main.feels_like,
                    humidity: data.main.humidity,
                    pressure: data.main.pressure,
                    temp: data.main.temp,
                    temp_max: data.main.temp_max,
                    temp_min: data.main.temp_min,
                    city: data.name,
                    country: data.sys.country,
                    sunrise: sunRiseString,
                    sunset: sunSetString,
                    error: undefined
                });
            }
        } else {
            this.setError("Введите название города");
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 info">
                                <Info/>
                            </div>
                            <div className="col-sm-7 form">
                                <Form weatherMethod={this.getWeather}/>
                                <Weather
                                    temp={this.state.temp}
                                    temp_max={this.state.temp_max}
                                    temp_min={this.state.temp_min}
                                    humidity={this.state.humidity}
                                    pressure={this.state.pressure}
                                    feels_like={this.state.feels_like}
                                    city={this.state.city}
                                    country={this.state.country}
                                    sunrise={this.state.sunrise}
                                    sunset={this.state.sunset}
                                    error={this.state.error}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;