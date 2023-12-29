export interface Movie {
   id: number;
   title: string;
   poster_path: string;
   overview?: string;
   popularity?: number;
   release_date?: string;
   runtime?: number;
   genres: { id: number; name: string }[];
}

export interface Filters {
   year?: number;
   genre?: string;
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