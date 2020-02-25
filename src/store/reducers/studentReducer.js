const initState = {
  allStudents: [],
  studentItem: {}
}

const studentReducer = (state = initState, action) => {
  // if (action.type === "add_student") {
  //   return {
  //     allStudents : [...state.allStudents, action.payload.student]
  //   }
  // }
  if (action.type === "GET_ALL_STUDENTS_SUCCESS"){
    return {
      ...state,
      allStudents: action.payload
    }
  }
  // if (action.type === "UPDATE_STUDENT") {
  //   const studentItem = {...action.payload.student}
  //   return {
  //     allStudents : [...state.allStudents].map((item) => {
  //       if (item._id === studentItem._id) {
  //         return studentItem
  //       } 
  //       else 
  //         return item
  //     })
  //   }
  // }
  if (action.type === "EDIT_STUDENT_ITEM") {
    return {
      ...state,
      studentItem: action.student
    }
  }
  if (action.type === "REMOVE_STUDENT") {
    const {_id} = action.payload
    return {
      allStudents : [...state.allStudents].filter((item) => item._id !== _id)
    }
  }
  return state
}

export default studentReducer;