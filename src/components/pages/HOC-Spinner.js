import React from 'react';
import axios from 'axios';

function HOC(WrappedComponent) {
  return class extends React.Component {

    render() {
      if (!this.props.loading) {
        return <WrappedComponent {...this.props} />;
      } return <div className="wait">Please wait...</div>

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

const ExtendedSpinner = HOC(Presentation);

class Spinner extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
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
        <ExtendedSpinner data={items} loading={this.state.loading} />
      </div>

    )
  }
}

export default Spinner;
