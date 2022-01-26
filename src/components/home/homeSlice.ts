import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IItem } from 'interfaces/IItem'

export interface HomeState {
    downloadModelData: IItem,
    list: IItem[],
    tags: string[],
    filtered: string
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
            url: ""
        },
        date: Date(),
        tags: []
    },
    list: [],
    tags: [
        "Book",
        "Story"
    ],
    filtered: ""
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
        },
        updateTags: (state, action: PayloadAction<string[]>) => {
            console.log('action.payload');
            console.log(action.payload);

            state.tags = action.payload
        },
        addNew: (state, action: PayloadAction<IItem>) => {
            state.list.push(action.payload)
        },
        setFilter: (state, action: PayloadAction<string>) => {
            state.filtered = action.payload
        },
        clearFilter: (state) => {
            state.filtered = ""
        },
        sortList: (state, action: PayloadAction<string>) => {
            if (action.payload != "des") {
                state.list.sort((a, b) => a.title.localeCompare(b.title))
            } else {
                state.list.sort((a, b) => b.title.localeCompare(a.title))
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { setDownloadModelData, updateList, addNew, updateTags, setFilter, clearFilter, sortList } = homeSlice.actions

export default homeSlice.reducer