import AuthCheck from "@/app/components/admin-panel/AuthCheck";

export default function KaryawanPage() {
  return (
    <div>
      <AuthCheck role="karyawan" />
      <h1>Karyawan Dashboard</h1>
      <p>Welcome, Karyawan!</p>
    </div>
  );
}