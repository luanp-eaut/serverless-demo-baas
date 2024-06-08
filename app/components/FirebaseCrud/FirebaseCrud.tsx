"use client";

import { useCallback, useState } from "react";
import FirebaseConfig from "../FirebaseConfig/FirebaseConfig";
import { ref, get, set, update, remove, child } from "firebase/database";
import "./FirebaseCrud.css";

const database = FirebaseConfig();

export const FirebaseCrud = () => {
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

    const dbref = ref(database);
    get(child(dbref, `Customer/${userName}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          alert("username already exists!");
        } else {
          set(ref(database, `Customer/${userName}`), {
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

    const dbref = ref(database);
    get(child(dbref, `Customer/${userName}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          update(ref(database, `Customer/${userName}`), {
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

    const dbref = ref(database);
    get(child(dbref, `Customer/${userName}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          remove(ref(database, `Customer/${userName}`))
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

    const dbref = ref(database);
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

  return (
    <>
      <label>User Name</label>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <label>Full Name</label>
      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <br />
      <label>Phone Number</label>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br />
      <label>Date of Birth</label>
      <input
        type="date"
        value={dob?.toDateString()}
        onChange={(e) => setDob(new Date(e.target.value))}
      />
      <br />
      <button onClick={insertData}>Insert Data</button>
      <button onClick={updateData}>Update Data</button>
      <button onClick={deleteData}>Delete Data</button>
      <button onClick={selectData}>Select Data</button>
    </>
  );
};
