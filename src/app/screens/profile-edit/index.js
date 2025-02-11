import React, { useEffect, useState } from 'react';

import { showMessage } from 'react-native-flash-message';
import notification from 'configs/notification';

import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import useTheme from 'hooks/use-theme';

import { useDispatch, useSelector } from 'react-redux';
import { Creators as ActionProfile } from 'ducks/profile';

import IconMaterial from 'react-native-vector-icons/MaterialIcons';

import { BaseScreen, Typography, Header, Tabs, If } from 'components';
import { HeaderInformations, SaveButton, Content } from './styles';

import Informations from './informations';
import Games from './games';

// TODO: IMRPOVE THIS COMPONENT CREATING CONTEXT TO CONTROLL THIS LOGICS
const ProfileEdit = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const userId = useSelector(state => state.auth.user.id);
  const loading = useSelector(state => state.profile.isLoading);
  const currentUser = useSelector(state => state.profile.edit);
  const currentGames = useSelector(state => state.profile.edit.games);
  const currentSelectedGames = useSelector(
    state => state.profile.edit.selectedGames,
  );
  const currentSelectedPositions = useSelector(
    state => state.profile.edit.selectedPositions,
  );

  const [hasError, setHasError] = useState(false);

  const [currentTab, setCurrentTab] = useState('information');
  const [user, setUser] = useState(currentUser);

  const [games, setGames] = useState(currentGames);
  const [selectedGames, setSelectedGames] = useState(currentSelectedGames);
  const [selectedPositions, setSelectedPositions] = useState(
    currentSelectedPositions,
  );

  useEffect(() => {
    dispatch(ActionProfile.getAllGamesRequest());
    dispatch(ActionProfile.getProfileEditRequest({ id: userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    setUser(currentUser);
    setGames(currentGames);
    setSelectedGames(currentSelectedGames);
    setSelectedPositions(currentSelectedPositions);
  }, [
    currentUser,
    currentGames,
    currentSelectedGames,
    currentSelectedPositions,
  ]);

  const validateUserInformations = () => {
    const ignoredKeys = ['region', 'newAvatar', 'avatar'];
    const parseUserObjectToArray = Object.entries(user);

    const filteredUser = parseUserObjectToArray
      .filter(([key]) => !ignoredKeys.includes(key))
      .filter(([key, value]) => value === '');

    return filteredUser.length === 0;
  };

  const validateGames = () => {
    const filteredEmptyFields = games.filter(game => {
      const filteredPositions = game.positions.filter(
        position => !position.description,
      );

      if (
        game.game.description &&
        game.ranking.description &&
        filteredPositions.length === 0
      ) {
        return false;
      }

      return true;
    });

    return filteredEmptyFields.length === 0;
  };

  const handleSaveUpdate = () => {
    const {
      id,
      email,
      name,
      nickname,
      birthDate,
      region,
      gender,
      newAvatar,
      avatar,
    } = user;
    const validatedGames = validateGames();
    const validatedUserInformations = validateUserInformations();

    if (validatedGames && validatedUserInformations) {
      dispatch(
        ActionProfile.updateProfileRequest({
          id,
          email,
          name,
          nickname,
          birthDate,
          region,
          gender,
          newAvatar,
          avatar,
          games,
        }),
      );
      setHasError(false);
      showMessage({
        ...notification,
        duration: 2000,
        backgroundColor: theme.colors.actions.blue,
        message: 'Aeee! 🎉',
        description: 'Dados atualizados!',
      });
      return;
    }

    showMessage({
      ...notification,
      duration: 3000,
      description: 'Houve um problema nos dados inseridos, você pode conferir?',
    });
    setHasError(true);
  };

  const handleChangeUser = (field, value) => {
    setUser(oldUser => ({
      ...oldUser,
      [field]: value,
    }));
  };

  const handleChangeBirthDateUser = value => {
    const formattedBirthDate = format(value, 'dd/MM/yyyy', {
      locale: pt,
    });

    setUser(oldUser => ({
      ...oldUser,
      birthDate: formattedBirthDate,
    }));
  };

  const handleAddMoreGame = game => {
    setGames(oldGame => [...oldGame, game]);
  };

  const handleAddMorePosition = (position, index) => {
    setGames(oldGame => {
      const newGame = oldGame;
      newGame[index].positions = [...newGame[index].positions, position];

      return [...newGame];
    });
  };

  const handleUpdateGameOrRanking = (index, field, value) => {
    if (field === 'game' && games[index].game.description === '') {
      setSelectedGames(selectedGames.concat(value.description));
    }

    if (field === 'game' && games[index].game.description !== '') {
      setSelectedGames(oldSelectedGames => {
        const filteredSelectedGames = oldSelectedGames.filter(
          selectedGame => selectedGame !== games[index].game.description,
        );
        const addNewSelectedGame = filteredSelectedGames.concat(
          value.description,
        );

        return [...addNewSelectedGame];
      });
    }

    setGames(oldGame => {
      const newGame = oldGame;
      newGame[index][field] = value;

      return [...newGame];
    });
  };

  const handleUpdatePosition = (indexGame, indexPosition, value) => {
    if (games[indexGame].positions[indexPosition].description === '') {
      setSelectedPositions(selectedPositions.concat(value.description));
    }

    if (games[indexGame].positions[indexPosition].description !== '') {
      setSelectedPositions(oldSelectedPosition => {
        const filteredSelectedPositions = oldSelectedPosition.filter(
          selectedGame =>
            selectedGame !==
            games[indexGame].positions[indexPosition].description,
        );
        const addNewSelectedGame = filteredSelectedPositions.concat(
          value.description,
        );

        return [...addNewSelectedGame];
      });
    }

    setGames(oldGame => {
      const newGame = oldGame;
      newGame[indexGame].positions[indexPosition] = value;

      return [...newGame];
    });
  };

  const removeGames = gameIndex => {
    if (games[gameIndex].game.description !== '') {
      const filteredGame = selectedGames.filter(
        selectedGame => selectedGame !== games[gameIndex].game.description,
      );

      setSelectedGames(filteredGame);
    }

    if (games[gameIndex].positions.length !== 0) {
      games[gameIndex].positions.forEach(position => {
        if (position.description !== '') {
          setSelectedPositions(
            selectedPositions.filter(
              selectedPosition => selectedPosition !== position.description,
            ),
          );
        }
      });
    }

    setGames(oldGames => {
      oldGames.splice(gameIndex, 1);
      return [...oldGames];
    });
  };

  const removePosition = (gameIndex, positionIndex) => {
    const currentPosition =
      games[gameIndex].positions[positionIndex].description;

    if (currentPosition !== '') {
      setSelectedPositions(
        selectedPositions.filter(
          selectedPosition => selectedPosition !== currentPosition,
        ),
      );
    }

    setGames(oldGames => {
      oldGames[gameIndex].positions.splice(positionIndex, 1);
      return [...oldGames];
    });
  };

  return (
    <BaseScreen
      loading={loading}
      hasScroll={false}
      statusBarBackground={theme.colors.primary.dark}>
      <Header hasBackButton>
        <HeaderInformations>
          <Typography font="bold" size="h4" color="contrast">
            Editar Perfil
          </Typography>
          <SaveButton onPress={() => handleSaveUpdate()}>
            <IconMaterial
              name="check"
              size={20}
              color={theme.colors.primary.contrast}
            />
          </SaveButton>
        </HeaderInformations>
      </Header>
      <Tabs
        initialTab="information"
        onChange={tab => setCurrentTab(tab)}
        tabs={[
          { key: 'information', title: 'Pessoal' },
          { key: 'games', title: 'Jogos' },
        ]}
      />
      <Content>
        <If test={currentTab === 'information'}>
          <Informations
            user={user}
            setBirthDate={handleChangeBirthDateUser}
            setUser={(field, value) => handleChangeUser(field, value)}
            hasError={hasError}
          />
        </If>
        <If test={currentTab === 'games'}>
          <Games
            games={games}
            addMoreGame={game => handleAddMoreGame(game)}
            removeGames={indexGame => removeGames(indexGame)}
            removePosition={(indexGame, indexPosition) =>
              removePosition(indexGame, indexPosition)
            }
            addMorePosition={(position, index) =>
              handleAddMorePosition(position, index)
            }
            updatePosition={(indexGame, indexPosition, value) =>
              handleUpdatePosition(indexGame, indexPosition, value)
            }
            updateGameOrRanking={(index, field, value) =>
              handleUpdateGameOrRanking(index, field, value)
            }
            selectedGames={selectedGames}
            selectedPositions={selectedPositions}
            hasError={hasError}
          />
        </If>
      </Content>
    </BaseScreen>
  );
};

export default ProfileEdit;
