import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useOptionContext } from "../context/Optioncontext";

const postProductData = async (product) => {
  let x = 0;
  let productUrl;
  try {
    console.log(product);
    // ! experimental
    const checkProductUrl = `${process.env.REACT_APP_API_URL}?slug=${product.slug}&consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${process.env.REACT_APP_CS}`;
    console.log("checkProductUrl", checkProductUrl);
    const checkProduct = await axios.get(checkProductUrl);
    console.log("checkProduct", checkProduct);
    const checkProductVariations = checkProduct.data.length !== 0 && checkProduct.data[0].variations;
    const checkProductId = checkProduct.data.length !== 0 && checkProduct.data[0].id;
    if (checkProduct.data.length === 0) {
      console.log("creating new product...");
    } else {
      console.log("updating existing product...");
      if (checkProductVariations.length >= 0) {
        const deleteVariations = checkProductVariations.map(
          async (variation) => {
            console.log(variation);
            await axios.delete(
              `${process.env.REACT_APP_API_URL}${checkProductId}/variations/${variation}?consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${process.env.REACT_APP_CS}`
            );
          }
        );
        await Promise.all(deleteVariations);
        console.log("variations deleted succesfully");
      } else return;
    }
    console.log("here?");
    console.log(product.variation);
    console.log("wtf", product.variations);
    // properly working
    productUrl = `${process.env.REACT_APP_API_URL}${
      checkProductId ? checkProductId : ""
    }?consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${
      process.env.REACT_APP_CS
    }`;
    console.log(productUrl);
    const productResponse = await axios.post(productUrl, product);
    console.log("product posted!", productResponse);
    const variationsUrl = `${process.env.REACT_APP_API_URL}${checkProductId ? checkProductId : productResponse.data.id}/variations/?consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${process.env.REACT_APP_CS}`;
    console.log("product.variations", product.variations);
    const variations = product.variations
    const postVarPromises = variations.map(async (obj) => {
      x++;
      const productVarResponse = await axios.post(variationsUrl, obj);
      return productVarResponse;
    });
    const variationResponses = await Promise.all(postVarPromises);
    console.log("posted!", variationResponses);
    product.count = x;
    return product;
  } catch (error) {
    console.error("Error processing data", error.response?.data.code);
    throw error
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
    onSettled: async (data) => {
      console.log(data);
      // setAmountvariations(data.count);
      setProductCompletion(true);
      setTimeout(() => {
        setProductCompletion(false);
      }, 4000);
    },
  });
  // console.log(amountVariations);
  return mutation;
};
