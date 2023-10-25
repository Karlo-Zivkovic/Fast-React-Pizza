import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const userName = useSelector((state) => state.user.userName);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <div className="flex items-center justify-between gap-5 bg-yellow-400 px-5 py-4 md:px-7 md:py-5 md:text-lg  ">
      <Link to="/" className="uppercase tracking-widest text-stone-700">
        fast react pizza co.
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          className="w-44 rounded-full py-1 pl-4 text-stone-700 outline-none  transition-all duration-300  placeholder:text-sm focus:w-52 focus:ring focus:ring-yellow-500"
          type="text"
          placeholder="search order #"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
      </form>
      {userName && <p>{userName}</p>}
    </div>
  );
}

export default Header;
