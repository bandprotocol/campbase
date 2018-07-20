export const changeStep = (toStep: number) => {
  return {
    type: 'CHANGE_STEP',
    payload: { toStep },
  }
}
