import React from 'react'
import thunk from 'redux-thunk'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { logoutAction } from '../../actions/auth'

import Header, { Header as HeaderShallow } from './Header'

const mockStore = configureStore([thunk])

test('should render correctly', () => {
	const wrapper = shallow(<HeaderShallow />)
	expect(wrapper).toMatchSnapshot()
})

test('should render correctly with store', () => {
	const store = mockStore()
	const wrapper = shallow(<Header store={store} />)
	expect(wrapper).toMatchSnapshot()
})

test('should dispatch logout', () => {
	const store = mockStore()
	const wrapper = mount(<Header store={store} />)

	store.subscribe(() => {
		expect(store.getActions()).toEqual([logoutAction()])
	})

	wrapper.find('button')
		.last()
		.simulate('click')

})

test('should change path on click', () => {
	const store = mockStore()
	const wrapper = mount(<Header store={store} />)

	wrapper.find('MenuItem')
		.first()
		.simulate('click')

	expect(location.href.split('/')[3]).toEqual('dashboard')
})
