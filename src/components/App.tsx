import React, { useState } from 'react';
import { container, image } from './App.module.scss';
import Image from '../assets/images/orig.webp';
import { css } from '@emotion/react';

export function App() {
  const [state, setState] = useState('red');

  return (
    <div className={container}>
      <h1
        css={css({
          color: state,
          marginTop: 0,
          paddingTop: 10,
          fontSize: 25,
        })}
      >
        App
      </h1>
      <img src={Image} alt="Orig" className={image} />
      <button onClick={() => setState(state === 'green' ? 'red' : 'green')}>
        Кнопка
      </button>
    </div>
  );
}
