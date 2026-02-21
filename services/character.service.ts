import axios from "axios";
import type { Character, CharactersResponse } from "../models/character.model";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

// Base CDN correcta según docs
const IMG_BASE_URL = "https://cdn.thesimpsonsapi.com";
const IMG_SIZE = "200"; // puedes usar 200, 500 o 1280

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const characterService = {
  getCharacters: async (page: number = 1): Promise<Character[]> => {
    try {
      const response = await api.get<CharactersResponse>("/characters", {
        params: { page },
      });

      const characters = response.data.results;

      return characters.map((c) => {
        const portraitUrl = `${IMG_BASE_URL}/${IMG_SIZE}${c.portrait_path}`;

        return {
          ...c,
          portrait_path: portraitUrl,
        };
      });
    } catch (error) {
      console.error("Error al obtener personajes:", error);
      throw new Error("Error al cargar personajes");
    }
  },
};