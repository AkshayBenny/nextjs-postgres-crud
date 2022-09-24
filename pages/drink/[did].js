import { useState } from 'react'
import supabase from '../../config/supabaseClient'

const DrinkPage = ({ drink, error }) => {
  const [drinkData, setDrinkData] = useState({
    title: drink?.title,
    method: drink?.method,
    rating: drink?.rating,
  })
  const [success, setSuccess] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    if (
      drinkData.title === '' ||
      drinkData.method === '' ||
      drinkData.rating === 0
    ) {
      alert('Fields must not empty')
      return
    }
    const { data, error } = await supabase
      .from('drinks')
      .update(drinkData)
      .match({ id: drink.id })
    // .eq('id', drink.id) can be used instead of .match()
    if (error) {
      alert('Something went wrong. Try again.')
      return
    }
    setSuccess(true)
  }

  if (error) return <div>Something went wrong</div>

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
        Update
      </button>
      {success && (
        <p className='text-green-700 text-sm'>Drink updated successfully</p>
      )}
    </form>
  )
}

export default DrinkPage

export async function getStaticPaths() {
  const { data, error } = await supabase.from('drinks').select()
  const paths = data.map((drink) => ({
    params: { did: drink.id.toString() },
  }))
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { did } = context.params
  const { data, error } = await supabase
    .from('drinks')
    .select()
    .match({ id: did })
  return {
    props: {
      drink: data[0],
      error: error,
    },
  }
}
