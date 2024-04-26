import type { ReactNode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { renderToString } from 'react-dom/server';
import { act } from 'react-dom/test-utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderHookServer = <Hook extends () => any>(
  useHook: Hook,
  {
    wrapper: Wrapper,
  }: {
    wrapper?: ({ children }: { children: ReactNode }) => React.ReactElement;
  } = {},
): {
  result: { current: ReturnType<Hook> | undefined };
  hydrate: () => void;
} => {
  // Store hook return values
  const results: ReturnType<Hook>[] = [];

  const result = {
    get current() {
      return results.slice(-1)[0];
    },
  };

  const setValue = (value: ReturnType<Hook>) => {
    results.push(value);
  };

  const Component = ({ useHook }: { useHook: Hook }) => {
    setValue(useHook());
    return null;
  };

  const component = Wrapper ? (
    <Wrapper>
      <Component useHook={useHook} />
    </Wrapper>
  ) : (
    <Component useHook={useHook} />
  );

  // Render hook on server
  const serverOutput = renderToString(component);

  // Render hook on client
  const hydrate = () => {
    const root = document.createElement('div');
    root.innerHTML = serverOutput;
    act(() => {
      hydrateRoot(root, component);
    });
  };

  return {
    result,
    hydrate: hydrate,
  };
};
