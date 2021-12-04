export default async function ({ app, store, route, redirect }) {

  if(route.query.group_id == undefined || route.query.group_id == null){
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
