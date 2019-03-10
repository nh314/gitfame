// @flow
import to from "await-to-js";

import defaultData from "../data.json";

export async function searchRepos(key: string) {
  let err, data;
  // const apiURL = "http://1.2.3.4" + key;
  const apiURL =
    "https://api.github.com/search/repositories?per_page=10&q=" +
    encodeURIComponent(key);
  [err, data] = await to(
    fetch(apiURL, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.items) {
          return responseJson.items;
        }
        throw responseJson;
      })
  );
  if (err) {
    console.log(err);
    return defaultData;
  }

  return data;
}
