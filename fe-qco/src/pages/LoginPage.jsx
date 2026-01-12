import { useState } from "react";
import { loginAPI } from "../api/userAPI";

const LoginPage = () => {
  const [userSignId, setUserSignId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await loginAPI({
        userSignId,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setMessage("Đăng nhập thành công");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Không kết nối được server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{}}>
      <h2>Đăng nhập</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>User Sign ID</label>
          <br />
          <input
            type="text"
            value={userSignId}
            onChange={(e) => setUserSignId(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
