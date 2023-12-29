import axios from "axios";

export const getData = async ({apiUrl}:any) => {
    
//   const apiUrl = "https://jsonplaceholder.typicode.com/todos/1";

  try {
    const response = await axios.get(
      apiUrl
    );
    console.log("get", response.data)
    return response;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
