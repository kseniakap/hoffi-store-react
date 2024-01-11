import { useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useTranslation } from "react-i18next";
import { CustomContext } from "../Context";

const ItemServices = () => {
  const { t } = useTranslation();
  const { BASE_URL } = useContext(CustomContext)
  const { loading, request, error, clearError } = useHttp();

  const getAllItems = async () => {
    const res = await request(`${BASE_URL}/goods`);
    return res.map((item) => _transformItems(item));
  };

  const _transformItems = (item) => {
    const { id, image, name, description, price, newPrice, colors, category } =
      item;

    return {
      id: id,
      image: image,
      name: name,
      description: description
        ? `${item.description.slice(0, 130)}...`
        : "В данный момент описание о данном товаре отсутствует",
      price: parseInt(price, 10),
      newPrice: newPrice,
      colors: colors,
      category: category,
    };
  };

  const getAllMembers = async () => {
    const res = await request(`${BASE_URL}/${t("url.allMembers")}`);
    return res.map((item) => _transformDataMembers(item));
  };

  const _transformDataMembers = (item) => {
    const { id, name, prof, img, bio, email, number, linkSite } = item;

    return {
      id: id,
      name: name,
      bio: bio,
      img: img,
      prof: prof,
      email: email,
      number: number,
      linkSite: linkSite,
    };
  };

  return {
    loading,
    error,
    clearError,
    getAllItems,
    getAllMembers,
  };
};

export default ItemServices;
