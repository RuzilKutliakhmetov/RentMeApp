import { createContext, useContext, useEffect, useState } from 'react'
import { filtersDefaultState } from '../constants/defaultState'
import { getCurrentUser } from '../lib/appwrite'

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

export default GlobalProvider = ({ children }) => {
	const [isLogged, setIsLogged] = useState(false)
	const [user, setUser] = useState(null)
	const [isLoading, setLoading] = useState(true)
	const [searchFilter, setSearchFilter] = useState(filtersDefaultState)

	useEffect(() => {
		getCurrentUser()
			.then(res => {
				if (res) {
					setIsLogged(true)
					setUser(res)
				} else {
					setIsLogged(false)
					setUser(null)
				}
			})
			.catch(error => {
				console.log(error)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [])
	return (
		<GlobalContext.Provider
			value={{
				isLogged,
				setIsLogged,
				user,
				setUser,
				isLoading,
				searchFilter,
				setSearchFilter,
			}}
		>
			{children}
		</GlobalContext.Provider>
	)
}
