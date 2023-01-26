// Object spread is just node 8

const defaultConfig = Object.assign({}, require('../jest.config'), {
  // eslint-disable-line @typescript-eslint/no-var-requires
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '\\.(js|jsx)$': '<rootDir>/../../node_modules/babel-jest',
    '\\.scss$': '<rootDir>/../../node_modules/jest-css-modules',
  },
  // https://github.com/facebook/jest/issues/8568#issuecomment-502660960
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
      diagnostics: false,
    },
    CYPRESS: false,
    STORYBOOK: false,
    LOCAL_API: false,
  },
})

defaultConfig.coverageReporters = ['json', ['lcov', { projectRoot: '../../' }], 'text']
defaultConfig.setupFiles.push('./__mocks__/browser.ts')
defaultConfig.setupFiles.push('./__mocks__/setup.ts')
defaultConfig.moduleNameMapper['@/(.*)$'] = '<rootDir>/src/$1/'
defaultConfig.testPathIgnorePatterns = ['(.*[.cy])\\.[jt]sx?$']

module.exports = defaultConfig
