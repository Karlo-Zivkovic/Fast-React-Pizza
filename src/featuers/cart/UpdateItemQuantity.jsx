import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseQuantity, increaseQuantity } from "./cartSlice";

function UpdateItemQuantity({ currentQuantity, id }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => dispatch(decreaseQuantity(id))}
        type={"updateQuantity"}
      >
        -
      </Button>

      {currentQuantity}
      <Button
        onClick={() => dispatch(increaseQuantity(id))}
        type={"updateQuantity"}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
