import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label } from "reactstrap";
import styleHome from "../Home/home.module.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [storage, setStorage] = useState("");

  useEffect(() => {
    //! get data from local storage
    const storage = JSON.parse(localStorage.getItem("user"));
    setStorage(storage);

    //! fetch data from server
    fetch("http://localhost:3000/usersDetails")
      .then((response) => response.json())
      .then((respone2) => setData(respone2));
  }, []);

  //! Changing Input value functions start

  const handleChangeName = (e, id) => {
    let result = [...data];

    result.map((item) => {
      if (item.id === id) {
        item.name = e.target.value;
      }
      return item;
    });
    setData(result);
    e.preventDefault();
  };

  const handleChangeSurname = (e, id) => {
    let result = [...data];

    result.map((item) => {
      if (item.id === id) {
        item.surname = e.target.value;
      }
      return item;
    });
    setData(result);
    e.preventDefault();
  };

  const handleChangeAge = (e, id) => {
    let result = [...data];

    result.map((item) => {
      if (item.id === id) {
        item.age = Number(e.target.value);
      }
      return item;
    });
    setData(result);
    e.preventDefault();
  };

  const handleChangeQualification = (e, id) => {
    let result = [...data];

    result.map((item) => {
      if (item.id === id) {
        item.qualification = e.target.value;
      }
      return item;
    });
    setData(result);
    e.preventDefault();
  };

  const handleSubmit = (e, item) => {
    updateUser(item);
    e.preventDefault();
  };

  const updateUser = async (user) => {
    try {
      const response = await fetch(`http://localhost:3000/usersDetails/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return await response.json();
    } catch (error) {
      throw new error(error);
    }
  };
  return (
    <div className={styleHome.container}>
      <div className={styleHome.rightSide}>
        <div className={styleHome.rightSideMain}>
          {data.map((item) => {
            if (item.id === storage.id) {
              return (
                <Form className={styleHome.rightSide_form} key={item.id}>
                  <FormGroup>
                    <Label for="forName">Name</Label>
                    <input
                      type="text"
                      placeholder="name"
                      value={item.name}
                      onChange={(e) => handleChangeName(e, item.id)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="forSurname">Surname</Label>
                    <input
                      type="text"
                      placeholder="surname"
                      value={item.surname}
                      onChange={(e) => handleChangeSurname(e, item.id)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="forAge">Age</Label>
                    <input
                      type="number"
                      placeholder="age"
                      value={item.age}
                      onChange={(e) => handleChangeAge(e, item.id)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="forQualification">Qualification</Label>
                    <input
                      type="text"
                      placeholder="qualification"
                      value={item.qualification}
                      onChange={(e) => handleChangeQualification(e, item.id)}
                    />
                  </FormGroup>

                  <button className={styleHome.main_Button} type="submit" onClick={(e) => handleSubmit(e, item)}>
                    Change
                  </button>
                </Form>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};
export default Home;
