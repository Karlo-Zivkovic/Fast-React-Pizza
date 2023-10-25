import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  return (
    <div>
      <div className="mt-10 flex items-center justify-center">
        <h1 className=" text-xl font-semibold">Order #{order.id} status</h1>
        <div className="ml-auto flex items-center justify-center gap-3 text-sm font-semibold uppercase text-stone-100">
          {order.priority && (
            <p className="rounded-full bg-red-500 px-5 py-1">priority</p>
          )}
          <p className="rounded-full bg-green-500 px-5 py-1">preparing order</p>
        </div>
      </div>
      <div className=" mt-5 flex h-20 items-center justify-between bg-stone-200 p-5">
        <p className="font-semibold">
          Only {calcMinutesLeft(order.estimatedDelivery)} minutes left 😀
        </p>
        <p className="ml-auto text-sm text-stone-500">
          (Estimated delivery: {formatDate(order.estimatedDelivery)})
        </p>
      </div>
      <ul className="mt-10 divide-y-2 border-y-2 ">
        {order.cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId).ingredients ??
              []
            }
          />
        ))}
      </ul>
      <div className=" mt-5 flex flex-col justify-between gap-1 bg-stone-200 p-5 text-sm">
        <p>Price pizza: {formatCurrency(order.orderPrice)} </p>
        {order.priority && (
          <p>Price priority: {formatCurrency(order.priorityPrice)}</p>
        )}
        <p className="text-base font-semibold">
          To pay on delivery:{" "}
          {formatCurrency(order.orderPrice + order.priorityPrice)}
        </p>
      </div>
      {!order.priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
export default Order;
