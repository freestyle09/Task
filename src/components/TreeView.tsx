import * as React from 'react';
import { IRuleResult } from '@stoplight/spectral';

export interface TreeViewProps extends React.HTMLProps<HTMLUListElement> {
  spec: any;
  diagnostics: IRuleResult[];
}

export function TreeView({ spec, diagnostics, ...restProps }: TreeViewProps) {
  const keys: string[] = [...Object.keys(spec)];

  return (
    <ul {...restProps}>
      {keys.map(el => (
        <li key={keys.indexOf(el)}>{el}</li>
      ))}
    </ul>
  );
}
