import api from '../backend';
import * as SecureStore from 'expo-secure-store';

jest.mock('expo-secure-store')

const mnemonic = 'concert sunny girl regular civil pencil scrap hazard dry task can hero'

test('search for specific user', async () => {
    SecureStore.getItemAsync.mockResolvedValue(mnemonic)
    const res = await api.searchUser('mm')
    expect(res).toBeTruthy()
})

test('test create user', async () => {
    SecureStore.getItemAsync.mockResolvedValue(mnemonic)
    const res = await api.createUser(`abc${Date.now()}`, `wallet_${Date.now()}`)
    expect(res).toBeTruthy()
})

test('test create user duplicate username', async () => {
    SecureStore.getItemAsync.mockResolvedValue(mnemonic)
    try {
        await api.createUser('mm1', `wallet_${Date.now()}`)
    } catch (err) {
        expect(err).toExist
    }
})
