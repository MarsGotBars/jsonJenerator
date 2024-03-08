import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useOptionContext } from "../context/Optioncontext";

const postProductData = async (product) => {
  let x = 0;
  let productUrl;
  try {
    console.log(product);
    const checkProductUrl = `${process.env.REACT_APP_API_URL}?slug=${product.slug}&consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${process.env.REACT_APP_CS}`;
    const checkProduct = await axios.get(checkProductUrl);
    !checkProduct.data.length
      ? console.log("creating new product...")
      : console.log("updating existing product...");
    productUrl = `${process.env.REACT_APP_API_URL}54905?consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${process.env.REACT_APP_CS}`;
    const productResponse = await axios.post(productUrl, product);
    const variations = product.variations;
    const id = productResponse.data.id;
    const currentVariations = await axios.get(
      `${process.env.REACT_APP_API_URL}${id}/variations?consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${process.env.REACT_APP_CS}`
    );
    const curVarData = currentVariations.data;
    const deleteVariations = curVarData.map(async (variation) => {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}${id}/variations/${variation.id}?consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${process.env.REACT_APP_CS}`
      );
    });
    await Promise.all(deleteVariations);
    console.log("variations deleted succesfully");
    const variationsUrl = `${process.env.REACT_APP_API_URL}${id}/variations?consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${process.env.REACT_APP_CS}`;
    const postVarPromises = variations.map(async (obj) => {
      x++;
      const productVarResponse = await axios.post(variationsUrl, obj);
      return productVarResponse;
    });
    const variationResponses = await Promise.all(postVarPromises);
    product.count = x;
    return product;
  } catch (error) {
    console.error("Error processing data", error);
  }
};

export const useSendProduct = () => {
  const { vars, prods } = useOptionContext();
  const [amountVariations, setAmountvariations] = vars;
  const [productCompletion, setProductCompletion] = prods;
  const mutation = useMutation({
    mutationFn: postProductData,
    onError: (error) => {
      console.error("Error sending product data:", error);
    },
    onSuccess: async (data) => {
      console.log(data);
      setAmountvariations(data.count);
      setProductCompletion(true);
      setTimeout(() => {
        setProductCompletion(false);
      }, 4000);
    },
  });
  console.log(amountVariations);
  return mutation;
};
