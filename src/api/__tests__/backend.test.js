import * as SecureStore from 'expo-secure-store';
import api from '../backend';

jest.mock('expo-secure-store');

const mnemonic = 'concert sunny girl regular civil pencil scrap hazard dry task can hero';
const createUsername = `abc${Date.now()}`;

test('create user', async () => {
  SecureStore.getItemAsync.mockResolvedValue(mnemonic);
  const res = await api.createUser(createUsername);
  expect(res).toBeTruthy();
});

test('search for specific user', async () => {
  SecureStore.getItemAsync.mockResolvedValue(mnemonic);
  const res = await api.searchUser('user_a');
  expect(res).toBeTruthy();
});

test('create user duplicate username', async () => {
  SecureStore.getItemAsync.mockResolvedValue(mnemonic);
  try {
    await api.createUser(createUsername);
  } catch (err) {
    expect(err).toExist;
  }
});

test('logging in', async () => {
  SecureStore.getItemAsync.mockResolvedValue(mnemonic);
  try {
    const res = await api.loginUser();
    expect(res.data.length).toBe(1);
  } catch (err) {
    fail('no user exists');
  }
});
