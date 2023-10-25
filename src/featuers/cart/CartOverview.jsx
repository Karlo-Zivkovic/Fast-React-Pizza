import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCart } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const cart = useSelector(getCart);
  const totalPrice = cart
    .map((item) => item.totalPrice)
    .reduce((sum, cur) => sum + cur, 0);
  const numberOfPizzas = cart
    .map((item) => item.quantity)
    .reduce((sum, cur) => sum + cur, 0);
  return (
    <div className="flex items-center justify-between bg-stone-800 px-5 py-4 md:px-7 md:py-5 md:text-lg ">
      <div className="flex gap-3 uppercase text-stone-200 md:gap-4 ">
        <p>{numberOfPizzas} pizzas</p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
      <Link to="cart" className="uppercase text-stone-200">
        open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
