import * as SecureStore from 'expo-secure-store';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import SettingsScreen from '../app/settings';
import { OfflineNotice } from './offline-notice';
import { AppThemeProvider } from './theme';

describe('accessibility smoke', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(SecureStore.getItemAsync).mockResolvedValue(null);
    jest.mocked(SecureStore.setItemAsync).mockResolvedValue(undefined);
  });

  it('exposes real settings controls with names and switch state', async () => {
    const screen = render(<AppThemeProvider><SettingsScreen /></AppThemeProvider>);
    expect(screen.getByRole('header', { name: 'Cài đặt' })).toBeVisible();
    const themeSwitch = screen.getByRole('switch', { name: 'Giao diện tối' });
    expect(themeSwitch).toHaveAccessibilityState({ checked: false });
    fireEvent.press(themeSwitch);
    await waitFor(() => expect(screen.getByRole('switch', { name: 'Giao diện tối' })).toHaveAccessibilityState({ checked: true }));
  });

  it('announces the real offline notice as an alert', () => {
    const screen = render(<OfflineNotice visible />);
    expect(screen.getByRole('alert')).toHaveTextContent('Bạn đang ngoại tuyến');
  });
});
