import React, { Component } from 'react'

//components
import ProjectList from '../projects/ProjectList'

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      name: '',
      email: '',
      phone: '',
      cash: '',
      finished: ''
    };
 }

  render() { 
    return(
      <div className = "dashboard container">
        <div >
          <div>
            <ProjectList/>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
