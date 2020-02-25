import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ReactLoading from 'react-loading';
import { getAllStudents, getAllStudentsSuccess } from '../../store/actions/studentActions'
import {connect} from 'react-redux'

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 15,
    },
}))(TableCell);
  
const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
}))(TableRow);

const styles = makeStyles({
    table: {
      minWidth: 1500,
    },
});

class ProjectList extends React.Component {

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
            allStudents: this.props.allStudents,
            loader: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.getAllStudents();
            this.setState({loader: false})
        }, 1000)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.allStudents !== prevProps.allStudents) {
            this.setState({
                allStudents: this.props.allStudents
            })
        }
    }

    toggle = () => {
        this.setState({
            visible: ! this.state.visible
        })
    }

    render () {
        const studentsFetched = this.props.allStudents
        console.log('from list/: ', studentsFetched)
        if (this.state.loader) {
            return (    
            <div style={{display: this.state.loadDisplay}}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                <ReactLoading  type={"balls"} color={'grey'} height={300} width={300} />
                </div>
            </div>
            )
        } else {
            return (
                <div className = "container">
                    <TableContainer component={Paper} className = {styles}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left"><b>Name</b></StyledTableCell>
                                    <StyledTableCell align="left"><b>Email</b></StyledTableCell>
                                    <StyledTableCell align="left"><b>Phone</b></StyledTableCell>
                                    <StyledTableCell align="left"><b>Cash</b></StyledTableCell>
                                    <StyledTableCell align="left"><b>Level</b></StyledTableCell>
                                    <StyledTableCell align="left"><b>Time</b></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.allStudents.map((student, index) => (
                                        <StyledTableRow key={index} hover>
                                            <StyledTableCell align="left">
                                                {student.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">{student.email}</StyledTableCell>
                                            <StyledTableCell align="left">{student.phone}</StyledTableCell>
                                            <StyledTableCell align="left">{student.cash}</StyledTableCell>
                                            <StyledTableCell align="left">{student.level}</StyledTableCell>
                                            <StyledTableCell align="left">{student.time}</StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {        
        allStudents: state.studentReducer.allStudents
    }
}
export default connect(mapStateToProps, { getAllStudents, getAllStudentsSuccess })(ProjectList);