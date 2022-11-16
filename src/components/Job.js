import React, { Component } from 'react';
import JobForm from './JobForm';
import JobList from './JobList';
import JobEditForm from './JobEditForm';
import FadeLoader from "react-spinners/FadeLoader";
import NavBar from './NavBar';
import SelectStatusForm from './SelectStatusForm';

//This is the main component
export class Job extends Component {
  constructor(props) {
    super(props)
    this.startLoading = this.startLoading.bind(this);
    this.state = {
      jobs: [],
      isLoaded: "loading",
      error: null,
      selectedJob: {},
      filter: "all",
      editMode: false,
      selectMode: false,
      selection:[]
    }
  }

  //getting the list of jobs on page load
  componentDidMount() {
    this.getJobs();
  }

  //this function gets the list of jobs from the database and stores it into a state
  getJobs = () => {
    this.startLoading();//starting the loading state
    fetch(`/api/jobs`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            jobs: result,
            isLoaded: "loaded"
          });
        },
        (error) => {
          this.setState({
            isLoaded: "loaded",
            error
          });
        })
  }

  //This function find and stores a job into selectedJob using its id
  getSelectedJob = (jobId) => {
    const jobs = this.state.jobs;
    const i = jobs.findIndex(({ _id }) => _id === jobId);
    const selectedJob = jobs[i];
    this.setState({ selectedJob: selectedJob });
  }

  //function used to start the loading state
  startLoading = () => {
    this.setState({ isLoaded: "loading" });
  }

  //function used to activate or deactivate the edit mode
  switchEditJob = (e) => {
    const editMode = this.state.editMode;
    if (editMode) {
      this.setState({ editMode: false });
    } else {
      e.preventDefault();
      const jobId = e.target.value;
      this.getSelectedJob(jobId);
      this.setState({ editMode: true })
    }
  }

  //function used to activate or deactivate the select mode
  switchSelectMode = (e) => {
    const selectMode = this.state.selectMode;
    if (selectMode) {
      this.setState({ selection: [] });
      this.setState({ selectMode: false});
    } else {
      this.setState({ selectMode: true})
    }
  }

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value })
  }

  //this function is used in select mode to retrieve selected jobs
  handleSelection = (e) => {
    let IdSelection = this.state.selection
    if (e.target.checked) {
        IdSelection.push(e.target.value)
    } else {
      const index = IdSelection.indexOf(e.target.value);
      if (index > -1) {
        IdSelection.splice(index, 1);
      }
    }
    this.setState({ selection: IdSelection });
  }

  render() {
    const { selection,selectMode,filter,selectedJob, editMode, isLoaded, jobs, error } = this.state;
    return (
      <div>
        <NavBar handleFilterChange={this.handleFilterChange} switchSelectMode={this.switchSelectMode} selectMode={selectMode}/>
        <div className='section1'>
          <h1>Job Management System</h1>
          {error ? <div className='error'><p>Error: {error.message}</p></div> : ''}
          <div className='d-flex flex-row container'>
            <div className='w-50'>
              {/*Display the loading animation while data is loading*/}
              {isLoaded === "loading" ? <FadeLoader color="black" /> : <JobList getJobs={this.getJobs} switchEditJob={this.switchEditJob} jobs={jobs} isLoaded={isLoaded} filter={filter} selectMode={selectMode} handleSelection={this.handleSelection } />}
            </div>
            <div className='w-50'>
              {/*Display the edit form or selectStatus form when the corresponding mode is active or the create job form when no modes are active*/}
              {editMode ? <JobEditForm selectedJob={selectedJob} isLoaded={isLoaded} getJobs={this.getJobs} switchEditJob={this.switchEditJob} /> : ''}
              {selectMode ? <SelectStatusForm selection={selection} getJobs={this.getJobs} switchSelectMode={this.switchSelectMode} /> : ''}
              {!editMode && !selectMode ? <JobForm isLoaded={isLoaded} getJobs={this.getJobs} />:''}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Job