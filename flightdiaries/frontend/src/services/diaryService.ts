import axios from "axios";
import type { DiaryEntry, NewDiaryEntry } from "../types";

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = async () => {
  try {
    const response = await axios.get<DiaryEntry[]>(baseUrl);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      throw error
      // Do something with this error...
    } else {
      throw error
    }
  }
};

const create = async (object: NewDiaryEntry) => {
  try {
    const response = await axios.post<DiaryEntry>(baseUrl, object);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      throw error
      // Do something with this error...
    } else {
      throw error
    }
  }
};

export default { getAll, create };
