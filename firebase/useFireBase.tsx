import { useCallback, useEffect, useState } from "react";
import { ref, get, set, update, remove, child } from "firebase/database";
import { firebaseDb } from "./FirebaseConfig";

export const useFireBase = () => {
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState<Date>();

  const isNullOrWhiteSpaces = useCallback((value: any) => {
    const val = value.toString();
    return val == null || val.replaceAll(" ", "").length < 1;
  }, []);

  const insertData = useCallback(() => {
    if (
      isNullOrWhiteSpaces(userName) ||
      isNullOrWhiteSpaces(fullName) ||
      isNullOrWhiteSpaces(phone) ||
      isNullOrWhiteSpaces(dob)
    ) {
      alert("fill all the fields");
      return;
    }

    const dbref = ref(firebaseDb);
    get(child(dbref, `Customer/${userName}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          alert("username already exists!");
        } else {
          set(ref(firebaseDb, `Customer/${userName}`), {
            fullname: fullName,
            phonenumber: phone,
            dateofbirth: dob,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("error while selecting data");
      });
  }, [dob, fullName, isNullOrWhiteSpaces, phone, userName]);

  const updateData = useCallback(() => {
    if (isNullOrWhiteSpaces(userName)) {
      alert("user name is required");
      return;
    }

    const dbref = ref(firebaseDb);
    get(child(dbref, `Customer/${userName}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          update(ref(firebaseDb, `Customer/${userName}`), {
            fullname: fullName,
            phonenumber: phone,
            dateofbirth: dob,
          })
            .then(() => {
              alert("update user successfully");
            })
            .catch((err) => {
              alert("error while updating user");
            });
        } else {
          alert("username doesn't exist!");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("error while selecting data");
      });
  }, [dob, fullName, isNullOrWhiteSpaces, phone, userName]);

  const deleteData = useCallback(() => {
    if (isNullOrWhiteSpaces(userName)) {
      alert("user name is required");
      return;
    }

    const dbref = ref(firebaseDb);
    get(child(dbref, `Customer/${userName}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          remove(ref(firebaseDb, `Customer/${userName}`))
            .then(() => {
              alert("delete user successfully");
            })
            .catch((err) => {
              alert("error while deleting user");
            });
        } else {
          alert("username doesn't exist!");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("error while selecting data");
      });
  }, [isNullOrWhiteSpaces, userName]);

  const selectData = useCallback(() => {
    if (isNullOrWhiteSpaces(userName)) {
      alert("user name is required");
      return;
    }

    const dbref = ref(firebaseDb);
    get(child(dbref, `Customer/${userName}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const val = snapshot.val();
          setFullName(val.fullname);
          setPhone(val.phonenumber);
          setDob(val.dateofbirth);
        } else {
          alert("no data available!");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("error while selecting data");
      });
  }, [isNullOrWhiteSpaces, userName]);

  return { insertData, updateData, deleteData, selectData };
};
