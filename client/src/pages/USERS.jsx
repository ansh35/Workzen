import { useEffect, useState } from "react";
import axios from "../api/Axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          "api/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUsers(res.data.users);
      } catch (err) {
        setError("Failed to load users");
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="min-h-screen p-8 text-white bg-gradient-to-br from-[#05070d] via-[#0a0f1e] to-black">
      <h2 className="text-2xl font-semibold mb-6">Manage Users</h2>

      {error && <p className="text-red-400">{error}</p>}

      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        {users.length === 0 ? (
          <p className="text-gray-400">No users found</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="flex justify-between items-center border-b border-white/10 pb-2"
              >
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>

                <span className="text-sm px-3 py-1 bg-blue-600 rounded-lg">
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;