import { useSelector } from "react-redux";
import CreateUser from "../featuers/user/CreateUser";
import Button from "./Button";

function Home() {
  const userName = useSelector((state) => state.user.userName);

  return (
    <div className=" text-center text-xl md:text-2xl">
      <p className="mt-16 font-medium text-stone-800">The best pizza.</p>
      <p className=" font-semibold text-yellow-500 ">
        Straight out of the oven, straight to you
      </p>
      {userName === "" ? (
        <CreateUser />
      ) : (
        <div className="mt-10 uppercase">
          <Button to={"/menu"} type={"primary"}>
            CONTINUE ORDERING, {userName}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Home;
