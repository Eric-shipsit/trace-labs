export default function Adminbar() {
  return (
    <div className="w-full bg-slate-950 px-4 py-2 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between text-sm">
        <p className="font-semibold">Admin Panel</p>

        <div className="flex items-center gap-4">
          <a href="/admin" className="hover:underline">
            Dashboard
          </a>

          <a href="/admin/users" className="hover:underline">
            Users
          </a>

          <a href="/admin/settings" className="hover:underline">
            Settings
          </a>
        </div>
      </div>
    </div>
  );
}