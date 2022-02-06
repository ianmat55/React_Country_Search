import React from 'react'

function Weather({ weather }) {
	if (weather.main !== undefined && weather.main !== null) {
		const temp = (weather.main.temp - 273.15) * (9/5) + 32 // (275K − 273.15) × 9/5 + 32 
		const weatherImg = `http://openweathermap.org/img/wn/${weather.weather[0]['icon']}.png`
		return (
			<div id='weather' className='space'>
				<h2> Weather in {weather.name} </h2>
				<h3> Temperature: {temp.toFixed(2)} F </h3>
				<div id='conditions'>
					<h3> {weather.weather[0]['description']} </h3>
					<img src={weatherImg} alt='weather conditions' />
				</div>
			</div>
		)
	}	else {
		return (
			<div>

			</div>
		)
	}
}

function Display({ country, weather }) {
	const display = country
	if (country !== '' && country !== undefined) { // && != undefined fixes issue of deleting inputs and adding spaces, but theyre must be a better way
		return (
			<div id='displayWrapper'>
				<div id='display' className='space'>
					<img id='flag' src={display.flags.svg} alt={display.name.common} />
					<div id='country-info' className='space'>
						<h1 id='country-name'> {display.name.common} </h1>
						<h3 id='capital'> Capital: {display.capital} </h3>
						<h3 id='population'> Population: {display.population} </h3>
						<div id='languages' className='space'>
							<h3> Languages: </h3>
							<ul>
								{Object.keys(display.languages).map(index => {
									return <li key={index}> {display.languages[index]} </li>
								})}
							</ul>
						</div>
					</div>
					<Weather weather={weather} />
				</div>
			</div>
		)
	} else {
		return <div></div>
	}
}

export default Display;