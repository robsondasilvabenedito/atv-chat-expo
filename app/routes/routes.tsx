import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../pages/home";
import Messages from "../pages/messages";
import Create from "../pages/create";

const Stack = createNativeStackNavigator()

const Routes = () => {
    return <NavigationContainer>
        <Stack.Navigator initialRouteName="/">
            <Stack.Screen name="/" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="/messages" component={Messages} options={{headerShown: false}} />
            <Stack.Screen name="/create" component={Create} options={{headerShown: false}} />
        </Stack.Navigator>
    </NavigationContainer>
}

export default Routes
