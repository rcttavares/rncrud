import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserForm from './views/UserForm';
import UserList from './views/UserList';
import { Button, Icon } from 'react-native-elements';
import { UsersProvider } from './context/UsersContext';
import FlashMessage from 'react-native-flash-message';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <UsersProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="UserList"
          screenOptions={screenOptions}
        >
          <Stack.Screen
            name="UserForm"
            component={UserForm}
            options={{ title: 'Formulário de Usuário' }}
          />
          <Stack.Screen
            name="UserList"
            component={UserList}
            options={({ navigation }) => {
              return {
                title: 'Lista de Usuários',
                headerRight: () => (
                  <Button
                    type="clear"
                    icon={<Icon name="add" size={25} color="white" />}
                    onPress={() => navigation.navigate('UserForm')}
                  />
                ),
              };
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="bottom" />
    </UsersProvider>
  );
};

const screenOptions = {
  headerStyle: {
    backgroundColor: '#5499C7',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
