import { FaSearch } from "react-icons/fa";

function SearchBar() {
    return (
        <form className='w-100 flex flex-row items-stretch w-100'>
            <input type="text" style={{ border: "1px solid #B8AFD6", borderRight: "none", padding: "10px 12px", borderRadius: "5px 0 0 5px", outline: "none", width: '100%' }} />
            <button style={{ border: "1px solid #B8AFD6", borderLeft: "none", padding: "10px 12px", borderRadius: "0 5px 5px 0", color: "#B8AFD6" }} type="submit">
                <FaSearch />
            </button>
        </form>
    )
}

export default SearchBar;