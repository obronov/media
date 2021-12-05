export default async function ({ app, store, route, redirect }) {
  function isEmpty(obj){
    for (let key in obj) {
      return false;
    }
    return true;
  }

  if(isEmpty(route.query)){
    const url = process.env.fakeUrl + `groups`;
    let item = {};

    try {
      item = await fetch(url)
      .then(res => res.json())
    } catch (error) {
      console.error(error)
    }

    redirect(`/groups?group_id=${item[0].id}`)

  }


}
