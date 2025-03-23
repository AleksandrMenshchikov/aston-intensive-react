export interface IFilmsResponse {
  page?: number | string;
  next?: string | null;
  entries: number;
  results?: {
    _id: string;
    primaryImage: {
      url: string;
      width: number;
      height: number;
    } | null;
    titleType: {
      text: string;
    };
    titleText: {
      text: string;
    };
    releaseYear: {
      year: number;
    } | null;
  }[];
}

export interface IFilmsRequest {
  title: string;
  page: string;
}
