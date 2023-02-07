import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [[{ script: 'sub' }]],
};

export default class ChemicalFormulaEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value || '',
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value && props.value !== state.value) {
      return {
        value: props.value || '',
      };
    }
    return {};
  }


  onChange = (value) => {
    const { onChange } = this.props;
    // this.setState({ value });
    onChange?.(value);
  };

  render() {
    const { value } = this.state;
    return <ReactQuill modules={modules} theme="snow" onChange={this.onChange} value={value} />;
  }
}
