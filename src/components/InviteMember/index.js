import React, { Component } from 'react';

import { Text, TextInput, TouchableOpacity } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MemberActions from '~/store/ducks/members';

import Modal from '~/components/Modal';

import styles from './styles';

class InviteMember extends Component {
  state = {
    email: '',
  };

  handleSubmit = () => {
    const { inviteMemberRequest, onRequestClose } = this.props;
    const { email } = this.state;

    inviteMemberRequest(email);
    onRequestClose();
  };

  closeModal = () => {
    const { onRequestClose } = this.props;
    console.log('passou');
    onRequestClose();
    console.log('passou2');

    this.setState({ email: '' });
  };

  render() {
    const { visible, onRequestClose } = this.props;
    const { email } = this.state;

    return (
      <Modal visible={visible} onRequestClose={onRequestClose}>
        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          autoFocus
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          underlineColorAndroid="transparent"
          returnKeyType="send"
          onSubmitEditing={this.handleSubmit}
          value={email}
          onChangeText={text => this.setState({ email: text })}
        />

        <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Invite</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.closeModal} style={styles.cancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(MemberActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(InviteMember);
