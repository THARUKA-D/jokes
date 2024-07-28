import axios from 'axios';

const addNewJoke = (payload, resetInputFields) => {
  axios.post('http://localhost:3003/addJoke', payload)
    .then(() => {
      resetInputFields();
    })
    .catch(function (error) {
      console.log(error);
    })
}

export {
  addNewJoke,
}
