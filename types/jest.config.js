module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        'ts-jest': {
          tsconfig: './tsconfig.json',
          useESM: true, // Enable ESM usage
        },
      },
    ],
  },
}
