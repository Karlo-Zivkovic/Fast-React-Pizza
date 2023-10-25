import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantity, removeItem } from "../cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import UpdateItemQuantity from "../cart/updateItemQuantity";

function MenuItem({ item }) {
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantity(item.id));

  function handleAddItem() {
    const newItem = {
      pizzaId: item.id,
      ingredients: item.ingredients,
      name: item.name,
      soldOut: item.soldOut,
      quantity: 1,
      unitPrice: item.unitPrice,
      totalPrice: item.unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }
  return (
    <li className="flex  p-2">
      <img
        src={item.imageUrl}
        alt="meal"
        className={`h-24 ${item.soldOut ? "opacity-60 grayscale" : ""}`}
      />
      <div className="flex grow flex-col px-4 capitalize">
        <p className="font-medium text-stone-700">{item.name}</p>
        <p className="text-sm italic text-stone-400">
          {item.ingredients.join(", ")}
        </p>
        <div className="mt-auto flex  items-center justify-between">
          <p className=" mr-auto text-sm font-medium text-stone-600">
            {item.soldOut ? "SOLD OUT" : `${formatCurrency(item.unitPrice)}`}
          </p>
          <div className="mr-4">
            {currentQuantity > 0 ? (
              <UpdateItemQuantity
                id={item.id}
                currentQuantity={currentQuantity}
              />
            ) : (
              ""
            )}
          </div>
          {item.soldOut ? (
            ""
          ) : currentQuantity > 0 ? (
            <Button
              onClick={() => dispatch(removeItem(item.id))}
              type={"small"}
            >
              Delete
            </Button>
          ) : (
            <Button onClick={handleAddItem} type="small">
              ADD TO CART
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
