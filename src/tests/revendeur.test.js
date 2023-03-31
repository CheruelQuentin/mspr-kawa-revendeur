const { findHash } = require('../services/firebaseRevendeur.service')
describe('findHash function', () => {
    // Test case 1 : user id exists and has a hash
    test('should return the hash of the user', async () => {
        const userId = 'user123';
        const expectedHash = 'abcdefg';
        const doc = {
            _fieldsProto: {
                hash: {
                    stringValue: expectedHash
                }
            }
        };
        const mockGet = jest.fn(() => Promise.resolve(doc));
        const mockDoc = jest.fn(() => ({ get: mockGet }));
        const mockCollection = jest.fn(() => ({ doc: mockDoc }));
        const mockFirestore = jest.fn(() => ({ collection: mockCollection }));
        jest.mock('firebase-admin', () => ({
            firestore: mockFirestore
        }));

        const hash = await findHash(userId);

        expect(mockCollection).toHaveBeenCalledWith('users');
        expect(mockDoc).toHaveBeenCalledWith(userId);
        expect(mockGet).toHaveBeenCalled();
        expect(hash).toBe(expectedHash);
    });

    // Test case 2 : user id exists but does not have a hash
    test('should return undefined if user does not have a hash', async () => {
        const userId = 'user456';
        const doc = {
            _fieldsProto: {}
        };
        const mockGet = jest.fn(() => Promise.resolve(doc));
        const mockDoc = jest.fn(() => ({ get: mockGet }));
        const mockCollection = jest.fn(() => ({ doc: mockDoc }));
        const mockFirestore = jest.fn(() => ({ collection: mockCollection }));
        jest.mock('firebase-admin', () => ({
            firestore: mockFirestore
        }));

        const hash = await findHash(userId);

        expect(mockCollection).toHaveBeenCalledWith('users');
        expect(mockDoc).toHaveBeenCalledWith(userId);
        expect(mockGet).toHaveBeenCalled();
        expect(hash).toBeUndefined();
    });

    // Test case 3 : user id does not exist in Firestore
    test('should throw an error if user id does not exist', async () => {
        const userId = 'user789';
        const mockGet = jest.fn(() => Promise.resolve({}));
        const mockDoc = jest.fn(() => ({ get: mockGet }));
        const mockCollection = jest.fn(() => ({ doc: mockDoc }));
        const mockFirestore = jest.fn(() => ({ collection: mockCollection }));
        jest.mock('firebase-admin', () => ({
            firestore: mockFirestore
        }));

        await expect(findHash(userId)).rejects.toThrow();
        expect(mockCollection).toHaveBeenCalledWith('users');
        expect(mockDoc).toHaveBeenCalledWith(userId);
        expect(mockGet).toHaveBeenCalled();
    });
});