"use client"

import { setLoading } from "@/redux/features/loadingSlice"
import { useAppDispatch } from "@/redux/hooks"
import { makeToast } from "@/utils/helper"
import axios from "axios"
import React, { type FormEvent, useState } from "react"
import Image from "next/image"
import { UploadButton } from "@/utils/uploadthing"
import type { ProductType } from "@/types/productType"
import { Editor } from "@tinymce/tinymce-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ProductForm = () => {
  const [payload, setPayload] = useState<ProductType>({
    _id: "",
    image: null,
    fileKey: null,
    name: "",
    category: "",
    price: 0,
    description: null,
    type: "",
    isBestSeller: false,
  })

  const dispatch = useAppDispatch()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    dispatch(setLoading(true))

    axios
      .post("/api/add_product", payload)
      .then((res) => {
        makeToast("Product added Successfully")
        setPayload({
          _id: "",
          image: null,
          name: "",
          category: "",
          price: 0,
          description: "",
          type: null,
          isBestSeller: false,
          fileKey: null,
        })
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)))
  }

  return (
    <form className="flex flex-col h-full" onSubmit={handleSubmit}>
      <div className="flex-1 overflow-y-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Section - Image Upload and Preview */}
          <div className="space-y-4">
            <div className="p-4 rounded-lg flex flex-col items-center justify-center min-h-[400px]">
              <Image
                className="max-h-[300px] w-auto object-contain rounded-md mx-auto"
                src={payload.image ? payload.image : "/images/placeholder.png"}
                width={800}
                height={500}
                alt="product_image"
              />

              <div className="mt-4 w-full bg-gray-100 p-4 border border-gray-300 rounded-md">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setPayload({
                      ...payload,
                      image: res[0]?.url,
                      fileKey: res[0]?.key,
                    })
                  }}
                  onUploadError={(error: Error) => {
                    console.log(`ERROR! ${error}`)
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Section - Product Details */}
          <div className="space-y-4">

          <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                className="bg-gray-100 w-full px-4 py-2 border border-gray-300 outline-customPink rounded-md"
                type="text"
                value={payload.name}
                onChange={(e) => setPayload({ ...payload, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Type</label>
              <Select value={payload.type === null ? "" : payload.type} onValueChange={(value) => setPayload({ ...payload, type: value })}>
                <SelectTrigger className="bg-gray-100 w-full px-4 py-2 border border-gray-300 outline-customPink rounded-md">
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="home">Home & Garden</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Currency</label>
              <input
                className="bg-gray-100 w-full px-4 py-2 border border-gray-300 outline-customPink rounded-md"
                type="number"
                value={payload.price}
                onChange={(e) => setPayload({ ...payload, price: Number.parseFloat(e.target.value) })}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Price</label>
              <input
                className="bg-gray-100 w-full px-4 py-2 border border-gray-300 outline-customPink rounded-md"
                type="number"
                value={payload.price}
                onChange={(e) => setPayload({ ...payload, price: Number.parseFloat(e.target.value) })}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Bestseller</label>
              <Select
                value={payload.isBestSeller ? "true" : "false"}
                onValueChange={(value) => setPayload({ ...payload, isBestSeller: value === "true" })}
              >
                <SelectTrigger className="bg-gray-100 w-full px-4 py-2 border border-gray-300 outline-customPink rounded-md">
                  <SelectValue placeholder="Is this a bestseller?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINY_MCE}
          init={{
            height: 350,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help",
          }}
          value={payload.description === null ? "" : payload.description}
          onEditorChange={(content) => setPayload({ ...payload, description: content })}
        />
      </div>

      <div className="mt-6 mb-6">
        <button className="bg-black text-white px-8 py-3 rounded-md w-full font-medium hover:bg-opacity-90 transition-colors">
          Add Product
        </button>
      </div>
    </form>
  )
}

export default ProductForm

