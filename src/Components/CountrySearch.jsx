import React, { useState, useEffect } from "react";
import axios from "axios";

function CountrySearch() {
  const [selectedCountry, setSelectedCountry] = useState("Pakistan");
  const [searchInput, setSearchInput] = useState("");
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    // Fetch data for the default country (Pakistan) on component mount
    fetchCountryData(selectedCountry);
  }, [selectedCountry]);

  const fetchCountryData = (countryName) => {
    axios
      .get(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          setCountryData(data[0]);
        } else {
          setCountryData(null);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSearch = () => {
    if (searchInput.trim() === "") {
      alert("Please enter a country name.");
      return;
    }

    setSelectedCountry(searchInput);
    setSearchInput("");
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          className="px-3 py-2 border rounded-lg w-64"
          placeholder="Search for a country..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div>
        <p className="mb-4"> {selectedCountry}</p>
        {countryData && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Country Information</h2>
            <p>Country Name:<span className=" text-gray-400 ml-8">{countryData.name.common}</span> </p>
            <p>Official Name: <span className=" text-gray-400 ml-8">{countryData.name.official}</span></p>
            <p>In Urdu:  <span className=" text-gray-400 ml-[5%]">{countryData.translations.urd.official}</span></p>
            <p>Capital: <span className=" text-gray-400 ml-20">{countryData.capital}</span></p>
            <p>Population:<span className=" text-gray-400 ml-[4%]">{countryData.population}</span> </p>
            <p>Languages: <span className=" text-gray-400 ml-[3%]">{Object.values(countryData.languages).join(", ")}</span></p>
            <img
              src={countryData.flags.png}
              alt={`Flag of ${countryData.name.common}`}
              className="w-20 h-auto ml-[4%] py-4"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CountrySearch;
