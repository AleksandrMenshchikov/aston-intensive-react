import fakeServer from '../backend/api/fakeServer';
import { BASE_URL_API, X_RAPIDAPI_KEY } from '../constants';
import { Film } from '../types/Film';

const filmService = {
  async getTopRatedSeries(): Promise<Film[] | null> {
    const LIST_NAME = 'top_rated_series_250';
    const url = `https://${BASE_URL_API}/titles/random?list=${LIST_NAME}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': X_RAPIDAPI_KEY,
        'x-rapidapi-host': BASE_URL_API,
      },
    };

    return await fakeServer.getFilmList(url, options);
  },
};

export default filmService;
