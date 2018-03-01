import React from 'react';
import axios from 'axios';

function HOC(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        query: null
      }

      this.instantSearch = this.instantSearch.bind(this);
    }

    instantSearch(e) {
      let data = this.props.data;
      let filteredItems;

      this.setState({ query: e.target.value }, () => {
        if (this.state.query) {
          let query = (this.state.query).toLowerCase();
          filteredItems = data.filter(item => {
            return item.full_name.toLowerCase().search(query) !== -1;
          });
        }
        this.props.livesearch(filteredItems);
      });

    }

    render() {
      return (
        <WrappedComponent
          InstantSearch={this.instantSearch}

          {...this.state} {...this.props}
        />
      );
    }
  };
}

const InstantSearch = (props) => {
  return (
    <input type="text" onChange={props.InstantSearch} />
  );
}


const LiveSearchInput = HOC(InstantSearch);

class InstantSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      filtered: null
    }
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const SEARCH_ENDPOINT = "https://api.github.com/search/repositories?q=react";
    const items = await axios.get(SEARCH_ENDPOINT);
    const repos = items.data.items;
    this.setState({ data: repos, loading: false });

  }

  livesearch(items) {
    this.setState({ filtered: items })
  }

  render() {
    let items;
    if (this.state.data != null) {
      let data = this.state.filtered ? this.state.filtered : this.state.data;
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
    }

    return (

      <div>
        {this.state.loading ? <div className="wait">Wait a Second...</div> :
          <div>
            <LiveSearchInput livesearch={this.livesearch.bind(this)} data={this.state.data} />
          </div>
        }
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Language</th>
          </tr>
          <tbody>
            {items}
          </tbody>
        </table>
        <br />

      </div>
    )
  }
}


export default InstantSearch;
