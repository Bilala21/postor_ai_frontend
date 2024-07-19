export function createAsyncReducer(
    builder,
    asyncThunk,
    fulfilledCallback = (state, action) => null,
    errorCallback = (errorMessage) => null,
) {
    builder.addCase(asyncThunk.pending, (state) => {
        state.loading = true;
        delete state.error;
    });
    builder.addCase(asyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        fulfilledCallback?.(state, action);
    });
    builder.addCase(asyncThunk.rejected, (state, action) => {
        state.loading = false;
        let errorMessage = action.error?.message;
        errorMessage.includes("Unexpected token") && (errorMessage = "Internal Server Error");
        state.error = errorMessage;
        errorCallback?.(errorMessage);
    });
}