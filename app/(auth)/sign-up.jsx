import { Link, router } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Dimensions, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/UI/CustomButton'
import FormField from '../../components/UI/FormField'
// import { images } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider'
import { createUser } from '../../lib/appwrite'

const SignUp = () => {
	const { setUser, setIsLogged } = useGlobalContext()

	const [userForm, setUserForm] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		phone_number: '',
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	const submit = async () => {
		if (
			userForm.first_name === '' ||
			userForm.last_name === '' ||
			userForm.email === '' ||
			userForm.password === '' ||
			userForm.phone_number === ''
		) {
			Alert.alert('Ошибка', 'Пожалуйста, заполните все поля')
		}
		setIsSubmitting(true)

		try {
			const result = await createUser(userForm)
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
					{/* <Image
      source={images.logo}
      resizeMode='contain'
      className='w-[115px] h-[34px]'
     /> */}
					<Link href='/' className='text-lg font-psemibold text-secondary'>
						Назад
					</Link>
					<Text className='text-2xl font-semibold text-white mt-10 font-psemibold'>
						Регистрация
					</Text>

					<FormField
						title='Имя'
						value={userForm.first_name}
						handleChangeText={e => setUserForm({ ...userForm, first_name: e })}
						otherStyles='mt-7'
						placeholder=''
					/>
					<FormField
						title='Фамилия'
						value={userForm.last_name}
						handleChangeText={e => setUserForm({ ...userForm, last_name: e })}
						otherStyles='mt-7'
						placeholder=''
					/>
					<FormField
						title='Email'
						value={userForm.email}
						handleChangeText={e => setUserForm({ ...userForm, email: e })}
						otherStyles='mt-7'
						placeholder=''
						keyboardType='email-address'
					/>
					<FormField
						title='Пароль'
						value={userForm.password}
						handleChangeText={e => setUserForm({ ...userForm, password: e })}
						otherStyles='mt-7'
						placeholder=''
					/>
					<FormField
						title='Номер телефона'
						value={userForm.phone_number}
						handleChangeText={e =>
							setUserForm({ ...userForm, phone_number: e })
						}
						otherStyles='mt-7'
						placeholder=''
					/>
					<CustomButton
						title='Зарегистрироваться'
						handlePress={submit}
						containerStyles='mt-7'
						isLoading={isSubmitting}
						textStyles=''
					/>

					<View className='flex justify-center pt-5 flex-row gap-2'>
						<Text className='text-lg text-gray-100 font-pregular'>
							Уже есть аккаунт?
						</Text>
						<Link
							href='/sign-in'
							className='text-lg font-psemibold text-secondary'
						>
							Войдите
						</Link>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default SignUp
