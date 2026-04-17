import React from "react";

function CreateTicket() {
  return (
    <div className="container p-5">
      <h2>Create a Ticket</h2>

      <form className="mt-4">
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" />
        </div>

        <div className="mb-3">
          <label>Issue</label>
          <textarea className="form-control" rows="4"></textarea>
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CreateTicket;