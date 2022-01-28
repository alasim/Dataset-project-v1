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
            state.tags = action.payload
        },
        addNew: (state, action: PayloadAction<IItem>) => {
            state.list.push(action.payload)
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(e => e.id != action.payload)
        },
        countDownload: (state, action: PayloadAction<string | undefined>) => {
            let item = state.list.filter(e => e.id == action.payload)[0]
            let index = state.list.indexOf(item)
            if (item) {
                item.downloads = item.downloads + 1
            }

            state.list[index] = item
        },
        addNewTag: (state, action: PayloadAction<string>) => {
            state.tags.push(action.payload)
        },
        setFilter: (state, action: PayloadAction<string>) => {
            state.filtered = action.payload
        },
        clearFilter: (state) => {
            state.filtered = ""
        },
        sortList: (state, action: PayloadAction<string>) => {
            if (action.payload == "acc") {
                state.list.sort((a, b) => a.title.localeCompare(b.title))
            } else if (action.payload == "des") {
                state.list.sort((a, b) => b.title.localeCompare(a.title))
            } else if (action.payload == "download") {
                state.list.sort((a, b) => b.downloads - a.downloads)
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { setDownloadModelData, updateList, addNew, removeItem, updateTags, setFilter, clearFilter, sortList, addNewTag, countDownload } = homeSlice.actions

export default homeSlice.reducer