import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';

//This component display the form used to edit a selected Job
function JobEditForm(props) {
  const getJobs = props.getJobs;
  const selectedJob = props.selectedJob;
  const switchEditJob = props.switchEditJob;

  //initialising states with the selected job properties
  let [name, setName] = useState(selectedJob.name);
  let [description, setDescription] = useState(selectedJob.description);
  let [location, setLocation] = useState(selectedJob.location);
  let [priority, setPriority] = useState(selectedJob.priority);
  let [status, setStatus] = useState(selectedJob.status);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData();
  }

  //function that update a selected job
  const updateData = () => {

    //storing state values to update into an object
    let jobData = { name: name, description: description, location: location, priority: priority, status: status };

    fetch('/api/update/job/'+selectedJob._id, {
      method: "put", headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    })
      .then(res => res.text())// parses response to text
      .then(result => {
        alert(result);//displaying an alert with the response
        switchEditJob();//deactivate the edit mode
        getJobs();//reloading list after update
      })
      .catch(error => console.error(error));
  }

  return (
    <div>
      <h4>Edit Job:</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" defaultValue={selectedJob.name} onChange={handleNameChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description:</Form.Label>
          <Form.Control type="text" defaultValue={selectedJob.description} onChange={handleDescriptionChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location:</Form.Label>
          <Form.Control type="text" defaultValue={selectedJob.location} onChange={handleLocationChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Priority:</Form.Label>
          <Form.Select aria-label="Priority" onChange={handlePriorityChange} defaultValue={selectedJob.priority}>
            <option>Select a Priority</option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Status:</Form.Label>
          <Form.Select aria-label="Priority" onChange={handleStatusChange} defaultValue={selectedJob.status}>
            <option>Select a Status</option>
            <option value="submitted">submitted</option>
            <option value="in progress">in progress</option>
            <option value="completed">completed</option>
          </Form.Select>
        </Form.Group>
        <div className='btn-container'>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
          Update Job
        </Button>
        </div>
      </Form>
    </div>
  );
}

export default JobEditForm;