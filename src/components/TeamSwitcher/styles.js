import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { colors } from '~/styles';
import { BottomTabBar } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundDarker,
    paddingHorizontal: 10,
    paddingTop: getStatusBarHeight() + 25,
  },

  teamContainer: {
    marginBottom: 10,
  },

  teamAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  newTeam: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  logoutButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.exit,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  logoutContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default styles;
