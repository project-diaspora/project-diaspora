import api from '../backend';
import * as SecureStore from 'expo-secure-store';

jest.mock('expo-secure-store')

const mnemonic = 'concert sunny girl regular civil pencil scrap hazard dry task can hero';
const createUsername = `abc${Date.now()}`;

test('create user', async () => {
    SecureStore.getItemAsync.mockResolvedValue(mnemonic);
    const res = await api.createUser(createUsername, '0x76c929f92878b6DF73E81B2d30F0039c5A68AC35');
    expect(res).toBeTruthy();
})

test('search for specific user', async () => {
    SecureStore.getItemAsync.mockResolvedValue(mnemonic);
    const res = await api.searchUser('user_a');
    expect(res).toBeTruthy();
})

test('create user duplicate username', async () => {
    SecureStore.getItemAsync.mockResolvedValue(mnemonic)
    try {
        await api.createUser(createUsername, `wallet_${Date.now()}`)
    } catch (err) {
        expect(err).toExist
    }
})

test('logging in', async () => {
    SecureStore.getItemAsync.mockResolvedValue(mnemonic)
    try {
        const res = await api.loginUser();
        expect(res.data.length).toBe(1);
    } catch (err) {
        fail('no user exists')
    }
})
