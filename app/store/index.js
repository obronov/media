
export const state = () => ({
  showSkeleton: false,
  token: null
});


export const mutations = {
  setShowSkeleton(state, value){
    state.showSkeleton = value;
  },
  setToken(state, value){
    state.token = value;
  }
}
