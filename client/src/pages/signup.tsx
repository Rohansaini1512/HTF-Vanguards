import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectTrigger, 
  SelectContent, 
  SelectItem, 
  SelectValue 
} from "@/components/ui/select"
import { Link } from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    location: '',
    agree: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSelectChange = (name, value) => {
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
      <div className="signup-form p-6 max-w-md w-full bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Personal Task Manager</h1>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input name="name" value={formData.name} onChange={handleChange} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Age</label>
            <Input name="age" value={formData.age} onChange={handleChange} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <Select onValueChange={(value) => handleSelectChange('gender', value)}>
              <SelectTrigger className="w-full border border-gray-300 rounded-md p-2 text-gray-700">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                <SelectItem value="male" className="p-2 hover:bg-gray-100">Male</SelectItem>
                <SelectItem value="female" className="p-2 hover:bg-gray-100">Female</SelectItem>
                <SelectItem value="other" className="p-2 hover:bg-gray-100">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <Select onValueChange={(value) => handleSelectChange('location', value)}>
              <SelectTrigger className="w-full border border-gray-300 rounded-md p-2 text-gray-700">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                <SelectItem value="pst" className="p-2 hover:bg-gray-100">PST</SelectItem>
                <SelectItem value="mst" className="p-2 hover:bg-gray-100">MST</SelectItem>
                <SelectItem value="cst" className="p-2 hover:bg-gray-100">CST</SelectItem>
                <SelectItem value="est" className="p-2 hover:bg-gray-100">EST</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center">
            <Checkbox
              name="agree"
              checked={formData.agree}
              onCheckedChange={(checked) => handleSelectChange('agree', checked)}
            />
            <label className="ml-2 text-sm">I agree to the terms and conditions</label>
          </div>
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white">Submit</Button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <Link to="/signin" className="text-sm text-blue-500 hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
