import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';

//This is a component that display the form to select the status to change on selected job
//On select mode 
function SelectStatusForm(props) {
    const selection = props.selection;
    const getJobs = props.getJobs;
    const switchSelectMode = props.switchSelectMode;

    const [statusToUpdate, setStatusToUpdate] = useState(null)
    
    //updating the status of all selected job
    const handleSubmit = (e) => {
        e.preventDefault();
        //prevent empty field
        if (statusToUpdate !== null) {
            selection.forEach(function (id) {
                updateStatus(id);
            });
            switchSelectMode();
        } else {
            alert("You must first select a status")
        }
 
    }

    const handleStatusToUpdate = (e) => {
        setStatusToUpdate(e.target.value);
    }

    //this is a function that deletes a given job
    const updateStatus = (id) => {
        fetch(`/api/status/${id}/${statusToUpdate}`, {
            method: "PUT"
        })
            .then(res => res.text())
            .then(result => {
                console.log(result);
                getJobs();//reloading list after deletion
            })
            .catch(error => console.error(error));
    }

  return (
      <div className='d-flex flex-column align-items-center' >
          <h4>Select the status to change for the jobs selected:</h4>
          <Form>
              <Form.Group className="mb-3">
              <Form.Label>Status:</Form.Label>
              <Form.Select aria-label="Priority" onChange={handleStatusToUpdate}>
                  <option>Select a status:</option>
                  <option value="submitted">submitted</option>
                  <option value="in progress">in progress</option>
                  <option value="completed">completed</option>
                  </Form.Select>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Update selected jobs status
              </Button>
              
          </Form>
    </div>
  )
}

export default SelectStatusForm