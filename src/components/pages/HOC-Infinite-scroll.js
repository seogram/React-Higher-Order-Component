import React from 'react';
import axios from 'axios';
import { compose } from 'recompose';

function HOC(WrappedComponent) {
  return class extends React.Component {

    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
      if (
        (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
        this.props.data.length
      ) {
        this.props.search(this.props.currentCount + 5);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

const Presentation = (props) => {
  return (
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Language</th>
      </tr>
      <tbody>
        {props.data}
      </tbody>
    </table>
  );
}

const LoadingInfinite = HOC(Presentation);

class InfiniteScroll extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      items: 15,
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

  render() {
    let items;
    if (this.state.data != null) {
      let data = this.state.data;
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
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Language</th>
          </tr>
          <tbody>
            <LoadingInfinite search={this.search.bind(this)} data={items}
              currentCount={this.state.items}
            />
          </tbody>
        </table>

        }
      </div>
    )
  }
}

export default InfiniteScroll;
