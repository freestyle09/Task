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
              {spec[el].constructor === Array && <Arrays array={spec[el]} />}
            </li>
          </React.Fragment>
        );
      })}
    </ul>
  );
}

interface Arrays {
  array: any[];
}

class Arrays extends React.Component<any, Arrays> {
  render() {
    return (
      <ul>
        {this.props.array.map((el: any, index: number) => {
          if (el.constructor === Object) {
            return (
              <li key={index}>
                {index}
                <NestedArray array={el} />
              </li>
            );
          }
        })}
      </ul>
    );
  }
}

interface NestedArray {
  array: any[];
}

class NestedArray extends React.Component<any, NestedArray> {
  render() {
    console.log(this.props.array);
    return (
      <ul>
        {Object.keys(this.props.array).map((el: any, index: number) => {
          return (
            <li key={index}>
              {el}
              {this.props.array[el].constructor === Object && (
                <ul>
                  {Object.keys(this.props.array[el]).map((el: any, index: number) => {
                    return <li key={index}>{el}</li>;
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    );
  }
}
