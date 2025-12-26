import React, { createContext, useState, useRef, useEffect } from "react";
import { Audio } from "expo-av";

export const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const sound = useRef(null);

  const [currentStation, setCurrentStation] = useState(null);
  const [status, setStatus] = useState("idle"); 
  // idle | loading | playing | paused | error

  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
    });
  }, []);

  const playStation = async (station) => {
    try {
      setStatus("loading");

      if (sound.current) {
        await sound.current.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: station.stream },
        { shouldPlay: true }
      );

      sound.current = newSound;
      setCurrentStation(station);
      setStatus("playing");
    } catch (e) {
      console.log(e);
      setStatus("error");
    }
  };

  const togglePlayPause = async () => {
    if (!sound.current) return;

    if (status === "playing") {
      await sound.current.pauseAsync();
      setStatus("paused");
    } else {
      setStatus("loading");
      await sound.current.playAsync();
      setStatus("playing");
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentStation,
        status,
        playStation,
        togglePlayPause,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
