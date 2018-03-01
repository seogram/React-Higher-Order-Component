import React from 'react';
import axios from 'axios';

function HOC(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        sorted: null
      }
      this.doSort = this.doSort.bind(this);
    }

    doSort() {
      let data = this.props.data;
      let sortedItems;
      sortedItems = data.sort((a, b) => {
        return a.id - b.id
      });

      this.props.sort(sortedItems);
    }

    render() {
      return (
        <WrappedComponent
          doSort={this.doSort}

          {...this.state} {...this.props}
        />
      );
    }
  };
}

const SortBTN = (props) => {
  return (
    <button onClick={props.doSort} >Sort by Name </button>
  );
}


const ExtendedSortBTN = HOC(SortBTN);

class Sort extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      sorted: null
    }
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const SEARCH_ENDPOINT = "https://api.github.com/search/repositories?q=react";
    const items = await axios.get(SEARCH_ENDPOINT);
    const repos = items.data.items;
    this.setState({ data: repos, loading: false });

  }

  sort(items) {
    this.setState({ sorted: items })
  }

  createItems() {
    let items;
    if (this.state.data != null) {
      const data = this.state.filtered ? this.state.filtered : this.state.data;
      items = data.slice(0, this.state.items).map(({ id, full_name, language }, index) => {
        return (
          <tr key={index}>
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
      return items;
    }
  }


  render() {

    return (
      <div>
        {this.state.loading ? <div className="wait">Wait a Second...</div> :
          <div>
            <br />
            <ExtendedSortBTN sort={this.sort.bind(this)} data={this.state.data} />
            <br />
          </div>
        }
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Language</th>
          </tr>
          <tbody>
            {this.createItems()}
          </tbody>
        </table>
        <br />
      </div>
    )
  }
}


export default Sort;
