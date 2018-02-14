import React from 'react'
import { shallow } from 'enzyme'

import Loading from './Loading'


test('should render LoadingPage correctly', () => {
	const wrapper = shallow(<Loading />)
	expect(wrapper).toMatchSnapshot()
})

