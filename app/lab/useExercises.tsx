import { firebaseStorage } from "@/lib/firebaseConfig";
import { ref, listAll, getDownloadURL, ListResult } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";

export const useExercises = () => {
  const [exercises, setExercises] = useState<string[]>([]);

  const getUrls = useCallback(async (files: ListResult) => {
    const urls = [];
    try {
      for await (const f of files.items) {
        const url = await getDownloadURL(f);
        urls.push(url);
      }
      setExercises(urls);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    listAll(ref(firebaseStorage, "exercises"))
      .then(getUrls)
      .catch((err) => console.log(err));
  }, [getUrls]);
  return { exercises };
};
