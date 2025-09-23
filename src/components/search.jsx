import {FaSearch} from "react-icons/fa";

const handleSearch = (e) => {
    if (e.key === "Enter") {
        weatherapi(city)
    }
    return (
        <div className="wrapper">
            <input
                className="searchbar"
                placeholder="City..."
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleSearch}
            />
            <FaSearch className="search-icon"/>
        </div>
    )
}

export default handleSearch;