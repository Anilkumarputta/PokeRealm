import { createContext, useEffect, useRef, useState } from "react";
import colors from "../constants/colors";
import serverApi from "../services/serverApi";
import {
  THEME_STORAGE_KEY,
  ACCENT_STORAGE_KEY,
  CONTRAST_STORAGE_KEY,
  MOTION_STORAGE_KEY,
  SCENE_STORAGE_KEY,
  SEASON_STORAGE_KEY,
  SOUND_STORAGE_KEY,
  scenes,
  seasonalThemes,
  soundPacks
} from "../constants/theme";

const themeContext = createContext();

const readStoredPreference = (key, validator, fallback) => {
  const stored = localStorage.getItem(key);
  if (validator(stored)) {
    return stored;
  }

  return fallback;
};

const ThemeContextProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() =>
    readStoredPreference(
      THEME_STORAGE_KEY,
      (value) => value === "light" || value === "dark",
      "dark"
    )
  );

  const [accentType, setAccentType] = useState(() =>
    readStoredPreference(
      ACCENT_STORAGE_KEY,
      (value) => Boolean(value && colors.types[value]),
      "psychic"
    )
  );

  const [contrastMode, setContrastMode] = useState(() =>
    readStoredPreference(
      CONTRAST_STORAGE_KEY,
      (value) => value === "standard" || value === "high",
      "standard"
    )
  );

  const [motionMode, setMotionMode] = useState(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return readStoredPreference(
        MOTION_STORAGE_KEY,
        (value) => value === "standard" || value === "reduced",
        "reduced"
      );
    }

    return readStoredPreference(
      MOTION_STORAGE_KEY,
      (value) => value === "standard" || value === "reduced",
      "standard"
    );
  });

  const [backgroundScene, setBackgroundScene] = useState(() =>
    readStoredPreference(SCENE_STORAGE_KEY, (value) => scenes.includes(value), "nebula")
  );

  const [seasonTheme, setSeasonTheme] = useState(() =>
    readStoredPreference(
      SEASON_STORAGE_KEY,
      (value) => seasonalThemes.includes(value),
      "default"
    )
  );

  const [soundPack, setSoundPack] = useState(() =>
    readStoredPreference(SOUND_STORAGE_KEY, (value) => soundPacks.includes(value), "off")
  );

  const audioContextRef = useRef(null);
  const ambientIntervalRef = useRef(null);

  const cycleValue = (items, current, setter) => {
    const currentIndex = items.findIndex((x) => x === current);
    const nextIndex = (currentIndex + 1) % items.length;
    setter(items[nextIndex]);
  };

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const cycleAccentType = () => {
    const accentKeys = ["psychic", "water", "fire", "grass", "electric", "dragon"];
    cycleValue(accentKeys, accentType, setAccentType);
  };

  const toggleContrast = () => {
    setContrastMode((prev) => (prev === "standard" ? "high" : "standard"));
  };

  const toggleMotion = () => {
    setMotionMode((prev) => (prev === "standard" ? "reduced" : "standard"));
  };

  const cycleBackgroundScene = () => {
    cycleValue(scenes, backgroundScene, setBackgroundScene);
  };

  const cycleSeasonTheme = () => {
    cycleValue(seasonalThemes, seasonTheme, setSeasonTheme);
  };

  const cycleSoundPack = () => {
    cycleValue(soundPacks, soundPack, setSoundPack);
  };

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    document.body.dataset.theme = themeMode;
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem(ACCENT_STORAGE_KEY, accentType);
    const accentHex = colors.types[accentType] ?? colors.types.psychic;

    document.documentElement.style.setProperty("--accent-color", accentHex);
    document.documentElement.style.setProperty("--accent-soft", `${accentHex}66`);
  }, [accentType]);

  useEffect(() => {
    localStorage.setItem(CONTRAST_STORAGE_KEY, contrastMode);
    document.body.dataset.contrast = contrastMode;
  }, [contrastMode]);

  useEffect(() => {
    localStorage.setItem(MOTION_STORAGE_KEY, motionMode);
    document.body.dataset.motion = motionMode;
  }, [motionMode]);

  useEffect(() => {
    localStorage.setItem(SCENE_STORAGE_KEY, backgroundScene);
    document.body.dataset.scene = backgroundScene;
  }, [backgroundScene]);

  useEffect(() => {
    localStorage.setItem(SEASON_STORAGE_KEY, seasonTheme);
    document.body.dataset.season = seasonTheme;
  }, [seasonTheme]);

  useEffect(() => {
    localStorage.setItem(SOUND_STORAGE_KEY, soundPack);
  }, [soundPack]);

  useEffect(() => {
    const clearAmbient = () => {
      if (ambientIntervalRef.current) {
        clearInterval(ambientIntervalRef.current);
        ambientIntervalRef.current = null;
      }
    };

    if (soundPack === "off" || motionMode === "reduced") {
      clearAmbient();
      return;
    }

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const ctx = audioContextRef.current;
      const frequencies = soundPack === "forest" ? [196, 247, 294] : [220, 261.6, 329.6];

      const playPulse = () => {
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(
          frequencies[Math.floor(Math.random() * frequencies.length)],
          ctx.currentTime
        );

        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.018, ctx.currentTime + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start();
        oscillator.stop(ctx.currentTime + 2.0);
      };

      playPulse();
      ambientIntervalRef.current = setInterval(playPulse, 9500);
    } catch (error) {
      clearAmbient();
    }

    return clearAmbient;
  }, [soundPack, motionMode]);

  useEffect(() => {
    let saveTimeout;

    const savePreferences = async () => {
      if (!sessionStorage.getItem("token")) {
        return;
      }

      saveTimeout = setTimeout(async () => {
        await serverApi.saveThemePreferences({
          themeMode,
          accentType,
          contrastMode,
          motionMode,
          backgroundScene,
          seasonTheme,
          soundPack,
        });
      }, 700);
    };

    savePreferences();

    return () => {
      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }
    };
  }, [
    themeMode,
    accentType,
    contrastMode,
    motionMode,
    backgroundScene,
    seasonTheme,
    soundPack,
  ]);

  useEffect(() => {
    const hydratePreferences = async () => {
      const hasToken = sessionStorage.getItem("token");
      if (!hasToken) {
        return;
      }

      const serverPreferences = await serverApi.getThemePreferences();
      if (!serverPreferences?.status || !serverPreferences.data) {
        return;
      }

      const prefs = serverPreferences.data;
      if (prefs.themeMode === "light" || prefs.themeMode === "dark") {
        setThemeMode(prefs.themeMode);
      }

      if (prefs.accentType && colors.types[prefs.accentType]) {
        setAccentType(prefs.accentType);
      }

      if (prefs.contrastMode === "standard" || prefs.contrastMode === "high") {
        setContrastMode(prefs.contrastMode);
      }

      if (prefs.motionMode === "standard" || prefs.motionMode === "reduced") {
        setMotionMode(prefs.motionMode);
      }

      if (scenes.includes(prefs.backgroundScene)) {
        setBackgroundScene(prefs.backgroundScene);
      }

      if (seasonalThemes.includes(prefs.seasonTheme)) {
        setSeasonTheme(prefs.seasonTheme);
      }

      if (soundPacks.includes(prefs.soundPack)) {
        setSoundPack(prefs.soundPack);
      }
    };

    const handleAuthChanged = () => {
      hydratePreferences();
    };

    hydratePreferences();
    window.addEventListener("auth-changed", handleAuthChanged);
    return () => window.removeEventListener("auth-changed", handleAuthChanged);
  }, []);

  return (
    <themeContext.Provider
      value={{
        themeMode,
        accentType,
        contrastMode,
        motionMode,
        backgroundScene,
        seasonTheme,
        soundPack,
        toggleTheme,
        cycleAccentType,
        toggleContrast,
        toggleMotion,
        cycleBackgroundScene,
        cycleSeasonTheme,
        cycleSoundPack,
        accentColor: colors.types[accentType],
      }}
    >
      {children}
    </themeContext.Provider>
  );
};

export { themeContext, ThemeContextProvider };