import { createEffect, createSignal } from 'solid-js'
import solidLogo from './assets/solid.svg'
import viteLogo from '/vite.svg'
import './App.css'
import api from "./api.js";

const query = `query media($id:Int, $type:MediaType) {
	Media (id: $id, type: $type) {
		id
		genres
		siteUrl
		meanScore
		title {
			romaji
			english
			native
			userPreferred
		}
	}
}`;

function App(props) {
  const [count, setCount] = createSignal(0)

  // createEffect(async () => {
  //   if (count() == 2) {
  //     const option = optionHandler(query, { "id": "177709" });
  //     const response = await fetch("https://graphql.anilist.co", option);
  //     const json = await response.json();
  //     console.log(json);
  //   }
  // })

  console.log(props)
  return (
    <>
      <nav>navigation</nav>
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
