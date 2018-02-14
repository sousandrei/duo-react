import React from 'react'
import thunk from 'redux-thunk'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'

import { loginAction } from '../../actions/auth'

import Login, { Login as LoginShallow } from './Login'

const mockStore = configureStore([thunk])

test('should render Login correctly', () => {
	const wrapper = shallow(<LoginShallow />)
	expect(wrapper).toMatchSnapshot()
})

test('should render Login correctly with store', () => {
	const store = mockStore()
	const wrapper = shallow(<Login store={store} />)
	expect(wrapper).toMatchSnapshot()
})

test('should call login on button click', () => {
	const login = jest.fn()
	const wrapper = shallow(<LoginShallow login={login} />)
	const matricula = 'C098098'
	const senha = '1234'

	wrapper.find('input[name="matricula"]')
		.simulate('change', { target: { value: matricula } })

	wrapper.find('input[name="senha"]')
		.simulate('change', { target: { value: senha } })

	wrapper.find('form')
		.simulate('submit', { preventDefault: () => { } })

	expect(login).toHaveBeenCalled()
})

test('should dispatch login on button click', () => {
	const store = mockStore()
	const wrapper = mount(<Login store={store} />)

	const matricula = 'C098098'
	const senha = '1234'

	wrapper.find('input[name="matricula"]')
		.simulate('change', { target: { value: matricula } })

	wrapper.find('input[name="senha"]')
		.simulate('change', { target: { value: senha } })

	store.subscribe(() => {
		expect(store.getActions()).toEqual([loginAction()])
	})

	wrapper.find('form')
		.simulate('submit', { preventDefault: () => { } })
})

test('should set matricula if valid input', () => {
	const value = 'C098899'
	const wrapper = shallow(<LoginShallow />)

	wrapper.find('input[name="matricula"]')
		.simulate('change', { target: { value } })

	expect(wrapper.state('matricula')).toBe(value)
})

test('should not set matricula if invalid input', () => {
	const value = 'ASDASDd'
	const wrapper = shallow(<LoginShallow />)

	wrapper.find('input[name="matricula"]')
		.simulate('change', { target: { value } })

	expect(wrapper.state('error')).toBeTruthy()
})

test('should not set senha if invalid input', () => {
	const value = 'asd'
	const wrapper = shallow(<LoginShallow />)

	wrapper.find('input[name="senha"]')
		.simulate('change', { target: { value } })

	expect(wrapper.state('error')).toBeTruthy()
})

test('should handle form focus', () => {
	const wrapper = shallow(<LoginShallow />)

	wrapper.find('input[name="senha"]')
		.simulate('focus')

	expect(wrapper.state('focused')).toBeTruthy()
})

test('should handle form blur', () => {
	const wrapper = shallow(<LoginShallow />)

	wrapper.find('input[name="senha"]')
		.simulate('blur')

	expect(wrapper.state('focused')).toBeFalsy()
})

test('should handle matricula too big', () => {
	const value = 'C321321321asd'
	const wrapper = shallow(<LoginShallow />)

	wrapper.find('input[name="matricula"]')
		.simulate('change', { target: { value } })

	expect(wrapper.state('matricula')).toEqual('')
})

test('should handle remove error on matricula last digit', () => {
	let value = 'c12312c'
	const wrapper = shallow(<LoginShallow />)

	wrapper.find('input[name="matricula"]')
		.simulate('change', { target: { value } })

	expect(wrapper.state('error')).toBeTruthy()

	value = value.slice(0, value.length - 1)

	wrapper.find('input[name="matricula"]')
		.simulate('change', { target: { value } })

	expect(wrapper.state('error')).toBeFalsy()
})

test('should handle password empty', () => {
	let value = ''
	const wrapper = shallow(<LoginShallow />)

	wrapper.find('input[name="senha"]')
		.simulate('change', { target: { value } })

	expect(wrapper.state('error')).toBeFalsy()

})

test('should handle password empty with matricula error', () => {
	let matricula = 'ccccccc'
	let senha = 'a'
	const wrapper = shallow(<LoginShallow />)

	wrapper.find('input[name="matricula"]')
		.simulate('change', { target: { value: matricula } })

	wrapper.find('input[name="senha"]')
		.simulate('change', { target: { value: senha } })

	expect(wrapper.state('error')).toBeTruthy()

})

test('should handle password error with matricula error', () => {
	let value = 'as'
	const wrapper = shallow(<LoginShallow />)

	wrapper.find('input[name="senha"]')
		.simulate('change', { target: { value } })

	expect(wrapper.state('error')).toBeTruthy()

	value = 'asasd'

	wrapper.find('input[name="senha"]')
		.simulate('change', { target: { value } })

	expect(wrapper.state('error')).toBeFalsy()

})
