export type Testable = {
  testId: string | undefined
}

export type ErrorHandler = {
  error?: string | undefined
}

export type UserInputFieldProps = Partial<Testable & ErrorHandler>
