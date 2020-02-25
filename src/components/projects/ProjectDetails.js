import React from 'react'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'

const ProjectDetails = (props) => {
  const { project } = props;
  if (project) {

    return (
      <div className = "container section project-details">
        <div className = "card z-depth-0">
          <div className = "card-content">
            <span className = "card-title"> 
              <h1>
                <b> { project.title } </b>
              </h1>
            </span>
            <hr/>
            <p> <b> { project.content } </b> </p>
            <p> 
              Posted by: <b> 
                            { project.authorFirstName } { project.authorLastName } 
                          </b> 
            </p>
            <p>
              <b> 
                { project.authorId } 
              </b> 
            </p>
            <p> 
              Created at: <b> 
                            { moment( project.createdAt.toDate().toString()).calendar() } 
                          </b> 
            </p>

          </div>
          <button>
            <Link 
          to = '/' 
          className = "btn lighten-1"
        >
          Retour
        </Link>
            </button>

        </div>

      </div>
    )
  } else {
    return (
      <div className = "container center">
        <p> Loading project... </p>
      </div>
    )
  }
}

const mapStateToProps = ( state, ownProps ) => {
  // console.log(state);
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null
  return {
    project: project
  }
}

export default compose (
  connect ( mapStateToProps ),
  firestoreConnect([{
    collection: 'projects'
  }])
) ( ProjectDetails )