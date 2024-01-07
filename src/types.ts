export interface Movie {
   id: number;
   title: string;
   poster_path: string;
   genres: { id: number; name: string }[];
   overview: string;
   release_date: string;
   runtime: number;
   production_countries: { iso_3166_1: string; name: string }[];
   cast: Cast[];
}

export interface Cast {
   id: number;
   name: string;
}

export interface Filters {
   year?: number;
   genre?: Genre;
   rating?: number;
}

export interface Genre {
   id: number;
   name: string;
}

export interface Favorite {
   id: number;
   title: string;
}