import React from 'react';
import axios from 'axios';

function HOC(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
   
      this.handleShowMore = this.handleShowMore.bind(this);
      this.handleShowLess = this.handleShowLess.bind(this);
    }

    handleShowMore() {

      this.props.search(this.props.currentCount + 1);
    }

    handleShowLess() {

      this.props.search(this.props.currentCount - 1);
    }


    render() {
      return (
        <WrappedComponent
          more={this.handleShowMore}
          less={this.handleShowLess}
          InstantSearch={this.instantSearch}

          {...this.state} {...this.props}
        />
      );
    }
  };
}

const MoreButton = (props) => {
  return (
    <button onClick={props.more}>
      See More
    </button>
  )
}

const LessButton = (props) => {
  return (
    <button onClick={props.less} >
      See Less
    </button>
  )
}

const MoreBTN = HOC(MoreButton);
const LessBTN = HOC(LessButton);

class LoadMore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      items: 1,
      loading: false,
    }
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const SEARCH_ENDPOINT = "https://api.github.com/search/repositories?q=react";
    const items = await axios.get(SEARCH_ENDPOINT);
    const repos = items.data.items;
    this.setState({ data: repos, loading: false });

  }

  search(showItems) {
    this.setState({ items: showItems > -1 ? showItems : 0 })
  }

   deleteRow(index){
     let data = this.state.data;
    if (index > -1) {
      data.splice(index, 1);
      this.setState({data})
  }
      }

  render() {

    let items ;
    if (this.state.data != null) {
      let data = this.state.data;
      items = data.slice(0, this.state.items).map(({ id, full_name, language }, index) => {
        return (

          <tr key={index} onClick={()=>this.deleteRow(index,data)}>
            <td>
              {id}
            </td>
            <td>
              {full_name}
            </td>
            <td>
              {language}
            </td>
          </tr>
        )
      });
    }


    return (

      <div>
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Language</th>
          </tr>
          <tbody>
            { items }
          </tbody>
        </table>
        <br />
        {this.state.loading ? <div className="wait">Wait a Second...</div> :
          <div>
            <MoreBTN search={this.search.bind(this)} data={this.state.data} currentCount={this.state.items} />
            <LessBTN search={this.search.bind(this)} currentCount={this.state.items} />
          </div>
        }
      </div>
    )
  }
}


export default LoadMore;
