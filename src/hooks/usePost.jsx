import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const postProductData = async (product) => {
  try {
    const productUrl = `${process.env.REACT_APP_API_URL}54905?consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${process.env.REACT_APP_CS}`;
    const productResponse = await axios.post(productUrl, product);
    const variations = product.variations;
    const id = productResponse.data.id
    const variationsUrl = `${process.env.REACT_APP_API_URL}${id}/variations?consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${process.env.REACT_APP_CS}`;
    const postVarPromises = variations.map(async (obj) => {
      const productVarResponse = await axios.post(variationsUrl, obj)
      return productVarResponse
    })
    const variationResponses = await Promise.all(postVarPromises)
    console.log("All variations posted successfully:", variationResponses);
    console.log("posting product data to:", productUrl, "and", variationsUrl);
  } catch (error) {
    console.error(":steamhappy:", error);
  }
};

export const useSendProduct = () => {
  const mutation = useMutation({
    mutationFn: postProductData,
    onSuccess: async (data) => {
      console.log("Product data sent successfully:", data);
    },
    onError: (error) => {
      console.error("Error sending product data:", error);
    },
  });

  return mutation;
};
