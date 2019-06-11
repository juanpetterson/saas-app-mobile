import React, { Component } from 'react';

import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import styles from './styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import MembersActions from '~/store/ducks/members';

class Members extends Component {
  componentDidMount() {
    const { getMembersRequest, activeTeam } = this.props;

    if (activeTeam) {
      getMembersRequest();
    }
  }

  render() {
    const { members } = this.props;

    return (
      <View style={styles.container} >
        <Text style={styles.title}>MEMBERS</Text>

        <FlatList
          style={styles.memberList}
          data={members.data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.memberContainer} >
              <Text style={styles.memberName}>{item.user.name}</Text>
              
              <TouchableOpacity hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }} onPress={() => {}} >
                <Icon name="settings" size={20} color="#b0b0b0" />
              </TouchableOpacity>
            </View>
          )}
          ListFooterComponent={() => (
            <TouchableOpacity style={styles.button} onPress={() => {}} >
              <Text style={styles.buttonText}>Invite</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  members: state.members,
  activeTeam: state.teams.active,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(MembersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Members);
