export type MovieProps = {
  id: number;
  poster_path: string;
  original_title: string;
  original_name: string;
  overview: string;
};

export type MovieListProps = {
  results: MovieProps[];
};
