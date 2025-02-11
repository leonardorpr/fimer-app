import styled from 'styled-components/native';

export const ContainerGames = styled.View`
  flex: 1;
  margin-top: 10;
`;

export const ContentBackground = styled.View`
  flex: 1;
  padding-horizontal: 10;
  padding-top: 10;
  border-radius: 4;
  margin-bottom: 15;
  background-color: ${({ theme }) => theme.colors.primary.dark};
`;

export const Title = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20;
`;

export const NewGameButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 30;
  height: 30;
  background-color: ${({ theme }) => theme.colors.accent.regular};
  border-radius: 40;
`;

export const AddMorePositionButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 35;
  background-color: ${({ theme }) => theme.colors.accent.regular};
  border-radius: 4;
  margin-vertical: 10;
`;

export const ContainerRemoveButton = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: center;
`;

export const WrapperContentButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 25;
  padding-horizontal: 5;
  background-color: ${({ theme }) => theme.colors.actions.red};
  border-radius: 4;
`;

export const RemoveIcon = styled.View`
  margin-right: 5;
`;

export const ContainerSelectPosition = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const WrapperRemovePositionButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 30;
  width: 30;
  background-color: ${({ theme }) => theme.colors.actions.red};
  border-radius: 20;
  margin-top: 10;
  margin-left: 10;
`;
