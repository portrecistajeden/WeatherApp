import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate"
import { GEO_API_URL, geoAPIOptions } from "../api";
import './search.css';

const Search= ({onSearchChange}) => {

    const [search, setSearch] = useState('');

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?namePrefix=${inputValue}`, geoAPIOptions)
	        .then(response => response.json())
	        .then(response => {return {
                options: response.data.map((city) => {
                    return {
                        latitude: city.latitude,
                        longitude: city.longitude,
                        label: `${city.name}, ${city.countryCode}`,
                    };
                }),
            };
            })
	        .catch(err => console.error(err));
    }

    return (
        <AsyncPaginate className="searchBar"
            placeholder='Wyszukaj miasto' 
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}/>
    );
}
export default Search;
