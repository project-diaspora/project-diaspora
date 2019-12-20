import Crypto from '../Crypto';
import * as SecureStore from 'expo-secure-store';

jest.mock('expo-secure-store')

const mnemonic = 'concert sunny girl regular civil pencil scrap hazard dry task can hero'

test('Derive an address', async () => {
    SecureStore.getItemAsync.mockResolvedValue(mnemonic)
    expect(await Crypto.deriveWalletAddress()).toBe('0x76c929f92878b6DF73E81B2d30F0039c5A68AC35')
})

test('Get stored mnemonic', async () => {
    SecureStore.getItemAsync.mockResolvedValue(mnemonic)
    expect(await Crypto.getStoredMnemonic()).toEqual(mnemonic)
})