import { useHttp } from "../hooks/http.hook";

const ItemServices = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://64cd27f5bb31a268409a6c77.mockapi.io/";

  const getAllItems = async () => {
    const res = await request(`${_apiBase}list`);
    return res.map((item) => _transformItems(item));
  };

  const _transformItems = (item) => {
    const pr = item.price.toString();
    const { id, image, description, price } = item;
    return {
      id: id,
      image: image,
      description: description
        ? `${item.description.slice(0, 170)}...`
        : "У этого товара нет описания",
      price: pr.length > 3 ? pr.slice(0, -3) + " " + pr.slice(-3) : price,
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
