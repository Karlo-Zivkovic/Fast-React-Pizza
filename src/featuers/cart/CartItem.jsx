import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import UpdateItemQuantity from "./updateItemQuantity";
import { getCurrentQuantity, removeItem } from "./cartSlice";
import Button from "../../ui/Button";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantity(item.pizzaId));
  if (currentQuantity > 0)
    return (
      <li className="mt-5 flex items-center gap-4 border-b-2 pb-5">
        <p>
          {item.quantity}x {item.name}
        </p>
        <p className="ml-auto font-semibold">
          {formatCurrency(item.totalPrice)}
        </p>

        <UpdateItemQuantity
          id={item.pizzaId}
          currentQuantity={currentQuantity}
        />

        <Button
          onClick={() => dispatch(removeItem(item.pizzaId))}
          type={"small"}
        >
          Delete
        </Button>
      </li>
    );
}

export default CartItem;
