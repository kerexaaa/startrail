import { useEffect, useState } from "react";
import { loaderData } from "@/app/utils/loader";
import { LOADER_CHANGE } from "../constants";

function getRandom() {
  return Math.floor(Math.random() * loaderData.phrases.length);
}

function changePhrase() {
  return loaderData.phrases[getRandom()];
}

export function useLoaderPhrase() {
  const [phrase, setPhrase] = useState(changePhrase());

  useEffect(() => {
    const interval = setInterval(() => {
      setPhrase(changePhrase());
    }, LOADER_CHANGE);

    return () => clearInterval(interval);
  }, []);

  return phrase;
}
