import axios from 'axios';
import React from 'react';
import { useNavigate } from "react-router";

const Clients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = React.useState([]);
  const [filteredClients, setFilteredClients] = React.useState([]);
  const [currentList, setCurrentList] = React.useState([]);

  React.useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("https://domtax-server-d7d364950a8d.herokuapp.com/all-clients");
        setClients(response.data);
        setCurrentList(clients)
      } catch(err) {
        console.log(err);
      }
    }
    fetchClients();
    console.log(currentList)
  }, []);
  
  React.useEffect(() => {
    if(filteredClients.length > 0) {
      setCurrentList(filteredClients)
    } else {
      setCurrentList(clients)
    }
  }, [filteredClients])


  return currentList.length > 0 ? (
    <div id="clients">
      <input id="search-bar" type="text" placeholder="Search clients..." onInput={(e) => {
        const searchTerm = e.target.value.toLowerCase();
        console.log(searchTerm)

        if (searchTerm === "") {
          setCurrentList(clients)
        };

        const newClients = clients.filter(client => {
          const name = client.first_name.toLowerCase() + client.last_name.toLowerCase();

          return name.includes(searchTerm);
        });

        setFilteredClients(newClients);
        setCurrentList(filteredClients)
      }} />
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
  ) : (
    <div id="clients">
      <input id="search-bar" type="text" placeholder="Search clients..." onChange={(e) => {
        const searchTerm = e.target.value.toLowerCase();

        if (searchTerm === "" || " ") {
            return;
        };

        console.log(search)
        const filteredClients = clients.filter(client => {
          client.first_name + client.last_name.toLowerCase().includes(searchTerm)
        });

        setClients(filteredClients);
        }} />
      <button id="add-client-button" onClick={() => navigate("/add-client")}>Add Client</button>
      <h1>No clients found.</h1>
    </div>
  )
}

export default Clients