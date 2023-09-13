import { useHttp } from "../hooks/http.hook";

const ItemServices = () => {
  const { loading, request, error, clearError } = useHttp();

  // const _apiBase = "https://64cd27f5bb31a268409a6c77.mockapi.io/";

  const getAllItems = async () => {
    const res = await request("http://localhost:3001/goods");
    return res.map((item) => _transformItems(item));
  };

  const _transformItems = (item) => {
    const { id, image, name, description, price, newPrice, category } = item;
    return {
      id: id,
      image: image,
      name: name,
      description: description
        ? `${item.description.slice(0, 130)}...`
        : "Чтобы узнать больше, нажмите на товар",
      price: price,
      newPrice: newPrice,
      category: category,
    };
  };

  return {
    loading,
    error,
    clearError,
    getAllItems,
  };
};

export default ItemServices;
