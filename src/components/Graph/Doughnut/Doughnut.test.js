import React from 'react'
import { shallow } from 'enzyme'

import Doughnut from './Doughnut'

test('should render Doughnut correctly', () => {
	const wrapper = shallow(<Doughnut  />)
	expect(wrapper).toMatchSnapshot()
})
