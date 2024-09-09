import React, {useReducer} from 'react'

const CHANGE_LABEL='CHANGE_LABEL'
const CHANGE_IS_COMPLETED='CHANGE_IS_COMPLETED'

const initialState={
  todoLabel:'',
  todoIsCompleted:false
}

// Things to remember about reducers: 
// 1) ALWAYS return state
// 2) NEVER mutate the state (return brand new state)
const reducer = (state, action)=>{
  switch(action.type){
    case CHANGE_LABEL:
      return {...state, todoLabel: action.payload}      //{type:CHANGE_LABEL, payload: 'foo'}
    case CHANGE_IS_COMPLETED:
      return {...state, todoIsCompleted:action.payload} //{type:CHANGE_IS_COMPLETED, payload: true}
    default:
      return state
  }
}


export default function TodoForm({ createNewTodo}) {
  const [state, dispatch]=useReducer(reducer, initialState)
  const onLabelChange=evt=>{
    dispatch({type: CHANGE_LABEL, payload:evt.target.value})
  }
  const onIsCompletedChange=evt=>{
    dispatch({type:CHANGE_IS_COMPLETED, payload:evt.target.checked})
  }
  const resetForm =()=>{
    dispatch({type: CHANGE_LABEL, payload:''})
    dispatch({type: CHANGE_IS_COMPLETED, payload:false})
  }
  const onNewToDo=evt=>{
    evt.preventDefault()
    createNewTodo(state.todoLabel, state.todoIsCompleted)
    resetForm()
  }


  return (
    <form id="todoForm" onSubmit={onNewToDo}>
      <h3>New Todo Form</h3>
      <label><span>Todo label:</span>
        <input
        onChange={onLabelChange}
          value={state.todoLabel}
          type='text'
          name='todoLabel'
          placeholder='Type label'
        />
      </label>
      <label><span>Is completed:</span>
        <input
          onChange={onIsCompletedChange}
          checked={state.todoIsCompleted}
          type='checkbox'
          name='todoIsCompleted'
        />
      </label>
      <label><span>Create todo:</span>
        <input
          type='submit'
          value='Do it!'
        />
      </label>
    </form>
  )
}
