import React, { useState } from 'react'

function Query({searchQuery, setSearchQuery, setDisplay}) {
	const setInputOnClick = (e) => { // if user clicks on one item in query, set it as display
		const country = e.target.innerHTML; 
		const input = document.querySelector('#country-search');
		input.value = country;
		setDisplay(searchQuery[e.target.id]);
		setSearchQuery([]);
	}

	if (searchQuery.length === 0) {
		return ''
	} else {
		const query = searchQuery.map((country, index) => {
			return(
				<li key={country.cca2} onClick={setInputOnClick}> <button id={index}> {country.name.common} </button> </li>
			)
		});

		return (
			<ul>
				{query}
			</ul>
		)
	}
}

function Searchbar({ countries, newInput, setNewInput, setDisplay }) {	
	const [searchQuery, setSearchQuery] = useState([]); // returns all possible matching country names
	
	const search = (e) => {
		e.preventDefault();
		const input = document.querySelector('#country-search');

		if (searchQuery.length === 1) { // gets rid of search query on enter, kind of redundant since it automatically shows up, but a lot of people like to hit enter
			setDisplay(searchQuery[0]);
		} else if(searchQuery.length > 1) {
			for (let i=0; i<searchQuery.length; i++) {
				if (searchQuery[i]['name']['common'] === input.value) {
					setDisplay(searchQuery[i])
				}
			}
		} else {
			for (let i=0; i<countries.length; i++) {
				if (countries[i]['name']['common'] === input.value) {
					setDisplay(countries[i]);
				}
			}
		};

		setSearchQuery([]);
	};

	const handleCountryChange = (e) => {
		if (e.target.input == null) {
			setSearchQuery('')
		}
		setNewInput(e.target.value)
		const regex = new RegExp( newInput, 'i' );
		const filteredSearch = countries.filter(country => country.name.common.match(regex));

		if (filteredSearch.length < 10) { // only show queries if less than 10
			setSearchQuery(filteredSearch);
		} 
		if (filteredSearch.length === 1 && filteredSearch[0] !== undefined) { // If only one query, select it and set display
			setDisplay(searchQuery[0]);
		}
	}

	return (
		<div id='searchbar'>
			<form onSubmit={search}>
				<label htmlFor='country'> <span className='vis-hidden'>Find Countries</span> </label>
				<input id='country-search' placeholder='Find Country' value={newInput} onChange={handleCountryChange} name='country' />
				<button type="submit">search</button>
			</form>
			<Query searchQuery={searchQuery} setSearchQuery={setSearchQuery} setDisplay={setDisplay} />
		</div>
	)
}

export default Searchbar;

