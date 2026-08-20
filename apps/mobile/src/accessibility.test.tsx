import { render } from '@testing-library/react-native'; import { Text } from 'react-native';
describe('accessibility smoke', () => { it('keeps named content discoverable', () => { const screen = render(<Text accessibilityRole="header">Wanderly</Text>); expect(screen.getByRole('header', { name: 'Wanderly' })).toBeTruthy(); }); });
