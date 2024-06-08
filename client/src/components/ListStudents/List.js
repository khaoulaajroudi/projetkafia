import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "./List.css";
import { useDispatch, useSelector } from "react-redux";
import { updatecontact } from "../../JS/contactSlice";

const List = () => {
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    // Rechargez la page lorsqu'un bouton est cliqué
    window.location.reload();
  };

const currentuser=useSelector((store)=>store.user?.user)
  const users = useSelector((store) => store.contact?.contact);
  const [test, settest] = useState([]);
  const [percentage, setPercentage] = useState(0);
  console.log("percentage", percentage);
  const [filteredUsers, setFilteredUsers] = useState([]);
  console.log("filteredUsers", filteredUsers);

  // Fonction pour filtrer les utilisateurs en fonction d'un critère et calculer le pourcentage
  const filterAndCalculate = (criterion) => {
    // Filtrer les utilisateurs en fonction du critère spécifié
    const filtered = users?.filter((user) =>
      user?.criter.some((crit) => crit.c1 === criterion)
    );
    // Calculer le pourcentage
    const totalCriterion = filtered.reduce((acc, user) => {
      return acc + user.criter.filter((crit) => crit.c1 === criterion).length;
    }, 0);
    const percent = (totalCriterion / users.length) * 100;
    // Mettre à jour l'état avec les résultats filtrés et le pourcentage
    setFilteredUsers(filtered);
    setPercentage(percent.toFixed(2));
  };
  const [listofcirtiter, setlistofcirtiter] = useState(false);
 
  const [show, setShow] = useState(false);
  const closeModal = () => {
    setShow(false);
  };
const [search, setsearch] = useState("")
const [visited, setvisited] = useState('')
const filterCalculate = (criterionKey, criterionValue) => {
  // Filtrer les utilisateurs en fonction du critère spécifié
  const filtered = users?.filter((user) =>
    user?.criter.some((crit) => crit[criterionKey] === criterionValue)
  );

  // Calculer le pourcentage
  const totalCriterion = filtered.reduce((acc, user) => {
    return acc + user.criter.filter((crit) => crit[criterionKey] === criterionValue).length;
  }, 0);
  const percent = (totalCriterion / users.length) * 100;

  // Mettre à jour l'état avec les résultats filtrés et le pourcentage
  setFilteredUsers(filtered);
  setPercentage(percent.toFixed(2));
};






  return (
    <div>
      <div class="box-navbar">
        <img
          src="./logo.jpg"
          alt="logo"
        />
        <ul>
          <li className="fullname">
          {currentuser?.lastname} {currentuser?.name} 
          </li>
          <li className="boxavatar">
            <img src={currentuser?.avatar}/>
          </li>
        </ul>
      </div>
      <hr class="box-ligne" />
      <div class="box-filter">
        <input type="search" placeholder="filtrer par nom" class="box-input" onChange={(e)=>setsearch(e.target.value)} />
      </div>
      <div class="container">
        <h2>User Table</h2>
        <div class="box-button">
          <div>
            <button class="btn-22" onClick={() =>( setShow(true),setvisited('c1'))}>
              critere 1
            </button>
            <button class="btn-secondary"  onClick={() =>( setShow(true),setvisited('c2'))}>critere 2</button>
            <button class="btn-submit" onClick={() =>( setShow(true),setvisited('c3'))}>critere 3</button>
            <button class="btn-cancel" onClick={() =>( setShow(true),setvisited('c4'))}>critere 4</button>
            <button class="btn-22 boxlefting" onClick={() =>( setShow(true),setvisited('c5'))}>critere 5 </button>
            <button class="btn-secondary boxlefting" onClick={() =>( setShow(true),setvisited('c6'))}>critere 6</button>
          </div>
                      {show ? (
              <>
                <div className="box-modal">
                  <div className="boxmodal-content">
                    <span className="close" onClick={closeModal}>
                      &times;
                    </span>
                    <h2>Résultats des critères</h2>
                    <div className="nav">
                      {["+++", "++-", "+--", "---"].map((criterion, index) => (
                        // <button
                        //   key={index}
                        //   className="btn-22"
                        //   onClick={() => (
                        //     filterAndCalculate(criterion),
                        //     setlistofcirtiter(true)
                        //   )}
                        // >
                        //   {criterion}
                        // </button>

                        <ul>
                          <li
                            onClick={() => (
                              filterCalculate(`${visited}`,criterion),
                              setlistofcirtiter(true)
                            )}
                          >
                            {criterion}
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                          </li>
                        </ul>
                      ))}
                    </div>
                    {listofcirtiter
                      ? filteredUsers?.map((el) => (
                          <div className="box-details">
                            <div className="box-info">
                              <img src={el.avatar} />
                              <h3>{el.fullname}</h3>
                            </div>
                          </div>
                        ))
                      : null}
                    <h3 className="percentage">Percentage: {percentage} %</h3>
                  </div>
                </div>
              </>
            ) : null}
        </div>
        <table class="box-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>c1</th>
              <th>c2</th>
              <th>c3</th>
              <th>c4</th>
              <th>c5</th>
              <th>c6</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.filter((user)=>user?.fullname.includes(search)).map((el) => (
              <>
                <tr>
                  <td>
                    <div class="box-id">
                      <img src={el?.avatar} />
                      <span>{el?.fullname}</span>
                    </div>
                  </td>
                  <td>
                  {el &&
                      el.criter &&
                      el.criter.some((obj) => obj.hasOwnProperty("c1"))
                        ? el.criter.map((ex) => <h1>{ex.c1}</h1>):(
                    <div class="select-box">
                         <select
                        onChange={(e) =>
                          settest([...test, { c1: e.target.value }])
                        }
                      >
                        <option>choisir </option>
                        <option value="+++">+++</option>
                        <option value="++-">++-</option>
                        <option value="+--">+--</option>
                        <option value="---">---</option>
                      </select>
                      <div class="arrow"></div>
                    </div> 
                  )}
                  </td>
                  <td>
                    {" "}
                    {el &&
                      el.criter &&
                      el.criter.some((obj) => obj.hasOwnProperty("c2"))
                        ? el.criter.map((ex) => <h1>{ex.c2}</h1>):(
                    <div class="select-box">
                      <select
                        onChange={(e) =>
                          settest([...test, { c2: e.target.value }])
                        }
                      >
                        <option>choisir </option>
                        <option value="+++">+++</option>
                        <option value="++-">++-</option>
                        <option value="+--">+--</option>
                        <option value="---">---</option>
                      </select>
                      <div class="arrow"></div>
                    </div>
)}
                  </td>
                  <td>
                    {" "}
                    {el &&
                      el.criter &&
                      el.criter.some((obj) => obj.hasOwnProperty("c3"))
                        ? el.criter.map((ex) => <h1>{ex.c3}</h1>):(
                    <div class="select-box">
                      <select
                        onChange={(e) =>
                          settest([...test, { c3: e.target.value }])
                        }
                      >
                        <option>choisir </option>
                        <option value="+++">+++</option>
                        <option value="++-">++-</option>
                        <option value="+--">+--</option>
                        <option value="---">---</option>
                      </select>
                      <div class="arrow"></div>
                    </div>
                        )}
                  </td>
                  <td>
                    {" "}
                    {el &&
                      el.criter &&
                      el.criter.some((obj) => obj.hasOwnProperty("c4"))
                        ? el.criter.map((ex) => <h1>{ex.c4}</h1>):(
                    <div class="select-box">
                      <select
                        onChange={(e) =>
                          settest([...test, { c4: e.target.value }])
                        }
                      >
                        <option>choisir </option>
                        <option value="+++">+++</option>
                        <option value="++-">++-</option>
                        <option value="+--">+--</option>
                        <option value="---">---</option>
                      </select>
                      <div class="arrow"></div>
                    </div>
                        )}
                  </td>
                  <td>
                    {" "}
                    {el &&
                      el.criter &&
                      el.criter.some((obj) => obj.hasOwnProperty("c5"))
                        ? el.criter.map((ex) => <h1>{ex.c5}</h1>):(
                    <div class="select-box">
                      <select
                        onChange={(e) =>
                          settest([...test, { c5: e.target.value }])
                        }
                      >
                        <option>choisir </option>
                        <option value="+++">+++</option>
                        <option value="++-">++-</option>
                        <option value="+--">+--</option>
                        <option value="---">---</option>
                      </select>
                      <div class="arrow"></div>
                    </div>
)}
                  </td>
                  <td>
                    {" "}
                    {el &&
                      el.criter &&
                      el.criter.some((obj) => obj.hasOwnProperty("c6"))
                        ? el.criter.map((ex) => <h1>{ex.c6}</h1>):(
                    <div class="select-box">
                      <select
                        onChange={(e) =>
                          settest([...test, { c6: e.target.value }])
                        }
                      >
                        <option>choisir </option>
                        <option value="+++">+++</option>
                        <option value="++-">++-</option>
                        <option value="+--">+--</option>
                        <option value="---">---</option>
                      </select>
                      <div class="arrow"></div>
                    </div>
                        )}
                  </td>
                  <td>
                    <button
                      class="bouton-validation"
                      onClick={() => (
                        dispatch(
                          updatecontact({ id: el._id, upcontact: test })
                        ),
                        settest([]),handleButtonClick()
                      )}
                    >
                      Valider
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
