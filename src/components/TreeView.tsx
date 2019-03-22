import * as React from 'react';
import { IRuleResult } from '@stoplight/spectral';

export interface TreeViewProps extends React.HTMLProps<HTMLUListElement> {
  spec: any;
  diagnostics: IRuleResult[];
}

export function TreeView({ spec, diagnostics, ...restProps }: TreeViewProps) {
  return <NestedList array={spec} diagnostics={diagnostics} element={[]} />;
}

function isOnSamePath(path: Array<string | number>, element: string[]) {
  return element.filter((e, i) => e == path[i]).length == element.length;
}

function isParent(path: Array<string | number>, element: string[]) {
  return path.length > element.length && isOnSamePath(path, element);
}

function hasError(diagnostics: IRuleResult[], element: string[]) {
  return (
    diagnostics.filter(e => {
      return isParent(e.path, element);
    }).length > 0
  );
}

class NodeInfo {
  constructor(warn: boolean, error: boolean) {
    this.warn = warn;
    this.error = error;
  }
  warn: boolean;
  error: boolean;

  getClasses(): string {
    var result = [];
    if (this.warn) {
      result.push('warn');
    }
    if (this.error) {
      result.push('error');
    }
    return result.join(' ');
  }
}

function getDiagnosticInfoForParent(diagnostics: IRuleResult[], element: string[]) {
  return diagnostics
    .filter(e => {
      return isOnSamePath(e.path, element);
    })
    .reduce<NodeInfo>((a: NodeInfo, next: IRuleResult) => {
      if (next.severityLabel === 'warn') {
        return new NodeInfo(true, a.error);
      }
      if (next.severityLabel === 'error') {
        return new NodeInfo(a.warn, true);
      }
      return a;
    }, new NodeInfo(false, false));
}

class NestedList extends React.Component<any> {
  render() {
    let { array, diagnostics, element } = this.props;
    return (
      <ul>
        {Object.keys(array).map((el: string, index: number) => {
          let info = getDiagnosticInfoForParent(diagnostics, [...element, el]);
          return (
            <li key={index} className={info.getClasses()}>
              {el}
              {(array[el].constructor === Object || array[el].constructor === Array) && (
                <NestedList array={array[el]} diagnostics={diagnostics} element={[...element, el]} />
              )}
            </li>
          );
        })}
      </ul>
    );
  }
}
