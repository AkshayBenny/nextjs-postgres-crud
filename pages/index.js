import Drink from '../components/Drink'
import supabase from '../config/supabaseClient'
import Link from 'next/link'
export default function Home({ drinks, error }) {
  if (error) {
    alert('Something went wrong')
  }

  if (drinks.length === 0) {
    return <p>No drinks added yet</p>
  }

  return (
    <>
      <div className='flex items-center justify-center pt-12'>
        <Link href='drink/create-drink'>
          <button className='bg-blue-600 text-white mx-auto rounded-lg text-lg px-6 py-3'>
            Create
          </button>
        </Link>
      </div>
      <div className='grid px-6 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-12'>
        {drinks &&
          drinks?.map((drink, index) => {
            console.log(drink)
            return <Drink key={index} drink={drink} />
          })}
      </div>
    </>
  )
}

export async function getStaticProps() {
  const { data, error } = await supabase.from('drinks').select()
  return {
    props: {
      drinks: data,
      error: error,
    },
  }
}
