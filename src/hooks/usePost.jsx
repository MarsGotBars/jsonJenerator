import { useMutation } from "@tanstack/react-query";
import axios from "axios";
const postProductData = (product) => {
  const url = `${process.env.REACT_APP_API_URL}54905?consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${process.env.REACT_APP_CS}`;
  console.log("posting to:", url);
  return axios.post(url, product);
};

const receiveProductData = async (error) => {
  try {
    const response = await axios.get( 
      `${process.env.REACT_APP_API_URL}54905?consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${process.env.REACT_APP_CS}`
    );
    const slug = error.config.url.slug && error.config.url.slug;
    //   const productName = "Dekton Natura keramiek keukenblad";
    // `${process.env.REACT_APP_API_URL}?slug=${slug}?consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${process.env.REACT_APP_CS}`
    console.log(response.data);
    // TODO: maak een functie om de product data te verwerken als deze nog niet bestond
    // updateProductData(response.data)
  } catch {
    console.error("error fetching 🤓", error);
  }
};
const postVariations = () => {
    console.log("hoi :D");
}
export const useSendProduct = () => {
  return useMutation({
    mutationFn: postProductData,
    onError: (error) => {
      console.error("Error occurred while sending product:", error);
      receiveProductData(error);
    },
    onSuccess: (data) => {
      postVariations();
      console.log(data, "sent");
    },
  });
};
