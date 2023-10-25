import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { useState } from "react";
import { createName } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!userName) return;
    dispatch(createName(userName));
    navigate("menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mt-10 text-sm text-stone-600">
        👋 Welcome! Please start by telling us your name:
      </p>
      <input
        className=" mb-10 mt-5 w-64 rounded-full border border-stone-200 py-1 pl-4  text-sm text-stone-700 outline-none transition-all duration-300 placeholder:text-base focus:ring focus:ring-yellow-400 md:text-lg"
        type="text"
        placeholder="Your full name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      ></input>
      <br />

      {userName !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
