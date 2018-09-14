module.exports = {
    verbose: true,
    roots: [
        '<rootDir>/app',
    ],
    modulePathIgnorePatterns: [
        '<rootDir>/app/tests/reducers/',
        '<rootDir>/app/tests/models/',
        '<rootDir>/src/',
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/app/tests/__mocks__/fileMock.js',
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
    setupFiles: [
        './jest.setup.js',
    ],
    testRegex: 'tests/.*\\.test\\.js$',
};
