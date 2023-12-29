import { fireEvent, screen, render as rtlrender } from "@testing-library/react";
import { Provider } from 'react-redux';
import Notification from '../components/layouts/Header/Notification';
import store from '../redux/Store';
import renderer from 'react-test-renderer'

const renderWithProvider = (component:any) =>
  rtlrender(<Provider store={store}>{component}</Provider>);

describe('Notification component', () => {
  const notifications = [
    {
      id: 1,
      username: "Karteek Vemula",
      ticketID: "TSK101233792",
      ticketActivity: "24th May 2023 5:17 PM",
      ticketStatus: "Open",
      dateTime: "Just now",
      action: "Mark as read",
      read: false
    }
  ];
  
  it('render notificationContainer ID in the document', () => {
    const wrapper = renderWithProvider(<Notification notifications= {notifications}/>);
    const ntfcContainer = wrapper.getByTestId("notificationContainer");
    expect(ntfcContainer).toBeInTheDocument();
  });
  it('Verify that each notification item is rendered correctly', () => {
    const wrapper = renderWithProvider(<Notification notifications= {notifications}/>);
    const notificationItems = wrapper.getAllByTestId('notificationItem');
    expect(notificationItems).toHaveLength(notifications.length);
  })
  it('Verify the correct class is applied based on the read status and field', () => {
    const wrapper = renderWithProvider(<Notification notifications= {notifications}/>);
    const notificationItems = wrapper.getAllByTestId('notificationItem');
    notifications.forEach((notification, index) => {
      const notificationItem = notificationItems[index];

      // Verify correct class is applied or not //
      const expectedClass = notification.read ? 'notification-list' : 'notification-list markas-not-read';
      expect(notificationItem).toHaveClass(expectedClass);

      // Verify username in the document //
      const usernameElement = screen.getByText(notification.username);
      expect(usernameElement).toBeInTheDocument();
      // Verify ticketID in the document //
      const ticketIdElement = screen.getByText(notification.ticketID);
      expect(ticketIdElement).toBeInTheDocument();
      // Verify ticketActivity in the document //
      const ticketActivityElement = screen.getByText(notification.ticketActivity);
      expect(ticketActivityElement).toBeInTheDocument();
      // Verify ticketStatus in the document //
      const ticketStatusElement = screen.getByText(notification.ticketStatus);
      expect(ticketStatusElement).toBeInTheDocument();
    });
  });
  it('should handle read action', () => {
    const wrapper = renderWithProvider(<Notification notifications= {notifications}/>);
    const markReadAction = wrapper.getByTestId('markReadButton');
    expect(markReadAction).toBeInTheDocument();
  });
  it('should call handleRead function on button click', () => {
    const wrapper = renderWithProvider(<Notification notifications={notifications} />);
    const markReadButton = wrapper.getByTestId('markReadButton');
    expect(fireEvent.click(markReadButton)).toBeTruthy()
  });
  it('should render with given state from Redux store', () => {
    const wrapper = renderer.create(
        <Provider store={store}>
            <Notification notifications={notifications} />
        </Provider>
    )
    expect(wrapper.toJSON()).toMatchSnapshot();
});
});