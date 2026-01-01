"use client";
import { useState } from "react";
import { signup } from "@/app/middleware/cborClient";
import { AuthResponseDTO } from "@/app/dto";
import { ERRORS } from "@/app/utils/errors";

export default function SignupPage() {
  const [state, setState] = useState({
    usernameInput: "",
    password: "",
    result: null as AuthResponseDTO | null,
    isLoading: false,
    error: null as string | null,
  });

  const { usernameInput, password, result, isLoading, error } = state;

  const setError = (error: string | null) => setState(prev => ({ ...prev, error }));
  const setIsLoading = (isLoading: boolean) => setState(prev => ({ ...prev, isLoading }));
  const setResult = (result: AuthResponseDTO | null) => setState(prev => ({ ...prev, result }));
  const setUsernameInput = (usernameInput: string) => setState(prev => ({ ...prev, usernameInput }));
  const setPassword = (password: string) => setState(prev => ({ ...prev, password }));

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim() || !password.trim()) {
      setError(ERRORS.EMPTY_FIELDS);
      return;
    }
    if (!/[^\w\s]/.test(password)) {
      setError(ERRORS.SPECIAL_CHAR_REQUIRED);
      return;
    }

    if (!/^\d+$/.test(usernameInput)) {
      setError(ERRORS.USERNAME_NUMERIC);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setResult(null);
      const usernameBigInt = BigInt(usernameInput);
      const response = await signup(usernameBigInt, password);
      setResult(response);
    } catch (err) {
      console.error(err);
      setError(ERRORS.SIGNUP_FAILED);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: 480, 
      margin: "40px auto", 
      padding: 24,
      fontFamily: "system-ui, sans-serif"
    }}>
      <h1 style={{ marginBottom: 8 }}>Signup</h1>
      <p style={{ color: "#666", marginBottom: 24 }}>
       Bigint working!
      </p>
      
      <form onSubmit={handleSignup}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 600 }}>
            Username 
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
          />
          <p style={{ color: "#888", marginTop: 4, display: "block" }}>
            Enter a large numeric value.
          </p>
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
          {isLoading ? "Signing up..." : "Create Account"}
        </button>
      </form>

      {result && result.success && (
        <div style={{ 
          marginTop: 20, 
          padding: 16, 
          borderRadius: 8,
          backgroundColor: "#dcfce7",
          border: "1px solid #86efac"
        }}>
          <p style={{ fontWeight: 600, color: "#166534", margin: 0 }}>
            Account created successfully.I hope you remember your credentials
          </p>
          
        </div>
      )}

      {result && !result.success && (
        <div style={{ 
          marginTop: 20, 
          padding: 16, 
          borderRadius: 8,
          backgroundColor: "#fee2e2",
          border: "1px solid #fecaca"
        }}>
          <p style={{ fontWeight: 600, color: "#dc2626", margin: 0 }}>
             {result.message || "Signup failed"}
          </p>
        </div>
      )}

      <p style={{ marginTop: 24, textAlign: "center", color: "#666" }}>
        Already have an account?{" "}
        <a href="/" style={{ color: "#0070f3", textDecoration: "none", fontWeight: 500 }}>
          Login
        </a>
      </p>
    </div>
  );
}
