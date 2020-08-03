import axios from 'axios';

export default axios.create({
  baseURL: 'http://www.omdbapi.com/?type=movie&apikey=a1b5f9ec&s=',
});
// initialize axios for network requests > since we are making only one type of request
// we can include params in the base url itself
