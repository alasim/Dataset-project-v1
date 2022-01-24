import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IItem } from 'interfaces/IItem'

export interface HomeState {
    downloadModelData: IItem,
    list: IItem[],
    tags: string[]
}

const initialState: HomeState = {
    downloadModelData: {
        id: "",
        title: "News today",
        user: "Hasan",
        downloads: 21,
        loves: 10,
        file: {
            id: "0",
            name: "",
            type: "",
            extention: ""
        },
        date: Date(),
    },
    list: [],
    tags: []
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setDownloadModelData: (state, action: PayloadAction<IItem>) => {
            state.downloadModelData = action.payload
        },
        updateList: (state, action: PayloadAction<IItem[]>) => {
            state.list = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setDownloadModelData, updateList } = homeSlice.actions

export default homeSlice.reducer