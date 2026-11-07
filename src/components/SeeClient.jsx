import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from "react-router"; 

const SeeClient = () => {
  const navigate = useNavigate();
  const params = useParams();
  const client_id = params.id.toString();
  const [client, setClient] = React.useState(null);

  const fetchClient = async () => {
    try {
        const response = await axios.get(`https://domtax-server-d7d364950a8d.herokuapp.com/client_by_id/${client_id}`);
        setClient(response.data);
    } catch(err) {
        console.log(err);
    }
  }

  React.useEffect(() => {
    fetchClient();
  }, [client_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const randomNumber = Math.random().toString(36) + Math.random().toString(36);
    const file_id = data.file_name + randomNumber;
    const fileName = data.file_name;
    const balance = (parseFloat(data.total_due) || 0) - (parseFloat(data.total_paid) || 0);
    if (balance < 0) {
        alert("Total Paid cannot be greater than Total Due.");
        return;
    }
    const fileData = {...data, file_id: file_id, balance: balance, client_id: client_id};

    try {
        const response = await axios.post("https://domtax-server-d7d364950a8d.herokuapp.com/new-file", fileData);
    } catch(err) {
        console.log(err)
    }

    if(fileName) {
        const updatedFiles = [...client.files, {fileName, file_id}];
        axios.put(`https://domtax-server-d7d364950a8d.herokuapp.com/clients/${client_id}`, { ...client, files: updatedFiles })
        .then(() => {
            setClient({ ...client, files: updatedFiles });
            e.target.reset();
        })
        .catch(err => console.log(err));
    }
}

  return client ? (
    <div id="see-client">
      <h1>{client.first_name} {client.last_name}</h1>
      <p>Email: {client.email}</p>
      <p>Phone: {client.phone}</p>
      <p>Address: {client.address}</p>
      <p>Client Since: {new Date(client.client_since).toLocaleDateString()}</p>
      <form id="add-file-form" onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" name="file_name" />
        </label>
        <label>
          <textarea placeholder="Enter info here..." type="text" name="body" />
        </label>
        <label>
          $<input placeholder="Total Due" type="number" name="total_due" />
        </label>
        <label>
          $<input placeholder="Downpayment" type="number" name="total_paid" />
        </label>
        <button type="submit">Add File</button>
      </form>
      <div>
        <h3>History</h3>
        <ul id="file-list">
          {client.files.map((file, index) => (
            <li key={index} onClick={() => {
                navigate(`/file/${file.file_id}`);
            }}>
              {file.fileName}
            </li>
          ))}
        </ul>
      </div>
      <button id="delete-client-button" onClick={async () => {
        try {
            await axios.delete(`https://domtax-server-d7d364950a8d.herokuapp.com/delete-client/${client_id}`);
            navigate("/");
        } catch(err) {
            console.log(err);
        }
      }}>Delete Client</button>
    </div>
  ) : (
    <div>
      <h1>Client not found</h1>
    </div>
  )
}

export default SeeClient;