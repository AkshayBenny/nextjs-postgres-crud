import Drink from '../components/Drink'
import supabase from '../config/supabaseClient'
import Link from 'next/link'
import { useEffect, useState } from 'react'
export default function Home({ drinks, error }) {
  const [drinkData, setDrinkData] = useState(drinks)
  const [orderBy, setOrderBy] = useState('created_at')
  // const [asc, setAsc] = useState(false)

  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('drinks')
        .select()
        .order(orderBy, { ascending: false })
      if (error) {
        alert('Something went wrong')
        return
      }
      setDrinkData(data)
    }
    fetchOrder()
  }, [orderBy])

  if (error) {
    alert('Something went wrong')
  }

  if (drinks.length === 0) {
    return <p>No drinks added yet</p>
  }

  return (
    <>
      <div className='flex items-center justify-between px-12 pt-12 w-full '>
        <Link href='drink/create-drink'>
          <button className='bg-blue-600 text-white  rounded-lg text-lg px-6 py-3'>
            Create
          </button>
        </Link>
        <div className='flex items-center gap-2'>
          <p className='text-lg'>Sort by</p>
          <select
            name='sort'
            id='sort'
            onChange={(e) => setOrderBy(e.target.value)}
            className='px-4 py-2 border '
          >
            <option defaultValue='created_at' value='created_at'>
              Date
            </option>
            <option value='title'>Title</option>
            <option value='rating'>Rating</option>
          </select>
          {/* <select
            name='dir'
            id='dir'
            className='px-4 py-2 border '
            onChange={(e) => setAsc(e.target.value)}
          >
            <option defaultValue={false} value={false}>
              Ascending
            </option>
            <option value={true}>Descending</option>
          </select> */}
        </div>
      </div>
      <div className='grid px-6 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-12'>
        {drinks &&
          drinkData?.map((drink, index) => {
            return (
              <Drink key={index} drink={drink} setDrinkData={setDrinkData} />
            )
          })}
      </div>
    </>
  )
}

export async function getStaticProps() {
  const { data, error } = await supabase
    .from('drinks')
    .select()
    .order('created_at', { ascending: false })

  return {
    props: {
      drinks: data,
      error: error,
    },
    revalidate: 1,
  }
}
