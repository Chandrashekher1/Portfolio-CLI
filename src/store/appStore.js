import { configureStore } from "@reduxjs/toolkit";
import CliReducer from "./CliSlice"

const appStore = configureStore({
    reducer:{
        cli : CliReducer,
    }
})

export default appStore