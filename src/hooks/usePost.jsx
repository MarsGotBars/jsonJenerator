import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
const postProductData = (product) => {
    const url = `${process.env.REACT_APP_API_URL}54905?consumer_key=${process.env.REACT_APP_CK}&consumer_secret=${process.env.REACT_APP_CS}`
    console.log("posting to:", url);
    return axios.post(url, product)
}
export const useSendProduct = () => {
 return useMutation({mutationFn: postProductData,
    onError: (error) => {
            console.error("Error occurred while sending product:", error);
    },
    onSuccess: (data) => {
        console.log(data, "sent")
    }
 })
}