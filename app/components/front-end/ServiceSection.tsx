"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { IconType } from "react-icons"
import * as Icons from "react-icons/fa"

interface Service {
  _id: string
  title: string
  description: string
  icon: string
}

export default function ServiceSection() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then(setServices)
  }, [])

  return (
    <section id="service" className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Layanan Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = Icons[service.icon as keyof typeof Icons] as IconType
            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-6xl text-gray-800 mb-4 flex justify-center">
                  <IconComponent />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">{service.title}</h3>
                <p className="text-gray-600 text-center">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}