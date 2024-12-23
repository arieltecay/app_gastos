import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";

import { CiMoneyBill } from "react-icons/ci";
import { logout } from "../../redux/slice/authSlice";
import MenuAcordeon from "./MenuAcordeon";

export default function PrivateNavbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logoutHandler = () => {
		dispatch(logout());
		localStorage.removeItem("userInfo");
		navigate("/login");
	};
	return (
		<Disclosure as="nav" className="bg-white">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex h-16 justify-between items-center">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<CiMoneyBill className="h-8 w-auto text-green-500" />
								</div>
								<div className="hidden md:flex md:space-x-8">
									<Link
										to="/"
										className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
									>
										LoansTuc
									</Link>
{/* 									<MenuAcordeon
										title="Préstamos"
										optionLink={[
											{ label: "Agregar saldo", linkTo: "/loans/add-money", iconKey: "bankDolar" },
											{ label: "Agregar clientes", linkTo: "/loans/add-client", iconKey: "pencil" },
											{ label: "Calculadora de préstamos", linkTo: "/calc-loans", iconKey: "calculator" },
											{ label: "Información saldo", linkTo: "/status-account", iconKey: "informationCircle" },
											{ label: "Información cliente", linkTo: "/info-client", iconKey: "userClient" },
										]}
									/> */}
									<Link
										to="/add-transaction"
										className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
									>
										Add Transaction
									</Link>
									<Link
										to="/add-category"
										className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
									>
										Add Category
									</Link>
									<Link
										to="/categories"
										className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
									>
										Categories
									</Link>
									<Link
										to="/profile"
										className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
									>
										Profile
									</Link>
									<Link
										to="/dashboard"
										className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
									>
										Dashboard
									</Link>
								</div>
							</div>
							<div className="hidden md:flex items-center">
								<button
									onClick={logoutHandler}
									type="button"
									className="relative m-2 inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
								>
									<IoLogOutOutline className="h-5 w-5" aria-hidden="true" />
									<span>Logout</span>
								</button>
							</div>
							<div className="-mr-2 flex md:hidden">
								<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
						</div>
					</div>

					<div className={`${open ? 'block' : 'hidden'} md:hidden`}>
						<div className="space-y-1 pb-3 pt-2">
							<Link to="/" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6">
								LoansTuc
							</Link>
							<MenuAcordeon
								title="Préstamos"
								optionLink={[
									{ label: "Agregar saldo", linkTo: "/loans/add-money", iconKey: "bankDolar" },
									{ label: "Agregar clientes", linkTo: "/add-client", iconKey: "pencil" },
									{ label: "Calculadora de préstamos", linkTo: "/calc-loans", iconKey: "calculator" },
									{ label: "Información saldo", linkTo: "/status-account", iconKey: "informationCircle" },
									{ label: "Información cliente", linkTo: "/info-client", iconKey: "userClient" },
								]}
							/>
							<Link to="/add-transaction" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6">
								Add Transaction
							</Link>
							<Link to="/add-category" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6">
								Add Category
							</Link>
							<Link to="/categories" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6">
								Categories
							</Link>
							<Link to="/profile" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6">
								Profile
							</Link>
							<Link to="/dashboard" className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6">
								Dashboard
							</Link>
						</div>
						<div className="border-t border-gray-200 pb-3 pt-4">
							<div className="mt-3 space-y-1">
								<button
									onClick={logoutHandler}
									className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
								>
									Sign out
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</Disclosure>
	);
}