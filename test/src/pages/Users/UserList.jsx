import React, { useState, useEffect } from "react";
import styleHome from "../Home/home.module.css";

const UserList = () => {
  const [storage, setStorage] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    //! get data from local storage
    const storage = JSON.parse(localStorage.getItem("user"));
    setStorage(storage);

    //! fetch data from server
    fetch("http://localhost:3000/usersDetails")
      .then((response) => response.json())
      .then((respone2) => setData(respone2));
  }, []);

  return (
    <div className={styleHome.container}>
      <div className={styleHome.rightSide}>
        <div className={styleHome.rightSide_userList}>
          <div>
            <div>Name</div>
            <div>Surname</div>
            <div>Number</div>
            <div>Email</div>
            <div>Age</div>
            <div>Position</div>
          </div>
          {data.map((item) => {
            if (item.id !== storage.id) {
              return (
                <div key={item.id}>
                  <div>{item.name}</div>
                  <div>{item.surname}</div>
                  <div>{item.number}</div>
                  <div>{item.email}</div>
                  <div>{item.age}</div>
                  <div>{item.qualification}</div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default UserList;
