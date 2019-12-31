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
    try {
        await Crypto.tryMnemonic(invalidMnemonic)
    } catch (err) {
        expect(err).toBeTruthy();
    }
})

test('Validate a valid address', () => {
    expect(Crypto.validateAddress('0x76c929f92878b6DF73E81B2d30F0039c5A68AC35')).toBeTruthy()
})

test('Validate an invalid address', () => {
    expect(() => Crypto.validateAddress('0x76c929f92878b6DF73E81B2d30F0039c5A68AC3C')).toThrowError()
})

test('Message gets properly signed', async () => {
    expect(await Crypto.signMessage('hello world'))
        .toBe('0xef380960fb5db89c10079507bd660352ad3514fabdb9a26ff354245bac61de0e1e5954d036ffaa0e742c7f152e72ecfb002027ccbbdf00b41fe0f6dd8b9d8b3d1b')
})

test('Signed message is properly verified', async () => {
    const signature = '0xef380960fb5db89c10079507bd660352ad3514fabdb9a26ff354245bac61de0e1e5954d036ffaa0e742c7f152e72ecfb002027ccbbdf00b41fe0f6dd8b9d8b3d1b'
    const message = 'hello world'
    const walletAddress = '0x76c929f92878b6DF73E81B2d30F0039c5A68AC35'
    expect(await Crypto.verifyMessage(message, signature)).toBe(walletAddress)
})