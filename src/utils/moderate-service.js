import axios from "axios";
import { getAuthToken } from "./until";

const signIn = (payload, isLoading, navigateTo) => {
  isLoading(true);
  axios
    .post("http://localhost:3002/signIn", payload)
    .then((response) => {
      window.sessionStorage.setItem("jwt", `Bearer ${response.data}`);
      navigateTo();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      isLoading(false);
    });
};

const fetchUnmoderatedJoke = (isLoading, setJokeData) => {
  isLoading(true);
  axios
    .get("http://localhost:3002/getNewJoke", {
      headers: {
        Authorization: getAuthToken(),
      },
    })
    .then((response) => {
      setJokeData(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      isLoading(false);
    });
};

const addModeratedJoke = (
  payload,
  resetInputFields,
  isLoading,
  onDeleteJoke,
) => {
  isLoading(true);
  axios
    .post("http://localhost:3002/addNewJoke", payload, {
      headers: {
        Authorization: getAuthToken(),
      },
    })
    .then(() => {
      onDeleteJoke();
      resetInputFields();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      isLoading(false);
    });
};

const deleteJoke = (
  payload,
  resetInputFields,
  setIsLoading,
  onCompleteAction,
) => {
  setIsLoading(true);
  axios
    .post("http://localhost:3002/deleteJoke", payload, {
      headers: {
        Authorization: getAuthToken(),
      },
    })
    .then(() => {
      resetInputFields();
      onCompleteAction();
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export { signIn, fetchUnmoderatedJoke, addModeratedJoke, deleteJoke };
