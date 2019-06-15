import React, { Component } from 'react';

import { View, Text, TouchableOpacity, Switch } from 'react-native';
import api from '~/services/api';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MembersActions from '~/store/ducks/members';

import Modal from '~/components/Modal';
import Can from '~/components/Can';

import styles from './styles';

class RoleUpdater extends Component {
  state = {
    roles: [],
  }

  async componentDidMount() {
    const response = await api.get('roles');

    this.setState({ roles: response.data });
  }

  closeModal = () => {
    const { onRequestClose } = this.props;

    onRequestClose();
  };

  handleRoleChange = (value, role) => {
    const { updateMemberRequest, onRequestClose, member } = this.props;

    const roles = value
      ? [...member.roles, role]
      : member.roles.filter(memberRole => memberRole.id !== role.id);

    updateMemberRequest(member.id, roles);
    onRequestClose();
  }

  render() {
    const { visible, onRequestClose, member } = this.props;
    const { roles } = this.state;
    return (
      <Modal visible={visible} onRequestClose={onRequestClose}>
        <View>
          { roles.map(role => (
            <View key={role.id} style={styles.roleContainer}>
              <Text style={styles.roleText}>{role.name}</Text>
              <Switch
                value={!!member.roles.find(memberRole => memberRole.id === role.id)} 
                onValueChange={value => this.handleRoleChange(value, role)}
              />
            </View>
          )) }
        </View>
        <TouchableOpacity onPress={this.closeModal} style={styles.cancel}>
          <Text style={styles.cancelText}>Back</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(MembersActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(RoleUpdater);
