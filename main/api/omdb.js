import axios from 'axios';

export default axios.create({
  baseURL: 'http://www.omdbapi.com/?type=movie&apikey=a1b5f9ec&s=',
});
