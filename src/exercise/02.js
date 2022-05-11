// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  console.log('rendering')
  // const [name, setName] = React.useState(
  //   window.localStorage.getItem('name') || initialName,
  // )

  // // 🐨 Here's where you'll use `React.useEffect`.
  // // The callback should set the `name` in localStorage.
  // // 💰 window.localStorage.setItem('name', name)

  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // })

  // Extra credit 1:

  // In the above exercise, you'd end up calling window... every time it's re-rendered
  // Lazy load the localStorage item, by using a function in .useState()
  // .useState(value) is render phase only, .useState(() => {}) is re-refresh update phase only
  // const [name, setName] = React.useState(() => {
  //   console.log('fetch initial value lazy method')
  //   return window.localStorage.getItem('name') || initialName
  // })

  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // })

  // Extra credit 2:
  // The second argument to useEffect is an array of values that should trigger this function.
  // React.useEffect(() => {
  //   window.localStorage.setItem('name', name)
  // }, [name])

  // Extra credit 3:
  // function useLocalStorageState(key, defaultValue = '') {
  //   const [state, setState] = React.useState(() => {
  //     console.log('fetch initial value lazy method')
  //     return window.localStorage.getItem(key) || defaultValue
  //   })

  //   React.useEffect(() => {
  //     window.localStorage.setItem(key, state)
  //   }, [key, state])

  //   return [state, setState]
  // }

  // const [name, setName] = useLocalStorageState('name', initialName)

  // Extra credit 4: (More tricky!)
  // We need to convert objects into serializable strings. Use JSON.stringify / JSON.parse
  // Can add optional parameter for serializers (in case its not just strings)
  function useLocalStorageState(
    key,
    defaultValue = '',
    {serialize = JSON.stringify, deserialize = JSON.parse} = {}, // default empty object if not given
  ) {
    const [state, setState] = React.useState(() => {
      const valueInLocalStorage = window.localStorage.getItem(key)
      if (valueInLocalStorage) {
        return deserialize(valueInLocalStorage)
      }
      // Can change defaultValue to either take a function or a value
      return typeof defaultValue === 'function' ? defaultValue() : defaultValue
    })

    // What about the key prop?
    const prevKeyRef = React.useRef(key)

    React.useEffect(() => {
      // if the key has changed, remove the old key and use the new key
      const prevKey = prevKeyRef.current
      if (prevKey !== key) {
        window.localStorage.remove(prevKey)
      }
      prevKeyRef.current = key
      window.localStorage.setItem(key, serialize(state))
    }, [key, state, serialize])

    return [state, setState]
  }

  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
