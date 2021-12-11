export default{
  methods:{
    translate(key){
      return this.$store.state.vocabulary[this.$store.state.lang][key];
    },
    isEmptyArr(arr){
      if(arr != undefined && arr.length > 0){
        return false;
      }else{
        return true;
      }
    },
    isEmpty(obj){
      for (let key in obj) {
        return false;
      }
      return true;
    },
    fetchData(url){
      try {
        return fetch(url).then(res => res.json())
      } catch (error) {
        console.error(`Страница ${this.$route.fullPath}: `,  error)
      } 
    }
   
  }
}