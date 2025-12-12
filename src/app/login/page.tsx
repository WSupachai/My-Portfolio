// app/login/page.tsx
import { login } from '@/src/app/login/action'
export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <form className="flex flex-col gap-4 w-full max-w-sm bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-4 text-black">เข้าสู่ระบบ</h1>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">Email:</label>
          <input 
            name="email" 
            type="email" 
            required 
            className="border p-2 rounded text-black"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">Password:</label>
          <input 
            name="password" 
            type="password" 
            required 
            className="border p-2 rounded text-black"
          />
        </div>

        <div className="flex gap-2 mt-4">
          <button 
            formAction={login} 
            className="bg-blue-500 text-white p-2 rounded flex-1 hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}