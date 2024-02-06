import { configureStore } from '@reduxjs/toolkit'
import userSlide from './slides/userSlide'

export default configureStore({
  reducer: {counter: userSlide,},
})