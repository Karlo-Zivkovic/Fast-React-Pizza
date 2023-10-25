import { Link } from "react-router-dom";

function Button({ children, to, type, onClick }) {
  const styles = {
    primary:
      "rounded-full bg-yellow-400 px-6 py-3 font-semibold text-sm hover:bg-yellow-300 transition-all duration-300",
    small:
      "rounded-full bg-yellow-400 px-5 py-2.5 font-semibold text-xs hover:bg-yellow-300 transition-all duration-300",
    updateQuantity:
      "rounded-full bg-yellow-400 px-3 py-2 font-semibold text-xs hover:bg-yellow-300 transition-all duration-300",
    clear:
      "rounded-full text-stone-300 border-2 border-stone-300 px-6 py-3 font-semibold text-sm hover:bg-stone-300 transition-all duration-300 hover:text-stone-800",
  };

  if (onClick)
    return (
      <button onClick={onClick} className={styles[type]}>
        {children}
      </button>
    );

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  return <button className={styles[type]}>{children}</button>;
}

export default Button;
