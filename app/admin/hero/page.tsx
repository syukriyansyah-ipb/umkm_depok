"use client";

import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Modal from "@/app/components/admin-panel/Modal";
import { BiPlus, BiEdit, BiTrash } from "react-icons/bi";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image"

type Hero = {
  _id: string;
  title: string;
  description: string;
  image: string;
  imageKey: string;
  backgroundImage: string;
  backgroundImageKey: string;
  tiktok: string;
  instagram: string;
  shopee: string;
  tokopedia: string;
};

export default function HeroPage() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    backgroundImage: "",
    imageKey: "",
    backgroundImageKey: "",
    tiktok: "",
    instagram: "",
    shopee: "",
    tokopedia: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewImage, setViewImage] = useState<string | null>(null);

  useEffect(() => {
    fetchHeroes();
  }, []);

  const fetchHeroes = async () => {
    try {
      const { data } = await axios.get("/api/heros");
      setHeroes(data.data);
    } catch (error) {
      toast.error("Failed to fetch heroes!");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.image || !form.backgroundImage) {
      toast.error("All fields are required!");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`/api/heros/${editingId}`, form);
        toast.success("Hero updated successfully!");
      } else {
        await axios.post("/api/heros", form);
        toast.success("Hero added successfully!");
      }

      setForm({ title: "", description: "", image: "", backgroundImage: "", imageKey: "", backgroundImageKey: "", tiktok: "", instagram: "", shopee: "", tokopedia: "" });
      setEditingId(null);
      fetchHeroes();
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to save hero!");
    }
  };

  const handleEdit = (hero: Hero) => {
    setForm({
      title: hero.title,
      description: hero.description,
      image: hero.image,
      backgroundImage: hero.backgroundImage,
      imageKey: hero.imageKey,
      backgroundImageKey: hero.backgroundImageKey,
      tiktok: hero.tiktok,      
      instagram: hero.instagram,
      shopee: hero.shopee,
      tokopedia: hero.tokopedia,
    });
    setEditingId(hero._id);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`/api/heros/${deleteId}`);
      toast.success("Hero deleted successfully!");
      fetchHeroes();
    } catch (error) {
      toast.error("Failed to delete hero!");
    } finally {
      setDeleteId(null);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Toaster />
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Hero Section</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <BiPlus className="inline mr-2" /> Add Hero
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Tiktok</th>
              <th className="p-4 text-left">Instagram</th>
              <th className="p-4 text-left">Shoopee</th>
              <th className="p-4 text-left">Tokopedia</th>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Background</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {heroes.map((hero) => (
              <tr key={hero._id} className="hover:bg-gray-100">
                <td className="p-4">{hero.title}</td>
                <td className="p-4">{hero.description}</td>
                <td className="p-4">{hero.tiktok}</td>
                <td className="p-4">{hero.instagram}</td>
                <td className="p-4">{hero.tokopedia}</td>
                <td className="p-4">{hero.shopee}</td>
                <td className="p-4">
                  <button
                    onClick={() => setViewImage(hero.image)}
                    className="hover:opacity-75"
                  >
                    <img src={hero.image} alt="" className="w-16 h-16 object-contain rounded" />
                  </button>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => setViewImage(hero.backgroundImage)}
                    className="hover:opacity-75"
                  >
                    <img
                      src={hero.backgroundImage}
                      alt=""
                      className="w-16 h-16 object-contain rounded" />
                  </button>

                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleEdit(hero)}
                    className="text-yellow-500 hover:text-yellow-600 mx-2"
                  >
                    <BiEdit />
                  </button>
                  <button
                    onClick={() => {
                      setDeleteId(hero._id);
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-red-500 hover:text-red-600 mx-2"
                  >
                    <BiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Title</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                className="w-full border rounded px-3 py-2"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col gap-4"> 
              <label className="block font-medium">Tiktok</label>
              <input
                type="text"
                className="w-full border rounded py-2"
                value={form.tiktok}
                onChange={(e) => setForm({ ...form, tiktok: e.target.value })}
                required
              />
              <label className="block font-medium">Instagram</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={form.instagram}
                onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                required
              />
              <label className="block font-medium">Shopee</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={form.shopee}
                onChange={(e) => setForm({ ...form, shopee: e.target.value })}
                required
              />
              <label className="block font-medium">Tokopedia</label>
              <input 
                type="text"
                className="w-full border rounded px-3 py-2"
                value={form.tokopedia}
                onChange={(e) => setForm({ ...form, tokopedia: e.target.value })}
                required    
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Image</label>
              <div className="p-4 rounded-lg flex flex-col items-center justify-center min-h-[400px]">
                <Image
                  className="max-h-[300px] w-auto object-contain rounded-md mx-auto"
                  src={form.image ? form.image : "/images/placeholder.png"}
                  width={800}
                  height={500}
                  alt="product_image"
                />
              
                <div className="mt-4 w-full bg-gray-100 p-4 border border-gray-300 rounded-md">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setForm({
                        ...form,
                        image: res[0]?.url,
                        imageKey: res[0]?.key,
                      })
                    }}
                    onUploadError={(error: Error) => {
                      console.log(`ERROR! ${error}`)
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">Background Image</label>
              <Image
                  className="max-h-[300px] w-auto object-contain rounded-md mx-auto"
                  src={form.backgroundImage ? form.backgroundImage : "/images/placeholder.png"}
                  width={800}
                  height={500}
                  alt="product_image"
                />
              
                <div className="mt-4 w-full bg-gray-100 p-4 border border-gray-300 rounded-md">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setForm({
                        ...form,
                        backgroundImage: res[0]?.url,
                        backgroundImageKey: res[0]?.key,
                      })
                    }}
                    onUploadError={(error: Error) => {
                      console.log(`ERROR! ${error}`)
                    }}
                  />
                </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal onClose={() => setIsDeleteModalOpen(false)}>
          <div className="p-6 text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this hero?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {viewImage && (
        <Modal onClose={() => setViewImage(null)}>
          <div className="flex justify-center items-center h-full">
            <img src={viewImage} alt="Preview" className="max-w-full max-h-full object-contain" />
          </div>
        </Modal>
      )}
    </div>
  );
}
