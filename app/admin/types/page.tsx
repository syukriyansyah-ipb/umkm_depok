"use client";

import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Modal from "@/app/components/admin-panel/Modal";
import { BiPlus, BiEdit, BiTrash } from "react-icons/bi";

type Type = {
  _id: string;
  name: string;
  description: string;
};

export default function TypesPage() {
  const [types, setTypes] = useState<Type[]>([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get<Type[]>("/api/types");
      setTypes(data);
    } catch (error) {
      toast.error("Failed to fetch types!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingId) {
        await axios.put(`/api/types/${editingId}`, form);
        toast.success("Type updated successfully!");
      } else {
        await axios.post("/api/types", form);
        toast.success("Type added successfully!");
      }
      setForm({ name: "", description: "" });
      setEditingId(null);
      fetchTypes();
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to save type!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (type: Type) => {
    setForm({ name: type.name, description: type.description });
    setEditingId(type._id);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsLoading(true);
    try {
      await axios.delete(`/api/types/${deleteId}`);
      toast.success("Type deleted successfully!");
      fetchTypes();
    } catch (error) {
      toast.error("Failed to delete type!");
    } finally {
      setDeleteId(null);
      setIsDeleteModalOpen(false);
      setIsLoading(false);
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = types.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(types.length / itemsPerPage);

  return (
    <div className="h-screen bg-gray-100 p-6 relative">
      <Toaster />
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Manage Types</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 shadow-md"
          >
            <BiPlus className="mr-2 text-lg" />
            Add Type
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow-md rounded-lg p-6 overflow-auto flex-grow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((type, index) => (
              <tr
                key={type._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200`}
              >
                <td className="p-4 border-t">{type.name}</td>
                <td className="p-4 border-t">{type.description}</td>
                <td className="p-4 border-t text-center">
                  <button
                    onClick={() => handleEdit(type)}
                    className="text-yellow-500 hover:text-yellow-600"
                    title="Edit"
                  >
                    <BiEdit size={20} />
                  </button>
                  <button
                    onClick={() => {
                      setDeleteId(type._id);
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-red-500 hover:text-red-600 ml-2"
                    title="Delete"
                  >
                    <BiTrash size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex items-center justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-lg shadow-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          form={form}
          setForm={setForm}
          editing={!!editingId}
        />
      )}

      {/* Modal for Delete Confirmation */}
      {isDeleteModalOpen && (
        <Modal onClose={() => setIsDeleteModalOpen(false)}>
          <div className="p-6 text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this type?
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
    </div>
  );
}
