
export interface Character {
  id: number;
  name: string;
  age: number | null;        
  birthdate: string | null;  
  gender: string;
  occupation: string;
  status: string;
  portrait_path: string;
  phrases: string[];
}

export interface CharactersResponse {
  count: number;
  next: string | null;
  prev: string | null;
  pages: number;
  results: Character[];
}