import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import { bindActionCreators } from 'redux';
import { getAllNote } from '../../actions/note';


class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }


  componentWillMount() {
      this.props.getAllNote();
  }


  handleChange(e) {
   /**
    * Can be used when we want to have live data 
    * if(e.target.value){
    *  this.props.getAllNote(e.target.value);
    } 
    */
   
  }

  render() {
    let { allNotes } = this.props;
    let sortedResult = [];

    if (allNotes) {

      if (this.state.searchTerm) {
        let searchTerm = this.state.searchTerm;
        allNotes = allNotes.filter((item) => {
          return item.title.toLowerCase().search(searchTerm) !== -1;
        });
      }

      sortedResult = allNotes.sort((a, b) => {
        return new Date(b.note_date).getTime() - new Date(a.note_date).getTime()
      });

    }

    const allNotesItems = sortedResult.map((noteItem, index) => {
      return <option value={noteItem.title} />
    });

    return (
      <div className="center" >
        <br /><br />
        <h3>Choose a city from this list</h3>
        <input list="browsers" name="myBrowser" onChange={this.handleChange}/>
        <datalist id="browsers">
          {allNotesItems}
        </datalist>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    allNotes: state.allNotes.allNotes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllNote
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
