import axios from "axios";
import { Task } from "../interface/dataFecht";

export const fetchRunNow = async (
  data: Task
): Promise<{ status: number; html: string }> => {
  try {
    console.log("Sending data:", data);

    const response = await axios.post("http://localhost:3000/analyze", data);
    console.log(response);
    if (response.status !== 200) {
      return { status: response.status, html: "" };
    }

    const htmlContent = response.data.html;
    const returnData = {
      status: response.status,
      html: htmlContent,
    };
    return returnData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return { status: error.response.status, html: "" };
      }
      return { status: 500, html: "" };
    } else {
      console.error("Unexpected error:", error);
      return { status: 500, html: "" };
    }
  }
};
