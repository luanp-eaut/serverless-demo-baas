import { firebaseStorage } from "@/lib/firebaseConfig";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";

export const useLectures = () => {
  const [lecture, setLecture] = useState("");

  useEffect(() => {
    listAll(ref(firebaseStorage, "lectures"))
      .then((files) => {
        getDownloadURL(files.items[0])
          .then((url) => setLecture(url))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);
  return { lecture };
};
