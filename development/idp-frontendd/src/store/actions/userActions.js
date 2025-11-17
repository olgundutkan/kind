export const SET_ROLE = 'user/SET_ROLE'
export const SET_LANGUAGE = 'user/SET_LANGUAGE'

export const setRole = (role) => ({
  type: SET_ROLE,
  payload: role,
})

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language,
})
