import axios from 'axios';
import React from 'react';
import { useNavigate } from "react-router";

const Clients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = React.useState([]);
  const [currentList, setCurrentList] = React.useState([]);

  React.useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("https://domtax-server-d7d364950a8d.herokuapp.com/all-clients");
        setClients(response.data);
        setCurrentList(response.data)
      } catch(err) {
        console.log(err);
      }
    }
    fetchClients();
  }, []);

  const searchClients = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    if (searchTerm === "") {
      setCurrentList(clients);
    }

    let newList = clients.filter((client) => {
      const value = client.first_name + client.last_name;
      if (String(value).toLowerCase().includes(searchTerm)) {
        return value;
      }
    });

    if (newList.length === 0) {
      setCurrentList(newList)
    } else {
      setCurrentList(newList);
    }
  }

  return currentList.length === 0 ? (
    <div id="clients">
      <input id="search-bar" type="text" placeholder="Search clients..." onChange={searchClients} onKeyUp={searchClients} />
      <button id="add-client-button" onClick={() => navigate("/add-client")}>Add Client</button>
      <h1>No clients found.</h1>
    </div>
  ) : (
    <div id="clients">
      <input id="search-bar" type="text" placeholder="Search clients..." onChange={searchClients} onKeyUp={searchClients} />
      <button id="add-client-button" onClick={() => navigate("/add-client")}>Add Client</button>
      <ul className="client-list">
        {currentList.map(client => (
          <li className="client-item" key={client.client_id} onClick={() => navigate(`/client/${client.client_id}`)}>
            <img className="client-icon" src="https://png.pngtree.com/png-vector/20220411/ourmid/pngtree-person-icon-in-flat-style-man-symbol-worker-people-care-vector-png-image_45189836.jpg" alt="client icon" />
            <h2>{client.first_name} {client.last_name}</h2>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Clients