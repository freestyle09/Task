import * as React from 'react';
import { IRuleResult } from '@stoplight/spectral';

export interface TreeViewProps extends React.HTMLProps<HTMLUListElement> {
  spec: any;
  diagnostics: IRuleResult[];
}

export function TreeView({ spec, diagnostics, ...restProps }: TreeViewProps) {
  console.log(diagnostics);
  return (
    <ul {...restProps}>
      {Object.keys(spec).map((el, index) => {
        return (
          <React.Fragment key={index}>
            <li>
              {el}
              {(spec[el].constructor === Array || spec[el].constructor === Object) && <NestedList array={spec[el]} />}
            </li>
          </React.Fragment>
        );
      })}
    </ul>
  );
}

class NestedList extends React.Component<any> {
  render() {
    let array = this.props.array;
    return (
      <ul>
        {Object.keys(array).map((el: string, index: number) => {
          return (
            <li key={index}>
              {el}
              {(array[el].constructor === Object || array[el].constructor === Array) && (
                <NestedList array={array[el]} />
              )}
            </li>
          );
        })}
      </ul>
    );
  }
}
