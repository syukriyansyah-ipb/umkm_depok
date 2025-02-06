export default function Unauthorized() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-600">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Unauthorized</h1>
          <p className="text-gray-600">
            You do not have permission to view this page.
          </p>
          <a
            href="/login"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }