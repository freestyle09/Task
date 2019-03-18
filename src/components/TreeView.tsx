import * as React from 'react';
import { IRuleResult } from '@stoplight/spectral';

export interface TreeViewProps extends React.HTMLProps<HTMLUListElement> {
  spec: any;
  diagnostics: IRuleResult[];
}

export function TreeView({ spec, diagnostics, ...restProps }: TreeViewProps) {
  return (
    <ul {...restProps}>
      {Object.keys(spec).map((el, index) => {
        return (
          <React.Fragment key={index}>
            <li>
              {el}
              {(spec[el].constructor === Array || spec[el].constructor === Object) && (
                <FirstNestedList array={spec[el]} />
              )}
            </li>
          </React.Fragment>
        );
      })}
    </ul>
  );
}

interface FirstNestedList {
  array: any;
}

class FirstNestedList extends React.Component<any, FirstNestedList> {
  render() {
    return (
      <ul>
        {Object.keys(this.props.array).map((el: string, index: number) => {
          return (
            <li key={index}>
              {el}
              {this.props.array[el].constructor === Object && <SecondNestedList array={this.props.array[el]} />}
            </li>
          );
        })}
      </ul>
    );
  }
}

interface SecondNestedList {
  array: any[];
}

class SecondNestedList extends React.Component<any, SecondNestedList> {
  render() {
    return (
      <ul>
        {Object.keys(this.props.array).map((el: string, index: number) => {
          return <li key={index}>{el}</li>;
        })}
      </ul>
    );
  }
}
