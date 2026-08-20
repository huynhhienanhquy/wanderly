import { Component, type ErrorInfo, type PropsWithChildren } from 'react';
import { Pressable, Text, View } from 'react-native';
type State = { failed: boolean };
export class MobileErrorBoundary extends Component<PropsWithChildren, State> { state: State = { failed: false }; static getDerivedStateFromError(): State { return { failed: true }; } componentDidCatch(_error: Error, _info: ErrorInfo) {} render() { if (!this.state.failed) return this.props.children; return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}><Text>Đã có lỗi xảy ra.</Text><Pressable onPress={() => this.setState({ failed: false })}><Text style={{ color: '#277253', marginTop: 16 }}>Thử lại</Text></Pressable></View>; } }
