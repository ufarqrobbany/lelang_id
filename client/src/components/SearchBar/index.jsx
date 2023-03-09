import { FaSearch } from "react-icons/fa";

function SearchBar() {
    return (
        <form className='w-100 flex flex-row items-stretch w-100'>
            <input type="text" style={{ border: "1px solid #a78bfa", borderRight: "none", padding: "10px 12px", borderRadius: "5px 0 0 5px", outline: "none", width: '100%' }} />
            <button style={{ border: "1px solid #a78bfa", borderLeft: "none", padding: "10px 12px", borderRadius: "0 5px 5px 0", color: "#a78bfa" }} type="submit">
                <FaSearch />
            </button>
        </form>
    )
}

export default SearchBar;