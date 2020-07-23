[![npm](https://img.shields.io/npm/v/@wojtekmaj/react-hooks.svg)](https://www.npmjs.com/package/@wojtekmaj/react-hooks) ![downloads](https://img.shields.io/npm/dt/@wojtekmaj/react-hooks.svg) ![build](https://travis-ci.com/wojtekmaj/react-hooks.svg?branch=master) ![dependencies](https://img.shields.io/david/wojtekmaj/react-hooks.svg) ![dev dependencies](https://img.shields.io/david/dev/wojtekmaj/react-hooks.svg) [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

# React-Hooks
A collection of React Hooks.

## tl;dr
* Install by executing `npm install @wojtekmaj/react-hooks` or `yarn add @wojtekmaj/react-hooks`.
* Import by adding `import * as asyncArrayUtils from '@wojtekmaj/react-hooks'`.
* Do stuff with it!
    ```js
    const tick = useTick();
    ```

## User guide

#### `useEventListener`

Adds event listener to a given element.

##### Sample usage

```js
import { useEventListener } from '@wojtekmaj/react-hooks';

useEventListener(element, 'click', onClick);
```

#### `useMatchMedia`

Returns a flag which determines if the document matches the given [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) string.

##### Sample usage

```js
import { useMatchMedia } from '@wojtekmaj/react-hooks';

const isDesktop = useMatchMedia('screen and (min-width: 1024px)'); // true / false
```

#### `useMutationObserver`

Observes a given element using [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

##### Sample usage

```js
import { useMutationObserver } from '@wojtekmaj/react-hooks';

useMutationObserver(element, config, onMutation);
```

#### `useSetInterval`

Runs a given function every n milliseconds.

##### Sample usage

```js
import { useSetInterval } from '@wojtekmaj/react-hooks';

useSetInterval(fn, 1000);
```

#### `useTick`

Counts from 0, increasing the number returned every n milliseconds.

##### Sample usage

```js
import { useTick } from '@wojtekmaj/react-hooks';

const tick = useTick(1000); // 0 … 🕐 … 1 … 🕑 … 2 …
```

#### `useToggle`

Returns a flag and a function to toggle it.

##### Sample usage

```js
import { useToggle } from '@wojtekmaj/react-hooks';

const [value, toggleValue] = useToggle(); // [false, Function]
```

## License

The MIT License.

## Author

<table>
  <tr>
    <td>
      <img src="https://github.com/wojtekmaj.png?s=100" width="100">
    </td>
    <td>
      Wojciech Maj<br />
      <a href="mailto:kontakt@wojtekmaj.pl">kontakt@wojtekmaj.pl</a><br />
      <a href="http://wojtekmaj.pl">http://wojtekmaj.pl</a>
    </td>
  </tr>
</table>
