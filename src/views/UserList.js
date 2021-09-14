import React, { useContext } from 'react';
import { Alert, FlatList, View } from 'react-native';
import { Avatar, Button, Icon, ListItem } from 'react-native-elements';
import UsersContext from '../context/UsersContext';
import { showMessage } from 'react-native-flash-message';

export default (props) => {
  const { state, dispatch } = useContext(UsersContext);

  function confirmUserDeletion(user) {
    Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
      {
        text: 'Sim',
        onPress() {
          dispatch({
            type: 'deleteUser',
            payload: user,
          });
          showMessage({
            message: `${user.name} foi excluido.`,
            type: 'success',
          });
        },
      },
      {
        text: 'Não',
      },
    ]);
  }

  function getActions(user) {
    return (
      <>
        <Button
          type="clear"
          icon={<Icon name="edit" size={25} color="blue" />}
          onPress={() => props.navigation.navigate('UserForm', user)}
        />
        <Button
          type="clear"
          icon={<Icon name="delete" size={25} color="red" />}
          onPress={() => confirmUserDeletion(user)}
        />
      </>
    );
  }

  function getUserItem({ item: user }) {
    return (
      <ListItem key={user.id} bottomDivider>
        <Avatar rounded title={user.name[0]} source={{ uri: user.avatarUrl }} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        {getActions(user)}
      </ListItem>
    );
  }

  return (
    <View>
      <FlatList
        data={state.Users}
        keyExtractor={(user) => user.id.toString()}
        renderItem={getUserItem}
      />
    </View>
  );
};
