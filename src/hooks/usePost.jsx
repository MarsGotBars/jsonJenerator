import { useMutation } from "@tanstack/react-query";
import axios from "axios";
const postProductData = ({ product, productName }) => {
  const url = `${process.env.REACT_APP_API_URL}54905?consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${process.env.REACT_APP_CS}`;
  console.log("posting to:", url);
  console.log("product name:", productName);
  return axios.post(product);
};

const updateProductData = async (error) => {
  const productName = error.config.url.name
//   const productName = "Dekton Natura keramiek keukenblad";
  const slug = productName.toLowerCase().split(" ").join("-");
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}?slug=${slug}&consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${process.env.REACT_APP_CS}`
    );
    console.log(response.data[0]);
  } catch {
    console.error("error fetching 🤓", error);
  }
};

export const useSendProduct = () => {
  return useMutation({
    mutationFn: postProductData,
    onError: (error) => {
      console.error("Error occurred while sending product:", error);
      updateProductData(error);
    },
    onSuccess: (data) => {
      console.log(data, "sent");
    },
  });
};
