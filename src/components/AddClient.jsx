import axios from 'axios';
import { useNavigate } from "react-router";

const AddClient = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const newFirstName = data.first_name + " ";
    const updatedData = { ...data, first_name: newFirstName };
    
    try {
      const response = await axios.post("https://domtax-server-d7d364950a8d.herokuapp.com/new-client", updatedData);
    
      navigate("/")
    } catch(err) {
      console.log(err)
    }
  }
  
  return (
    <div id="add-client">
      <h1>New Client</h1>
      <form id="add-client-form" onSubmit={handleSubmit}>
        <label>
          <input placeholder="First Name" type="text" name="first_name" required />
        </label>
        <label>
          <input placeholder="Last Name" type="text" name="last_name" required />
        </label>
        <label>
          <input placeholder="Email" type="email" name="email" />
        </label>
        <label>
          <input placeholder="Phone" type="tel" name="phone" required />
        </label>
        <label>
          <textarea placeholder="Address" name="address"></textarea>
        </label>
        <button type="submit">Add Client</button>
      </form>
    </div>
  )
}

export default AddClient