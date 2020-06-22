import React from "react";

const Weather = props => (
    <div>
        {props.city &&
        <div className="infoWeath">
            <p><span>Местоположение:</span> {props.city}, {props.country}</p>
            <p><span>Температура:</span> {props.temp}&#8451;</p>
            <p><span>Ощущается как:</span> {props.feels_like}&#8451;</p>
            <p><span>Температура max:</span> {props.temp_max}&#8451;</p>
            <p><span>Температура min:</span> {props.temp_min}&#8451;</p>
            <p><span>Влажность:</span> {props.humidity}%</p>
            <p><span>Давление:</span> {props.pressure}&nbsp;гПа</p>
            <p><span>Восход солнца:</span> {props.sunrise}</p>
            <p><span>Заход солнца:</span> {props.sunset}</p>
        </div>
        }
        <p className="error">{props.error}</p>

    </div>
);

export default Weather;