export default async function ({ app, store, route, redirect }) {

console.log('route role_id', route.query.role_id)

  if(route.query.role_id == undefined || route.query.role_id == null){
    const url = process.env.fakeUrl + `roles`;
    let item = {};

    try {
      item = await fetch(url)
      .then(res => res.json())
    } catch (error) {
      console.error(error)
    }

    redirect(`/roles?role_id=${item[0].id}`)

  }


}
