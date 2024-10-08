import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Dimensions, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/UI/CustomButton'
import FormField from '../../components/UI/FormField'
import { useGlobalContext } from '../../context/GlobalProvider'
import { getCurrentUser, signIn } from '../../lib/appwrite'

const SignIn = () => {
	const { setUser, setIsLogged } = useGlobalContext()
	const [authForm, setAuthForm] = useState({
		email: '',
		password: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const submit = async () => {
		if (authForm.email === '' || authForm.password === '') {
			Alert.alert('Ошибка', 'Пожалуйста, заполните все поля')
		}
		setIsSubmitting(true)

		try {
			await signIn(authForm.email, authForm.password)
			const result = await getCurrentUser()
			setUser(result)
			setIsLogged(true)
			router.replace('/')
		} catch (error) {
			Alert.alert('Ошибка', error.message)
		} finally {
			setIsSubmitting(false)
		}
	}
	return (
		<SafeAreaView className='bg-primary h-full'>
			<ScrollView>
				<View
					className='w-full flex justify-start min-h-[82vh] px-4 my-6'
					style={{
						minHeight: Dimensions.get('window').height - 100,
					}}
				>
					<Link href='/' className='text-lg font-psemibold text-third'>
						Назад
					</Link>
					<Text className='text-2xl font-semibold text-fourth mt-10 font-psemibold'>
						Авторизация
					</Text>
					<FormField
						title='Email'
						value={authForm.email}
						handleChangeText={e => setAuthForm({ ...authForm, email: e })}
						otherStyles='mt-7'
						keyboardType='email-address'
					/>
					<FormField
						title='Пароль'
						value={authForm.password}
						handleChangeText={e => setAuthForm({ ...authForm, password: e })}
						otherStyles='mt-7'
					/>
					<CustomButton
						title='Войти'
						handlePress={submit}
						containerStyles='mt-7'
						isLoading={isSubmitting}
						textStyles=''
					/>

					<View className='flex justify-center pt-5 flex-row gap-2'>
						<Text className='text-lg text-gray-100 font-pregular'>
							Нет аккаунта?
						</Text>
						<Link
							href='/sign-up'
							className='text-lg font-psemibold text-secondary'
						>
							Зарегистрируйся
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default SignIn
