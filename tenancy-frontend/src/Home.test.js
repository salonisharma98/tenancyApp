import React from 'react';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import Home from './components/home/Home';

describe("Home", () => {
  it("should render initial layout", () => {
    const component = shallow(<Home />);
    expect(component.getElements()).toMatchSnapshot();
  });
});
