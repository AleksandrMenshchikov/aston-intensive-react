export type Film = {
  id: string;
  originalTitleText: {
    text: string;
    __typename: string;
  };
  position: number;
  primaryImage: FilmImage;
  releaseDate: {
    day: number;
    month: number;
    year: number;
    __typename: string;
  };
  releaseYear: {
    year: number;
    endYear: number;
    __typename: string;
  };
  titleText: {
    text: string;
    __typename: string;
  };
  titleType: {
    text: string;
    id: string;
    isSeries: boolean;
    isEpisode: boolean;
    __typename: string;
  };
  _id: string;
};

export type FilmImage = {
  id: string;
  width: number;
  height: number;
  url: string;
  caption: {
    plainText: string;
    __typename: string;
  };
};

export type FilmId = Film['_id'];
