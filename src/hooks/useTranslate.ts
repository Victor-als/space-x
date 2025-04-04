import { useEffect, useState } from "react";
import axios from "axios";

export function useTranslate(text: string) {
  const [translated, setTranslated] = useState("");

  useEffect(() => {
    const translate = async () => {
      try {
        const response = await axios.post("https://libretranslate.com/translate", {
          q: text,
          source: "en",
          target: "pt",
          format: "text",
        }, {
          headers: { "Content-Type": "application/json" }
        });

        setTranslated(response.data.translatedText);
      } catch (err) {
        console.error("Erro na tradução:", err);
        setTranslated(text); 
      }
    };

    if (text) translate();
  }, [text]);

  return translated;
}