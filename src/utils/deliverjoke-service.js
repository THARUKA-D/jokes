import axios from 'axios';

const fetchModeratedJoke = (setIsLoading, setModeratedJoke) => {
  setIsLoading(true);
  axios.get('http://localhost:3001/fetchJoke')
    .then( response => {
      const joke = response.data.data;
      setModeratedJoke(joke?.length ? joke : undefined);
    })
    .catch( error => {
      console.log(error);
    })
    .finally(() => {
      setIsLoading(false);
    })
}

const fetchJokeTypes = (setJokeTypes, setIsJokeTypesLoading) => {
  setIsJokeTypesLoading(true);
  axios.get('http://localhost:3001/jokeTypes')
    .then(response => {
      setJokeTypes(response.data.data);
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      setIsJokeTypesLoading(false);
    })
}

export {
  fetchModeratedJoke,
  fetchJokeTypes,
}
