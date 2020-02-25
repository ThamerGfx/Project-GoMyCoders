import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
//components
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import CreateProject from './components/projects/CreateProject'
import UpdateProject  from './components/projects/UpdateProject';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      _id: '',
      name: '',
      email: '',
      phone: '',
      cash: '',
      level: '',
      time: '',
      allStudents: []
    }
  }

  receiveStudent = (data) => {
    console.log('from receiveStudent', data)
    this.setState({
      _id: data._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      cash: data.cash,
      level: data.level,
      time: data.time,
      allStudents: data.allStudents
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path = '/' render = { () => <Dashboard/> } />
            <Route path = '/create' render = { () => <CreateProject history = { this.props.history }/>}/> } />
            <Route path = '/update' render = { () => <UpdateProject receive = { this.receiveStudent } updatedItem={this.state} history = { this.props.history }/> } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;