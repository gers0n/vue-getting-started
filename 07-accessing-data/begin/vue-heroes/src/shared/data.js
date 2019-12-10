import { format } from 'date-fns';
import { inputDateFormat } from './constants';
import * as axios from 'axios';

const getHeroes = async () => {
  let response = await axios.get('api/heroes.json');
  const heroes = response.data.map(h => {
    h.originDate = format(h.originDate, inputDateFormat);
    return h;
  });
  return heroes;
};
export const data = {
  getHeroes,
};
