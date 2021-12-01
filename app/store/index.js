
export const state = () => ({
  showSkeleton: false
});


export const mutations = {
  setShowSkeleton(state, value){
    state.showSkeleton = value;
  },
}
