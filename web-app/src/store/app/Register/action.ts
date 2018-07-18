export const changeStep = (toStep: string) => {
  return {
    type: 'CHANGE_STEP',
    toStep,
  }
}
