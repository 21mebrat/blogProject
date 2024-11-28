import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { increment,decrement,reset,incAmount } from './slice'

const Buttons = () => {
  const [inAmout,setInAmout] = useState(0)
    const counter = useSelector((state)=>state.counter.count)
    const dispatch = useDispatch()
    const value = Number(inAmout) ||0
    const restAll = ()=>{
   setInAmout(0)
   dispatch(reset())
    }
  return (
    <div>
      <p>{counter}</p>
      <div>
        <button onClick={()=>dispatch(increment())}>+</button>
        <button onClick={()=>dispatch(decrement())}>-</button>
      </div>
      <div>
        <input className='bg-gray-50 text-danger' type="text" onChange={(e)=>setInAmout(e.target.value)} value={inAmout} name="" id="" />
        <button onClick={()=>dispatch(incAmount(value))}>increment</button>
        <button onClick={restAll}>reset</button>
      </div>
    </div>
  )
}

export default Buttons
