import React, { useState } from 'react'
import supabase from '../../config/supabaseClient'

const CreateDrink = () => {
  const [drinkData, setDrinkData] = useState({
    title: '',
    method: '',
    rating: 0,
  })
  const [success, setSuccess] = useState(false)
  const submitHandler = async (e) => {
    e.preventDefault()
    if (
      drinkData.title === '' ||
      drinkData.method === '' ||
      drinkData.rating === 0
    ) {
      alert('Please fill in all fields')
      return
    }
    const { data, error } = await supabase.from('drinks').insert(drinkData)
    if (error) {
      alert('Something went wrong. Try again.')
      return
    }
    if (data) {
      setSuccess(true)
      setDrinkData({
        title: '',
        method: '',
        rating: 0,
      })
    }
  }

  return (
    <form onSubmit={submitHandler} className='flex flex-col gap-4 pt-12 px-12'>
      <input
        placeholder='Enter drink name'
        type='text'
        className='px-4 py-3 border rounded-md '
        onChange={(e) => {
          setDrinkData((prev) => ({ ...prev, title: e.target.value }))
          setSuccess(false)
        }}
        value={drinkData.title}
      />
      <textarea
        placeholder='Enter method'
        type='text'
        className='px-4 py-3 border rounded-md '
        onChange={(e) => {
          setDrinkData((prev) => ({ ...prev, method: e.target.value }))
          setSuccess(false)
        }}
        value={drinkData.method}
      />
      <input
        placeholder='Rating'
        type='number'
        className='px-4 py-3 border rounded-md '
        onChange={(e) => {
          setDrinkData((prev) => ({ ...prev, rating: e.target.value }))
          setSuccess(false)
        }}
        value={drinkData.rating}
      />
      <button className='bg-blue-600 text-white mx-auto rounded-lg text-lg px-6 py-3'>
        Create a new drink
      </button>
      {success && (
        <p className='text-green-700 text-sm'>Drink created successfully</p>
      )}
    </form>
  )
}

export default CreateDrink
