import { useDispatch, useSelector } from "react-redux";
import LinkButton from "../../ui/LinkButton";
import { clearCart, getCart } from "./cartSlice";
import CartItem from "./CartItem";
import Button from "../../ui/Button";
import EmptyCart from "./EmptyCart";

function Cart() {
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userName);
  return (
    <div className="p-5">
      <div className=" mb-10  ">
        <LinkButton to="/menu">&larr; Back to menu</LinkButton>
        {cart.length === 0 ? (
          ""
        ) : (
          <h1 className="mb-8 mt-5 text-xl font-medium">
            Your Cart, {userName}
          </h1>
        )}
        <ul>
          {cart.map((item) => (
            <CartItem item={item} key={item.pizzaId} />
          ))}
        </ul>
      </div>
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="space-x-2">
          <Button type="primary" to="/order/new">
            ORDER PIZZAS
          </Button>
          <Button type="clear" onClick={() => dispatch(clearCart())}>
            CLEAR CART
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cart;
