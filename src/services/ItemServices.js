import { useHttp } from "../hooks/http.hook";

const ItemServices = () => {
  const { loading, request, error, clearError } = useHttp();

  // const _apiBase = "https://64cd27f5bb31a268409a6c77.mockapi.io/";

  const getAllItems = async () => {
    const res = await request("http://localhost:3001/goods");
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
      price: price,
      newPrice: newPrice,
      colors: colors,
      category: category,
    };
  };

  const getAllMembers = async () => {
    const res = await request("http://localhost:3001/members");
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
