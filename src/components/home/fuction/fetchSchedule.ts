import axios from "axios";
import { Task } from "../interface/dataFecht";

export const fechSchedule = async (
  data: Task
): Promise<{ status: number; scheduleTask: string }> => {
  try {
    const response = await axios.post(
      "http://localhost:3000/schedule-task",
      data
    );

    if (response.status !== 201) {
      return { status: response.status, scheduleTask: "" };
    }

    return {
      status: response.status,
      scheduleTask: response.data.scheduleTask,
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return { status: error.response?.status || 500, scheduleTask: "" };
    } else {
      return { status: 500, scheduleTask: "" };
    }
  }
};
