import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminRouter, AuthRouter } from "./router";
import AuthLayout from "./AuthLayout";
import AdminLayout from "./AdminLayout";

const Navigation = () => {
	return (
		<>
			<Routes>
				{AuthRouter.map((item, ind) => (
					<Route
						path={item.path}
						key={ind}
						element={
							<AuthLayout>
								<item.component />
							</AuthLayout>
						}
					/>
				))}

				{AdminRouter.map((item, ind) => (
					<Route
						path={item.path}
						key={ind}
						element={
							<AdminLayout>
								<item.component />
							</AdminLayout>
						}
					/>
				))}
			</Routes>
		</>
	);
};

export default Navigation;
