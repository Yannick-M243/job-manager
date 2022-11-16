import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react'

//This component display the form used to create new jobs
function JobForm(props) {
    const getJobs = props.getJobs;

    //initialising states
    let [name, setName] = useState(null);
    let [description, setDescription] = useState(null);
    let [location, setLocation] = useState(null);
    let [priority, setPriority] = useState(null);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        saveData();
    }

    //this function stores new job into the database
    const saveData = () => {
        //preventing empty fields
        if (name !== null && description !== null && location !== null && priority !== null) {
        let jobData = { name: name, description: description, location: location, priority: priority }

        fetch('/api/create/job', {
            method: "POST", headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jobData),
        })
            .then(res => res.text())// parses response to text
            .then(result => {
                alert(result);
                getJobs();//reloading list after deletion
            })
            .catch(error => console.error(error));
        } else {
            alert("You must complete all fields to create a new Job");
        }
    }

    return (
        <div className='d-flex flex-column align-items-center'>
            <h4>Create a new Job:</h4>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter job's name" onChange={handleNameChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Description" onChange={handleDescriptionChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Location:</Form.Label>
                    <Form.Control type="text" placeholder="Enter location" onChange={handleLocationChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Priority:</Form.Label>
                    <Form.Select aria-label="Priority" onChange={handlePriorityChange}>
                        <option>Select a Priority</option>
                        <option value="high">High</option>
                        <option value="normal">Normal</option>
                        <option value="low">Low</option>
                    </Form.Select>
                </Form.Group>
                <div className='btn-container'>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Add a new Job
                    </Button>
                </div>

            </Form>
        </div>
    );
}

export default JobForm;