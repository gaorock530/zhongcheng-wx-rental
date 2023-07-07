const url = import.meta.env.MODE === 'production'?'http://wx.zhongchenggongsi.com/api':'http://localhost:8080'

export default async function requset(router: string, method = 'GET', data?: BodyInit) {
  const route = url + router
  const headers:Record<string, string> = {}
  // if not formdata, means data is json, must append header 'application/json'
  if (data instanceof FormData) delete headers['Content-Type']
  else headers['Content-Type'] = 'application/json'
  try {
    const res = await fetch(route, {
      method,
      headers,
      body: data,
      // credentials: 'include'
    })

    const json = await res.json()
    if (import.meta.env.MODE === 'development' && json.error) console.log({ status: res.status, ...json })
    return json
  } catch (e) {
    console.log(e)
    throw Error('network error')
  }
}