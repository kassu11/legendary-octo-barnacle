import { createEffect, createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
import api from "./api.js";
import { A } from '@solidjs/router';

function App(props) {

  return (
    <>
      <nav>
      <A href="/">Home</A>
      <A href="/anime">Anime</A>
      <A href="/manga">Manga</A>
      <A href="/search">Search</A>
      </nav>
      {props.children}
    </>
  )
}


export const optionHandler = (query, variables = {}) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    query,
    variables,
  }),
});

export default App
