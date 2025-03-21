export interface IRandomFilmsResponse {
  entries: number;
  results: {
    _id: number;
    primaryImage: {
      url: string;
      width: number;
      height: number;
    };
    titleText: {
      text: string;
    };
    releaseYear: {
      year: number;
    };
  }[];
}
