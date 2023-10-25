import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  return (
    <ul className=" divide-y-2">
      {menu.map((item) => (
        <MenuItem item={item} key={item.id} />
      ))}
    </ul>
  );
}

export default Menu;

export async function loader() {
  const menu = await getMenu();
  return menu;
}
