import { useSelector } from "react-redux";
import Button from "../../ui/Button";
import { Form, redirect, useActionData } from "react-router-dom";
import { clearCart, getCart } from "../cart/cartSlice";
import { createOrder } from "../../services/apiRestaurant";
import { store } from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import EmptyCart from "../cart/EmptyCart";

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const userName = useSelector((state) => state.user.userName);
  const cart = useSelector(getCart);
  const totalPrice = cart
    .map((item) => item.totalPrice)
    .reduce((sum, cur) => sum + cur, 0);
  const formErrors = useActionData();

  const [isChecked, setIsChecked] = useState(false);
  const priorityPrice = isChecked ? totalPrice + totalPrice * 0.2 : totalPrice;
  if (cart.length === 0) return <EmptyCart />;
  return (
    <div className="p-5">
      <div>
        <h1 className="text-xl font-semibold">Ready to order? Let's go!</h1>
        <Form
          method="POST"
          action="/order/new"
          className="mt-5 flex flex-col gap-5"
        >
          <div className="flex  items-center gap-5">
            <label className="basis-40">First Name</label>
            <input
              type="text"
              name="customer"
              defaultValue={userName}
              required
              className="input w-full "
            />
          </div>
          <div className="flex items-center gap-5">
            <label className="basis-40">Phone number</label>
            <div className="flex w-full flex-col">
              <input
                name="phone"
                required
                type="tel"
                className="input w-full "
              />
              {formErrors?.phone && (
                <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                  {formErrors.phone}{" "}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-5">
            <label className="basis-40">Address</label>
            <input
              type="text"
              name="address"
              required
              className="input w-full "
            />
          </div>
          <div className="mb-10 mt-5 flex  gap-5">
            <input
              type="checkbox"
              onChange={(e) => setIsChecked(e.target.checked)}
              value={isChecked}
              className=" w-5"
              name="priority"
            />
            <label className="text-basic  font-semibold">
              Want to give your order priority?
            </label>
          </div>
          <input type="hidden" value={JSON.stringify(cart)} name="cart" />
          <div>
            <Button type="primary">
              ORDER NOW FROM {formatCurrency(Math.round(priorityPrice))}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
