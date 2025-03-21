import fakeServer from '../backend/api/fakeServer';
import { Film } from '../types/Film';

const X_RAPID_KEY = 'c40f5dc7ffmsh784d0dc2efd0961p1866b9jsn9aa4867a76dd';
const API_HOST = 'moviesdatabase.p.rapidapi.com';
//TODO заменить импортом из констант после мерджа

const filmService = {
  async getTopRatedSeries(): Promise<Film[] | null> {
    const LIST_NAME = 'top_rated_series_250';
    const url = `https://${API_HOST}/titles/random?list=${LIST_NAME}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': X_RAPID_KEY,
        'x-rapidapi-host': API_HOST,
      },
    };

    return await fakeServer.getFilmList(url, options);
  },
};

export default filmService;
