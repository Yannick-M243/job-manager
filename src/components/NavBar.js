import React from 'react'

function NavBar(props) {
    const switchSelectMode = props.switchSelectMode;
    const handleFilterChange = props.handleFilterChange;
    const selectMode = props.selectMode;
    
  return (
      <div className='navbar'>
          <div className='btn-container left'>
              {!selectMode ? <button typeof="button" className="btn btn-outline-primary" onClick={switchSelectMode}>Activate select Mode</button> : <button typeof="button" className="btn btn-outline-primary" onClick={switchSelectMode} >Deactivate Select mode</button>}
          </div>
          <div className='right'>
              <span>Job filter:</span>
              <select aria-label="Status" onChange={handleFilterChange}>
                  <option>Select a status</option>
                  <option value="all">All</option>
                  <option value="submitted">submitted</option>
                  <option value="in progress">in progress</option>
                  <option value="completed">completed</option>
              </select>
          </div>
    </div>
  )
}

export default NavBar