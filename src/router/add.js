

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


const GoodsList = () => import('@/pages/storage/basic/goods/list.vue');
const ShopList = () => import('@/pages/storage/basic/shop/list.vue');
const StoreList = () => import('@/pages/storage/basic/deport/list.vue');
const AreaList = () => import('@/pages/storage/basic/area/list.vue');
const LocationList = () => import('@/pages/storage/basic/location/list.vue');
const SupplierList = () => import('@/pages/storage/basic/supplier/list.vue');
const CarrierList = () => import('@/pages/storage/basic/carrier/list.vue');

const inReports = () => import('@/pages/storage/order/inStorage.vue');
const outReports = () => import('@/pages/storage/order/outStorage.vue');
const StockList = () => import('@/pages/storage/order/stockList.vue');


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
    path: '/storage/shop/list', 
    component: ShopList
  },
  {
    path: '/storage/goods/list', 
    component: GoodsList
  },
  {
    path: '/storage/deport/list', 
    component: StoreList
  },
  {
    path: '/storage/area/list', 
    component: AreaList
  },
  {
    path: '/storage/location/list', 
    component: LocationList
  },
  {
    path: '/storage/supplier/list', 
    component: SupplierList
  },
  {
    path: '/storage/carrier/list', 
    component: CarrierList
  },
  {
    path: '/storage/order/stock', 
    component: StockList
  },
  {
    path: '/storage/order/in', 
    component: inReports
  },
  {
    path: '/storage/order/out', 
    component: outReports
  }
]
  