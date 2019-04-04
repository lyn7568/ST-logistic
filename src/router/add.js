

const ListPage = () => import('@/pages/Staff/ListPage.vue');
const AddPage = () => import('@/pages/Staff/AddPage.vue');
const ExpressAddPage = () => import('@/pages/ExpressAddPage.vue');

const CarAddPage = () => import('@/pages/Car/CarAddPage.vue');
const RealTime = () => import('@/pages/Car/RealTime.vue');
const CarList = () => import('@/pages/Car/CarList.vue');

const InaddPage = () => import('@/pages/Express/InaddPage.vue');
const InlistPage = () => import('@/pages/Express/InlistPage.vue');
const AllotPage = () => import('@/pages/Express/AllotPage.vue');
const QueryExcel = () => import('@/pages/Express/QueryExcel.vue');
const ListPage1 = () => import('@/pages/Express/ListPage1.vue');

const AddGoods = () => import('@/pages/storage/goods/add.vue');
const GoodsList = () => import('@/pages/storage/goods/list.vue');

const AddShop = () => import('@/pages/storage/shop/add.vue');
const ShopList = () => import('@/pages/storage/shop/list.vue');

const StoreList = () => import('@/pages/storage/store/list.vue');
const StoreManage = () => import('@/pages/storage/store/manage.vue');

const inReports = () => import('@/pages/storage/reports/in.vue');
const outReports = () => import('@/pages/storage/reports/out.vue');

const inApproval = () => import('@/pages/storage/approval/in.vue');
const outApproval = () => import('@/pages/storage/approval/out.vue');

export default [
  {
    path: '/staff/list', 
    component: ListPage
  },
	{
    path: '/staff/add', 
    component: AddPage
  },
	{
    path: '/express/add', 
    component: ExpressAddPage
  },
  {
    path: '/express/list1', 
    component: ListPage1
  },
	{
    path: '/car/add', 
    component: CarAddPage
  },
  {
    path: '/car/list', 
    component: CarList
  },
  
  {
    path: '/car/realtime', 
    component: RealTime
  },
	{
    path: '/express/Inadd', 
    component: InaddPage
  },
	{
    path: '/express/list', 
    component: InlistPage
  },
	{
    path: '/express/allot', 
    component: AllotPage
  },
  {
    path: '/express/query', 
    component: QueryExcel
  },
  
  {
    path: '/storage/shop/add', 
    component: AddShop
  },
  {
    path: '/storage/shop/list', 
    component: ShopList
  },
  {
    path: '/storage/goods/add', 
    component: AddGoods
  },
  {
    path: '/storage/goods/list', 
    component: GoodsList
  },
  {
    path: '/storage/store/list', 
    component: StoreList
  },
  {
    path: '/storage/store/manage', 
    component: StoreManage
  },
  {
    path: '/storage/reports/in', 
    component: inReports
  },
  {
    path: '/storage/reports/out', 
    component: outReports
  },
  {
    path: '/storage/approval/in', 
    component: inApproval
  },
  {
    path: '/storage/approval/out', 
    component: outApproval
  }
]
  