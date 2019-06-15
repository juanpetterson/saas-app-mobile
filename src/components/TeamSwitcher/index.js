import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, TouchableOpacity, Image } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TeamsActions from '~/store/ducks/teams';
import AuthActions from '~/store/ducks/auth';

import Icon from 'react-native-vector-icons/MaterialIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';

import NewTeam from '~/components/NewTeam';

import styles from './styles';

class TeamSwitcher extends Component {
  static propTypes = {
    getTeamsRequest: PropTypes.func.isRequired,
    teams: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  state = {
    isModalOpen: false,
  };

  componentDidMount() {
    const { getTeamsRequest } = this.props;

    getTeamsRequest();
  }

  toggleModalOpen = () => {
    this.setState({ isModalOpen: true });
  };

  toggleModalClosed = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { teams, selectTeam, signOut } = this.props;
    const { isModalOpen } = this.state;

    return (
      <View style={styles.container}>
        {teams.data.map(team => (
          <TouchableOpacity
            key={team.id}
            style={styles.teamContainer}
            onPress={() => selectTeam(team)}
          >
            <Image
              style={styles.teamAvatar}
              source={{
                uri: `https://ui-avatars.com/api/?font-size=0.33&background=7159c1&color=fff&name=${
                  team.name
                }`,
              }}
            />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.newTeam} onPress={this.toggleModalOpen}>
          <Icon name="add" size={24} color="#999" />
        </TouchableOpacity>
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
            <SimpleIcon name="logout" size={24} color="#e04848" />
          </TouchableOpacity>
        </View>
        <NewTeam visible={isModalOpen} onRequestClose={this.toggleModalClosed} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...TeamsActions, ...AuthActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamSwitcher);
