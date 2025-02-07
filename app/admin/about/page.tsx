"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast";

export default function AdminPage() {
  const [umkmData, setUmkmData] = useState({
    name: "",
    address: "",
    mapUrl: "",
    description: "",
    phoneNumber: "",
    email: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      tokopedia: "",
      tiktok: "",
      shopee: "",
    },
  })

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => setUmkmData(data))
      .catch((err) => console.error("Error fetching UMKM data:", err))
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("/api/about", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        toast.success("Data updated successfully!") // Ganti alert dengan toast.success
      } else {
        toast.error("Failed to update data. Please try again.") // Ganti alert dengan toast.error
      }
    } catch (error) {
      console.error("Error updating UMKM data:", error)
      toast.error("An error occurred while updating data. Please try again.") // Ganti alert dengan toast.error
    }
  }

  return (
    <div className="container mx-auto px-4 text-black">
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">UMKM DATA</h1>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
         
          <div className="border-b border-gray-300 pb-2 md:col-span-2 font-bold text-1xl">UMKM INFORMATION </div>

          <div>
            <label htmlFor="name" className="block mb-1 font-bold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={umkmData.name}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block mb-1 font-bold">
              Phone
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              defaultValue={umkmData.phoneNumber}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={umkmData.email}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label htmlFor="address" className="block mb-1 font-bold">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              defaultValue={umkmData.address}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div >
            <label htmlFor="mapUrl" className="block mb-1 font-bold">
              Map URL
            </label>
            <input
              type="url"
              id="mapUrl"
              name="mapUrl"
              defaultValue={umkmData.mapUrl}
              required
              className="w-full p-2 border rounded"
            />
          </div>
         
          
          <div className="md:col-span-2 mb-6">
            <label htmlFor="description" className="block mb-1 font-bold">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={umkmData.description}
              required
              className="w-full p-2 border rounded"
              rows={4}
            ></textarea>
          </div>
          <div className="border-b border-gray-300 pb-2 md:col-span-2 font-bold text-1xl">SOSICAL MEDIA</div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(umkmData.socialMedia).map(([key, value]) => (
                <div key={key}>
                  <label htmlFor={key} className="block mb-1 capitalize font-bold">
                    {key}
                  </label>
                  <input
                    type="url"
                    id={key}
                    name={key}
                    defaultValue={value as string}
                    className="w-full p-2 border rounded"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}