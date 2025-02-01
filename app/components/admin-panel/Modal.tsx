import React from "react";
import { X } from "lucide-react"; // Menggunakan ikon X dari lucide-react

type Props = {
  onClose: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  form?: { name: string; description: string };
  setForm?: React.Dispatch<
    React.SetStateAction<{ name: string; description: string }>
  >;
  editing?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
  title?: string; // Header Title
};

export default function Modal({
  onClose,
  onSubmit,
  form,
  setForm,
  editing,
  isLoading,
  children,
  title = "Modal Title", // Default header title
}: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute -top-6 right-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 z-50"
        aria-label="Close"
        style={{ transform: "translate(50%, -50%)" }}
      >
        <X className="w-5 h-5" />
      </button>

      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative mx-4">
        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {onSubmit && form && setForm ? (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          ) : (
            children
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          {onSubmit && (
            <button
              type="submit"
              onClick={onSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          )}
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="spinner-border animate-spin border-4 border-t-4 border-blue-500 rounded-full w-10 h-10"></div>
          </div>
        )}
      </div>
    </div>
  );
}
