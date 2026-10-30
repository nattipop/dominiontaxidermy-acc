const AddClient = () => {
  return (
    <div id="add-client">
      <h1>New Client</h1>
      <form id="add-client-form">
        <label>
          First Name:
          <input type="text" name="first_name" />
        </label>
        <label>
          Last Name:
          <input type="text" name="last_name" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Phone:
          <input type="tel" name="phone" />
        </label>
        <button type="submit">Add Client</button>
      </form>
    </div>
  )
}

export default AddClient