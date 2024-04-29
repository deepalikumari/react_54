import React, { useReducer, useRef, useState } from "react";
import "./App.css"
import MORE from "./components/more"

const onSubmit = (state, action) => {
  if (action.value != "") {
    switch (action.type) {
      case "add task":
        return [...state, newPost(action.value)]
    
      case "toggle" :
        return state.map(state => {
          if(state.id == action.value){
            return {...state, toggle: !state.toggle}
          }
          else {
            return state
          }
        })      
        
      default :
        return state
      }
  }
  return state
}

const newPost = (val) => {
  return {id : Date.now(), value : val, toggle : true}
}

export default function App() {
  const [state, dispatch] = useReducer(onSubmit, [])
  const [val, setState] = useState("")

  const inputreference = useRef()

  function focus () {
    inputreference.current.focus()
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          dispatch({ type: "add task", value: val })
          setState("")
        }}
      >
        <input
          type="text"
          onChange={(el) => setState(el.target.value)}
          value={val}
          ref={inputreference}
          id="focus"
        />
        <button type="submit">Add</button>
      </form>

      {state.map((el) => (
        <div key={el.id}>
        <MORE key={el.id} value={el} dispatch = {dispatch}></MORE>
        </div>
      ))}
      <button onClick={focus}>Get back to writing</button>
    </>
  )
}