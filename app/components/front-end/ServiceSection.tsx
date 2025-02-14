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
    <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Layanan Kami</h2>
        <div className="space-y-12 pl-6 sm:pl-0">
          {services.map((service, index) => {
            const IconComponent = Icons[service.icon as keyof typeof Icons] as IconType
            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8"
              >
                <div className="text-6xl text-gray-800">
                  <IconComponent />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 max-w-2xl">{service.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}