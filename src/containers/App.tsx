import * as React from 'react';
import { TreeView } from '../components/TreeView';
import { diagnose } from '../util/linting';

export class App extends React.Component<{}, { spec: any }> {
  constructor(props: {}) {
    super(props);
    this.state = { spec: require('../../spec/petstore.oas2.json') };
  }

  render() {
    return <TreeView spec={this.state.spec} diagnostics={diagnose(this.state.spec)} />;
  }
}
