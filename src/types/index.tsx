export type MovieProps = {
  id: number;
  poster_path: string;
  original_title: string;
  original_name: string;
  overview: string;
  vote_average: number;
  release_date: string;
  runtime: number;
};

export type CreditsProps = {
  cast: CastProps[];
  crew: CrewProps[];
};
export type CrewProps = {
  job: string;
  name: string;
};
export type CastProps = {
  name: string;
};

export type MovieListProps = {
  results: MovieProps[];
  total_results: number;
};
