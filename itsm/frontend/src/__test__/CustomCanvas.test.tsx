import { Provider } from "react-redux";
import CustomCanvas from "../components/molecules/Offcanvas.tsx/CustomCanvas";
import { mount } from 'enzyme';
import store from "../redux/Store";
import renderer from 'react-test-renderer'

const renderWithProvider = (component:any) =>
mount(<Provider store={store}>{component}</Provider>); 

jest.mock('../components/layouts/Header/Notification', () => () => <div data-testid="mocked-notification" />);
jest.mock('../components/TicketView/View', () => () => <div data-testid="mocked-view" />);

describe('render CustomCanvas component', () => {
    it('renders without errors', () => {
        const wrapper = renderWithProvider(<CustomCanvas placement='bottom' name='bottom' convasVal={{ flag: {flag: true} }} />);
        expect(wrapper.exists()).toBe(true);
    });
    it('render canvasContainer ID in document', () => {
        const wrapper = renderWithProvider(<CustomCanvas placement='bottom' name='bottom' convasVal={{ flag: {flag: true} }}/>)
        expect(wrapper.find({"data-testid": "canvasContainer" })).toHaveLength(1);
    })
    it('should render with given state from Redux store', () => {
        const wrapper = renderer.create(
            <Provider store={store}>
                <CustomCanvas placement='bottom' name='bottom' convasVal={{ flag: {flag: true} }}/>
            </Provider>
        )
        expect(wrapper.toJSON()).toMatchSnapshot();
    });
    it('render canvasContainer ID in document', () => {
        const wrapper = renderWithProvider(<CustomCanvas placement='bottom' name='bottom' convasVal={{ flag: {flag: false} }}/>);
        expect(wrapper.find({"data-testid": "offcanvasid" })).toHaveLength(1);
    })
    it('render canvasContainer ID in document', () => {
        const wrapper = renderWithProvider(<CustomCanvas placement='bottom' name='bottom' convasVal={{ flag: {flag: true} }}/>);
        expect(wrapper.find({"data-testid": "MarkContainer" })).toHaveLength(1);
    })
    it('render canvasContainer ID in document', () => {
        const wrapper = renderWithProvider(<CustomCanvas placement='bottom' name='bottom' convasVal={{ flag: {flag: true} }}/>);
        expect(wrapper.find({"data-testid": "detailTitle" })).toHaveLength(0);
    })
})