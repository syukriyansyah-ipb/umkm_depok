"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import * as Icons from "react-icons/fa"

interface Service {
  _id: string
  title: string
  description: string
  icon: string
  order: number
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([])
  const [editingService, setEditingService] = useState<Service | null>(null)
  const { register, handleSubmit, reset, setValue } = useForm<Service>()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = () => {
    fetch("/api/services")
      .then((res) => res.json())
      .then(setServices)
  }

  const onSubmit = async (data: Service) => {
    if (editingService) {
      await fetch(`/api/services/${editingService._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    } else {
      await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    }
    fetchServices()
    reset()
    setEditingService(null)
  }

  const deleteService = async (id: string) => {
    await fetch(`/api/services/${id}`, { method: "DELETE" })
    fetchServices()
  }

  const editService = (service: Service) => {
    setEditingService(service)
    setValue("title", service.title)
    setValue("description", service.description)
    setValue("icon", service.icon)
    setValue("order", service.order)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Services</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <input {...register("title")} placeholder="Title" className="w-full mb-2 p-2 border rounded" />
        <textarea {...register("description")} placeholder="Description" className="w-full mb-2 p-2 border rounded" />
        <select {...register("icon")} className="w-full mb-2 p-2 border rounded">
          {Object.keys(Icons).map((icon) => (
            <option key={icon} value={icon}>
              {icon}
            </option>
          ))}
        </select>
        <input {...register("order")} type="number" placeholder="Order" className="w-full mb-2 p-2 border rounded" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editingService ? "Update" : "Add"} Service
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service._id} className="border p-4 rounded">
            <h3 className="font-bold">{service.title}</h3>
            <p>{service.description}</p>
            <p>Icon: {service.icon}</p>
            <p>Order: {service.order}</p>
            <button onClick={() => editService(service)} className="bg-yellow-500 text-white p-2 rounded mr-2">
              Edit
            </button>
            <button onClick={() => deleteService(service._id)} className="bg-red-500 text-white p-2 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

