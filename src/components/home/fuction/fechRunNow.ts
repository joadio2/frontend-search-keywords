import axios from "axios";
import { DataFetch } from "../interface/dataFecht";
export const fechRunNow = async (data: DataFetch): Promise<void> => {
  try {
    console.log(data);
    const response = await axios.post("http://localhost:3000/analyze", data);

    console.log(response.data);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
    } else {
      console.error(error);
    }
  }
};
