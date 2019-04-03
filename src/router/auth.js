
export default function (router) {
  router.beforeEach((to, from, next) => {
    var userinfo = window.localStorage.userinfo;
    if (!to.meta.noLogin) {
      if (!userinfo) {
        next({
          path: '/',
          query: { redirect: to.fullPath },
        })
      } else {
        next()
      }
    } else {
      next() // 确保一定要调用 next()
    }
  });
  return router;
}