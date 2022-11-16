import React from 'react'

//This component diplays a list of all existing jobs
function JobList(props) {
  const jobs = props.jobs;
  const switchEditJob = props.switchEditJob;
  const isLoaded = props.isLoaded;
  const getJobs = props.getJobs;
  const filter = props.filter;
  const selectMode = props.selectMode;
  const handleSelection = props.handleSelection;

  //this is a function that deletes a given job
  const deleteJob = (e) => {
    fetch(`/api/delete/job/${e.target.value}`, {
      method: "DELETE"
    })
      .then(res => res.text())
      .then(result => {
        alert(result);//displaying an alert with the response
        getJobs();//reloading list after deletion
      })
      .catch(error => console.error(error));
  }

  //this is a function that deletes a given job
  const archiveJob = (e) => {
    fetch(`/api/archive/job/${e.target.value}`, {
      method: "PUT"
    })
      .then(res => res.text())
      .then(result => {
        alert(result);//displaying an alert with the response
        getJobs();//reloading list after deletion
      })
      .catch(error => console.error(error));
  }

  //getting only unarchived jobs
  let unarchivedJobs = [];
  jobs.forEach(function (job) {
    if (!job.archived) {
      unarchivedJobs.push(job);
    }
  });

  //filter jobs
  let filteredJobs = [];
  if (filter !== "all") {
    unarchivedJobs.forEach(function (job) {
      if (job.status === filter && job.status !== "all") {
        filteredJobs.push(job);//getting the commits from the events
      }
    });
  } else {
    filteredJobs = unarchivedJobs;//if the filter is set to all keep all jobs
  }

  //making sure the information have been retrieved before displaying them
  if (isLoaded === "loaded") {
    //Display a Not found error in case there is no job found
    if (filteredJobs.length === 0) {
      return (
        <div className='job-card'>
          <h4>Job list:</h4>
          <p>No job found</p>
        </div>
      )
    } else {
      return (
        <div>
          <h4>Job list:</h4>
          {filteredJobs.map(job => (
            <div className='job-card' key={job._id}>
              {selectMode ? <div><input type="checkbox" onChange={handleSelection} value={job._id} /></div> : ''}
              <div className='details-container'>
                <table>
                  <tbody>
                    <tr>
                      <td className='td-left'>Job name:</td>
                      <td className='td-right'>{job.name}</td>
                    </tr>
                    <tr>
                      <td className='td-left'>Job description:</td>
                      <td className='td-right'>{job.description}</td>
                    </tr>
                    <tr>
                      <td className='td-left'>Job location:</td>
                      <td className='td-right'>{job.location}</td>
                    </tr>
                    <tr>
                      <td className='td-left'>Job priority:</td>
                      <td className='td-right'>{job.priority}</td>
                    </tr>
                    <tr>
                      <td className='td-left'>Job status:</td>
                      <td className='td-right'>{job.status}</td>
                    </tr>
                    <tr>
                      <td className='td-left'>Job Submission date:</td>
                      <td className='td-right'>{job.submission_date}</td>
                    </tr>
                    {!selectMode ? <tr>
                      <td><div className='btn-container'><button typeof="button" className="btn btn-outline-primary" onClick={switchEditJob} value={job._id}>Edit</button></div></td>
                      <td><div className='btn-container'><button typeof="button" className="btn btn-outline-warning" onClick={archiveJob} value={job._id}>Archive</button>
                        <button typeof="button" className="btn btn-outline-danger" onClick={deleteJob} value={job._id}>Delete</button></div></td>
                    </tr> : ''}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      );
    }
  } else {
    return <></>;
  }

}

export default JobList