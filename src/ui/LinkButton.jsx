import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const navigate = useNavigate();

  if (to === "-1")
    return (
      <button
        className=" text-blue-400 hover:text-blue-500 hover:underline"
        onClick={() => navigate(-1)}
      >
        {children}
      </button>
    );

  return (
    <Link
      className=" text-blue-400 hover:text-blue-500 hover:underline"
      to={to}
    >
      {children}
    </Link>
  );
}

export default LinkButton;
