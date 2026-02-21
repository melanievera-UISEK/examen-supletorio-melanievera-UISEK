import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonChip,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import type { Character } from "../models/character.model";
import { characterService } from "../services/character.service";
import "./Home.css";

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadCharacters = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await characterService.getCharacters(1);
      setCharacters(data);
    } catch {
      setError("Error al cargar personajes");
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>The Simpsons</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonLoading isOpen={loading} message="Cargando personajes..." />

        <div className="page-wrap">
          {error && (
            <div className="helper-text">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && characters.length === 0 && (
            <div className="helper-text">
              <p>No hay personajes disponibles.</p>
            </div>
          )}

          {!loading && !error && characters.length > 0 && (
            <IonList>
              {characters.map((char) => (
                <IonItem key={char.id} lines="none" className="character-item">
                  <IonCard className="character-card">
                    <div className="character-row">
                      <div className="character-avatar">
                        <img
                          src={char.portrait_path}
                          alt={char.name}
                          loading="lazy"
                        />
                      </div>

                      <div className="character-main">
                        <p className="character-name">{char.name}</p>
                        <p className="character-sub">
                          Ocupación: {char.occupation}
                        </p>

                        <div className="character-meta">
                          <IonChip className="meta-chip">
                            Estado: {char.status}
                          </IonChip>
                          <IonChip className="meta-chip">
                            Edad: {char.age ?? "N/A"}
                          </IonChip>
                        </div>
                      </div>
                    </div>
                  </IonCard>
                </IonItem>
              ))}
            </IonList>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;