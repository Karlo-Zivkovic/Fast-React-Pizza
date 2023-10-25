import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, ingredients, isLoadingIngredients }) {
  return (
    <li className="flex items-center py-3    ">
      <div>
        <p>
          <span className="text-sm font-bold">{item.quantity}x </span>
          {item.name}
        </p>
        <p className="mt-2 text-sm capitalize italic text-stone-500">
          {isLoadingIngredients ? "Loading..." : ingredients.join(", ")}
        </p>
      </div>
      <p className="ml-auto  font-semibold">
        {formatCurrency(item.totalPrice)}
      </p>
    </li>
  );
}

export default OrderItem;
