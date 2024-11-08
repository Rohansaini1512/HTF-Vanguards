import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom'

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="signin-form p-6 max-w-md w-full bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Personal Task Manager</h1>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input name="email" value={formData.email} onChange={handleChange} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full" />
          </div>
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white">Sign In</Button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <Link to="/signup" className="text-sm text-blue-500 hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  )
}

export default Signin
