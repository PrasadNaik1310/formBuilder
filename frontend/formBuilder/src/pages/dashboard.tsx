import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome, {user?.email}</h2>
      <button onClick={logout}>Logout</button>

      <div style={{ marginTop: 20 }}>
        <a href="/builder">Create Form</a>
        <br />
        <a href="/forms/123">View Form</a>
      </div>
    </div>
  );
};

export default Dashboard;
