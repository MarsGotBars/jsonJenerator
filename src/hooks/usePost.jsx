import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useOptionContext } from "../context/Optioncontext";
import { useState } from "react";

const postProductData = async (product) => {
  let x = 0;
  let productUrl;
  try {
    const checkProductUrl = `${process.env.REACT_APP_API_URL}?slug=${product.slug}&consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${process.env.REACT_APP_CS}`;
    const checkProduct = await axios.get(checkProductUrl);
    const checkProductVariations =
      checkProduct.data.length !== 0 && checkProduct.data[0].variations;
    const checkProductId =
      checkProduct.data.length !== 0 && checkProduct.data[0].id;
    if (checkProduct.data.length === 0) {
      console.log("creating new product...");
    } else {
      console.log("updating existing product...");
      if (checkProductVariations.length >= 0) {
        const deleteVariations = checkProductVariations.map(
          async (variation) => {
            await axios.delete(
              `${process.env.REACT_APP_API_URL}${checkProductId}/variations/${variation}?consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${process.env.REACT_APP_CS}`
            );
          }
        );
        await Promise.all(deleteVariations);
        console.log("variations deleted succesfully");
      } else return;
    }
    // properly working
    productUrl = `${process.env.REACT_APP_API_URL}${
      checkProductId ? checkProductId : ""
    }?consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${
      process.env.REACT_APP_CS
    }`;
    const productResponse = await axios.post(productUrl, product);
    const variationsUrl = `${process.env.REACT_APP_API_URL}${
      checkProductId ? checkProductId : productResponse.data.id
    }/variations/?consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${
      process.env.REACT_APP_CS
    }`;
    const variations = product.variations;
    const postVarPromises = variations.map(async (obj, i) => {
      x = i+1
      const productVarResponse = await axios.post(variationsUrl, obj);
      return productVarResponse;
    });
    await Promise.all(postVarPromises);
    product.count = x;
    return product;
  } catch (error) {
    console.error("Error processing data", error.response?.data.code);
    throw error;
  }
};

export const useSendProduct = () => {
  const { vars } = useOptionContext();
  const [amountVariations, setAmountvariations] = vars;
  const mutation = useMutation({
    mutationFn: postProductData,
    onError: (error) => {
      console.error("Error sending product data");
      setAmountvariations(0)
    },
    onSuccess: async (data) => {
      console.log(data);
      setAmountvariations(data.count ? data.count : 0);
    },
  });
  return mutation;
};
