// Import necessary libraries and functions from the React and react-router-dom packages
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Define a React component named AddContact
export const AddContact = () => {
  // useParams is a hook from react-router-dom that allows you to access parameters from the URL
  const params = useParams();

  // useEffect is a hook that allows you to perform side effects in your function components
  useEffect(() => {
    // This effect runs when the component mounts
    if ("contactId" in params) {
      // If a 'contactId' parameter is present in the URL, fetch the contact data from an API
      fetch(` https://playground.4geeks.com/apis/fake/contact/${params.contactId}`)
        .then((response) => response.json())
        .then((body) => setNewContact(body[0]));  // Set the fetched contact data to the state
    }
  }, []);  // The empty dependency array means this effect runs only once, similar to componentDidMount in class components

  // useNavigate is another hook from react-router-dom that provides navigation functionality
  const navigate = useNavigate();

  // useState is a hook that allows you to add state to your functional components
  // Here, it's used to create a piece of state named newContact and a function to update it (setNewContact)
  const [newContact, setNewContact] = useState({});

  // updateContact is a function that sends a PUT request to update an existing contact
  const updateContact = async () => {
    const response = await fetch(
      ` https://playground.4geeks.com/apis/fake/contact/${params.contactId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newContact,
          agenda_slug: "my_super_agenda",
        }),
      }
    );
    if (response.ok) {
      navigate("/contacts/");  // If the update is successful, navigate to the contacts page
    }
  };

  // createContact is a function that sends a POST request to create a new contact
  const createContact = async () => {
    const response = await fetch(
      " https://playground.4geeks.com/apis/fake/contact/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newContact,
          agenda_slug: "my_super_agenda",
        }),
      }
    );
    if (response.ok) {
      navigate("/contacts/");  // If the creation is successful, navigate to the contacts page
    }
  };

  // The component renders a form for adding or updating contacts
  return (
    <div className="container">
      <div>
        <h1 className="text-center mt-5">Add a new contact</h1>
        <form>
          {/* Input fields for full name, email, phone, and address */}
          {/* The value of each input is set to the corresponding property in newContact state */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={newContact?.full_name || ""}
              onChange={(e) =>
                setNewContact((previousNewContact) => {
                  return {
                    ...previousNewContact,
                    full_name: e.target.value,
                  };
                })
              }
            />
          </div>
          {/* Similar input fields for email, phone, and address */}
          {/* ... (code omitted for brevity) ... */}

          {/* Button to save the contact */}
          <button
            onClick={() => {
              // Depending on whether 'contactId' is present in the URL, call updateContact or createContact
              if ("contactId" in params) {
                updateContact();
              } else {
                createContact();
              }
            }}
            type="button"
            className="btn btn-primary form-control"
          >
            save
          </button>
          {/* Link to navigate back to the main contacts page */}
          <Link className="mt-3 w-100 text-center" to="/">
            or get back to contacts
          </Link>
        </form>
      </div>
    </div>
  );
};