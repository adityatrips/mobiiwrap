"use client";

import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import jwt from "jsonwebtoken";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const checkAuthenticated = async () => {
			const token = JSON.parse(window.localStorage.getItem("token"));

			if (token) {
				const user = jwt.decode(token);

				setUser(user);
				setIsAuthenticated(true);
			}
		};

		checkAuthenticated();
	}, []);

	const loginUser = async (email, password) => {
		setLoading(true);
		try {
			const response = await axios.post("/api/user/login", {
				email,
				password,
			});
			window.localStorage.setItem("token", JSON.stringify(response.data.token));
			setUser(response.data);
			setIsAuthenticated(true);
		} catch (error) {
			console.error(`Error logging in: ${error}`);
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	const registerUser = async (name, email, password) => {
		setLoading(true);
		try {
			await axios.post("/api/user/register", {
				name,
				email,
				password,
			});
		} catch (error) {
			console.error(`Error logging in: ${error}`);
		} finally {
			setLoading(false);
		}
	};

	const logoutUser = async () => {
		setUser(null);
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated,
				error,
				loading,
				loginUser,
				registerUser,
				logoutUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
