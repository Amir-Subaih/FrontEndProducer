import { createSlice } from "@reduxjs/toolkit";

const producerSlice = createSlice({
  name: "producer",
  initialState: {
    producers: [],
    producer: null,
    loading: false,
  },
  reducers: {
    getProducers(state, action) {
      state.producers = action.payload;
      state.loading = false;
    },
    getProducer(state, action) {
      state.producer = action.payload;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
        state.loading = false;
    },
  },
});

const producerActions = producerSlice.actions;
const producerReducer = producerSlice.reducer;

export { producerReducer, producerActions };
