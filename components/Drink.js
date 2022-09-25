import Link from 'next/link'
import supabase from '../config/supabaseClient'

const Drink = ({ drink, setDrinkData }) => {
  const deleteHandler = async () => {
    const { data, error } = await supabase
      .from('drinks')
      .delete()
      .match({ id: drink.id })
    if (error) {
      alert('Something went wrong')
      return
    }
    if (data) {
      setDrinkData((prev) => prev.filter((d) => d.id !== drink.id))
      alert('Deleted successfully')
    }
  }
  return (
    <div className='p-3 border rounded-lg flex flex-col justify-between'>
      <div>
        <h1 className='font-semibold '>{drink.title}</h1>
        <h2 className='text-lg'>{drink.method}</h2>
      </div>
      <p className='text-2xl'>{drink.rating}</p>
      <div className='flex gap-2 items-center pt-4'>
        <Link href={`drink/${drink.id}`}>
          <button className='text-white bg-black px-4 py-2 w-fit h-fit rounded-md '>
            Edit
          </button>
        </Link>
        <button
          onClick={deleteHandler}
          className='text-white bg-red-700 px-4 py-2 w-fit h-fit rounded-md '
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Drink
