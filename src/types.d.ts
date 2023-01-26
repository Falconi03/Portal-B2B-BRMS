declare module 'babel-plugin-require-context-hook/register'

declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}

type GeneratorType = Generator<unknown, void, unknown>

declare let NODE_ENV: string

declare let CYPRESS: boolean

declare let STORYBOOK: boolean

declare let LOCAL_API: boolean

type JWTTokens = { refresh: string; access: string }
