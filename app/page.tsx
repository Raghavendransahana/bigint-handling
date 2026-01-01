"use client";
import { useState } from "react";
import { login } from "@/app/middleware/cborClient";

export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState<bigint | null>(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim() || !password.trim()) {
      setError("Please fill in both fields");
      return;
    }

    if (!/^\d+$/.test(usernameInput)) {
      setError("Username must be a numeric value (digits only)");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const usernameBigInt = BigInt(usernameInput);
      const response = await login(usernameBigInt, password);
      if (response.success && response.username) {
        setLoggedInUser(response.username);
      } else {
        setError(response.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Login failed. Make sure you've signed up first!");
    } finally {
      setIsLoading(false);
    }
  };

  if (loggedInUser) {
    return (
      <div className="flex flex-col h-lvh items-center justify-center">
        <p className="text-9xl">HAI</p>
        <button 
          onClick={() => setLoggedInUser(null)}
          className="mt-8 px-4 py-2 bg-gray-200 rounded"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: 480, 
      margin: "40px auto", 
      padding: 24,
      fontFamily: "system-ui, sans-serif"
    }}>
      <h1 style={{ marginBottom: 8 }}> Login</h1>
      <p style={{ color: "#666", marginBottom: 24 }}>
        Sign in with your BigInt username
      </p>
      
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
            Username (BigInt)
          </label>
          <input
            type="text"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            placeholder="e.g., 123456789012345678901234567890"
            style={{
              width: "100%",
              padding: "12px 14px",
              fontSize: 14,
              border: "2px solid #e0e0e0",
              borderRadius: 8,
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.2s"
            }}
            onFocus={(e) => e.target.style.borderColor = "#0070f3"}
            onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
          />
          <small style={{ color: "#888", marginTop: 4, display: "block" }}>
            Enter the same numeric username you used during signup
          </small>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={{
              width: "100%",
              padding: "12px 14px",
              fontSize: 14,
              border: "2px solid #e0e0e0",
              borderRadius: 8,
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.2s"
            }}
            onFocus={(e) => e.target.style.borderColor = "#0070f3"}
            onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
          />
        </div>

        {error && (
          <div style={{ 
            marginBottom: 16, 
            padding: 12, 
            borderRadius: 8,
            backgroundColor: "#fee2e2",
            color: "#dc2626",
            border: "1px solid #fecaca"
          }}>
             {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "14px 16px",
            fontSize: 16,
            fontWeight: 600,
            backgroundColor: isLoading ? "#94a3b8" : "#0070f3",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: isLoading ? "not-allowed" : "pointer",
            transition: "background-color 0.2s"
          }}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={{ marginTop: 24, textAlign: "center", color: "#666" }}>
        Don&apos;t have an account?{" "}
        <a href="/signup" style={{ color: "#0070f3", textDecoration: "none", fontWeight: 500 }}>
          Sign up →
        </a>
      </p>
    </div>
  );
}
