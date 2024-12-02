export interface Uporabnik {
   id_uporabnika: number;
   ime: string;
   priimek: string;
   mail: string;
   password?: string;
}

export interface Kategorija {
   id_kategorije: number;
   naziv: string;
}

export interface Oglas {
   id_oglas:number;
   text: string;
   datumObjave: string;
   kategorija_naziv: string;
}