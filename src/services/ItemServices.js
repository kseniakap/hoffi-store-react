import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://64cd27f5bb31a268409a6c77.mockapi.io/list";

  const getAllItems = async () => {
    const res = await request(`${_apiBase}`);
    return res.map(_transformItems);
  };

  const _transformItems = (item) => {
    return {
      id: item.id,
      image: item.image,
      description:
        item.description
          ? `${item.description.slice(0, 170)}...`
          : "У этого товара нет описания",
      price: item.price,
    };
  };

  return {
    loading,
    error,
    clearError,
    getAllItems,
  };
};

export default useMarvelService;
