import { Link } from 'react-router-dom';

export default function SignIn() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input className='p-3 border rounded-xl border-slate-300 ' type="text" placeholder='Enter your name' />
        <input className='p-3 border rounded-xl border-slate-300 ' type='text' placeholder='Enter your email' />
        <input className='p-3 border rounded-xl border-slate-300 ' type="text" placeholder='Enter your password' />
        <button className='bg-slate-700 text-white p-3 rounded-xl'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Already have an account?</p>
        <Link to={'/sign-out'} className='text-blue-700'>Click Here</Link>
      </div>
    </div>
  )
}
