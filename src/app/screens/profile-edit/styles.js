import styled from 'styled-components/native';

export const Container = styled.View``;

export const HeaderInformations = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SaveButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 40;
  height: 40;
  background-color: ${({ theme }) => theme.colors.accent.regular};
  border-radius: 20;
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding-vertical: 10;
  padding-horizontal: 10;
`;
