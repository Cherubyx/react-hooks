// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

// Extra credit 1: Colocate name property use state to component level
// function Name({name, onNameChange}) {
//   return (
//     <div>
//       <label htmlFor="name">Name: </label>
//       <input id="name" value={name} onChange={onNameChange} />
//     </div>
//   )
// }

function Name() {
  const [name, setName] = React.useState('')
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input
        id="name"
        value={name}
        onChange={event => setName(event.target.value)}
      />
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({animal, onAnimalChange}) {
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input id="animal" value={animal} onChange={onAnimalChange} />
    </div>
  )
}

// Extra credit 1: Remove name
// function Display({name, animal}) {
//   return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
// }
function Display({animal}) {
  return <div>{`Your favorite animal is: ${animal}!`}</div>
}

function App() {
  // 🐨 add a useState for the animal
  // Extra credit 1: Move it down to component level
  // const [name, setName] = React.useState('')
  const [animal, setAnimal] = React.useState('')

  return (
    <form>
      {/* Extra credit 1 - Move name property down into the component */}
      {/* <Name name={name} onNameChange={event => setName(event.target.value)} /> */}
      <Name />

      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal
        animal={animal}
        onAnimalChange={event => setAnimal(event.target.value)}
      />
      {/* 🐨 pass the animal prop here */}
      {/* <Display name={name} animal={animal} /> */}

      {/* Extra credit 1 - only showing animal now, name is to colocate */}
      <Display animal={animal} />
    </form>
  )
}

export default App
