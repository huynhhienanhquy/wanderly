import { fireEvent, render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Button, Card } from './ui';

describe('mobile UI primitives', () => {
  it('renders card content and handles the primary action', () => {
    const onPress = jest.fn();
    const screen = render(<Card><Text>Lịch trình hôm nay</Text><Button onPress={onPress}>Tạo kế hoạch</Button></Card>);
    fireEvent.press(screen.getByRole('button', { name: 'Tạo kế hoạch' }));
    expect(screen.getByText('Lịch trình hôm nay')).toBeVisible();
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
