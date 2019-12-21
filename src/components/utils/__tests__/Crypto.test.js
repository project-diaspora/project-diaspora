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

test('Validate a valid mnemonic', async () => {
    SecureStore.setItemAsync.mockResolvedValue(true)
    expect(await Crypto.tryMnemonic(mnemonic)).not.toBeFalsy()
})

test('Validate an invalid mnemonic', async () => {
    SecureStore.setItemAsync.mockResolvedValue(true)
    const invalidMnemonic = 'concert sunny girl regular civil pencil scrap hazard dry task can bitcoin'
    let error;

    try {
        await Crypto.tryMnemonic(invalidMnemonic)
    } catch (e) {
        error = e
    }
    expect(error).toEqual('Invalid mnemonic')
})

test('Validate a valid address', () => {
    expect(Crypto.validateAddress('0x76c929f92878b6DF73E81B2d30F0039c5A68AC35')).toBeTruthy()
})

test('Validate an invalid address', () => {
    expect(() => Crypto.validateAddress('0x76c929f92878b6DF73E81B2d30F0039c5A68AC3C')).toThrowError()
})