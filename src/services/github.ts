import { GitRepo } from "../components/GitRepo/Repo";
import defaultData from "../data.json";

type ResponseJson = {
  total_count: number;
  incomplete_results: boolean;
  items: Array<GitRepo>;
  message: string;
};

interface IResponseError {
  httpStatus: number;
  message: string;
}

export class ReponseError extends Error implements IResponseError {
  httpStatus: number;
  constructor(message: string, httpStatus: number) {
    super(message);
    this.httpStatus = httpStatus;
  }
}

export async function searchRepos(key: string, page = 1, record_per_page = 10) {
  record_per_page = (record_per_page < 100 && record_per_page) || 100;
  const apiURL = `https://api.github.com/search/repositories?per_page=${record_per_page}&q=${encodeURIComponent(
    key
  )}&page=${page}`;

  const response = await fetch(apiURL, { method: "GET" });
  const responseJson: ResponseJson = await response.json();
  if (response.ok) {
    return responseJson.items;
  }

  throw new ReponseError(responseJson.message, response.status);
}
