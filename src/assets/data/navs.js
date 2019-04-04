module.exports = [{
	"iconUrl": "/images/userManger.png",
	"id": 1,
	"menuText": "员工管理",
	"menuUrl": "",
	"parentId": 0,
	"status": 1,
	"subMenuList": [{
		"iconUrl": "",
		"id": 2,
		"menuText": "新增员工",
		"menuUrl": "/staff/add",
		"parentId": 1,
		"status": 1,
		"subMenuList": []
	}, {
		"iconUrl": "",
		"id": 3,
		"menuText": "员工列表",
		"menuUrl": "/staff/list",
		"parentId": 1,
		"status": 1,
		"subMenuList": []
	}]
}, {
	"iconUrl": "/images/trukManger.png",
	"id": 4,
	"menuText": "车辆管理",
	"menuUrl": "",
	"parentId": 0,
	"status": 1,
	"subMenuList": [{
		"iconUrl": "",
		"id": 5,
		"menuText": "新增车辆",
		"menuUrl": "/car/add",
		"parentId": 4,
		"status": 1,
		"subMenuList": []
	}, {
		"iconUrl": "",
		"id": 18,
		"menuText": "配送车列表",
		"menuUrl": "/car/list",
		"parentId": 4,
		"status": 1,
		"subMenuList": []
	}, {
		"iconUrl": "",
		"id": 19,
		"menuText": "车辆实时位置",
		"menuUrl": "/car/realtime",
		"parentId": 4,
		"status": 1,
		"subMenuList": []
	}]
}, {
	"iconUrl": "/images/expressManager.png",
	"id": 6,
	"menuText": "配送点管理",
	"menuUrl": "",
	"parentId": 0,
	"status": 1,
	"subMenuList": [{
		"iconUrl": "",
		"id": 7,
		"menuText": "新增配送点",
		"menuUrl": "/express/add",
		"parentId": 6,
		"status": 1,
		"subMenuList": []
	}, {
		"iconUrl": "",
		"id": 17,
		"menuText": "配送点列表",
		"menuUrl": "/express/list1",
		"parentId": 6,
		"status": 1,
		"subMenuList": []
	}]
}, {
	"iconUrl": "/images/entrepotManager.png",
	"id": 8,
	"menuText": "快递管理",
	"menuUrl": "",
	"parentId": 0,
	"status": 1,
	"subMenuList": [{
		"iconUrl": "",
		"id": 9,
		"menuText": "快递录入",
		"menuUrl": "/express/allot",
		"parentId": 8,
		"status": 1,
		"subMenuList": []
	}, {
		"iconUrl": "",
		"id": 10,
		"menuText": "快递分配",
		"menuUrl": "/express/Inadd",
		"parentId": 8,
		"status": 1,
		"subMenuList": []
	}, {
		"iconUrl": "",
		"id": 11,
		"menuText": "快递分配查询",
		"menuUrl": "/express/list",
		"parentId": 8,
		"status": 1,
		"subMenuList": []
	}, {
		"iconUrl": "",
		"id": 21,
		"menuText": "快递公司批量导入",
		"menuUrl": "/temp/upload",
		"parentId": 8,
		"status": 1,
		"subMenuList": []
	}]
}, {
	"iconUrl": "/images/reportManager.png",
	"id": 13,
	"menuText": "报表管理",
	"menuUrl": "",
	"parentId": 0,
	"status": 1,
	"subMenuList": [{
		"iconUrl": "",
		"id": 14,
		"menuText": "快递查询导出",
		"menuUrl": "/express/query",
		"parentId": 13,
		"status": 1,
		"subMenuList": []
	}]
}, {
	"iconUrl": "",
	"id": 20,
	"menuText": "下载页面",
	"menuUrl": "/download",
	"parentId": 0,
	"status": 1,
	"subMenuList": []
}, {
  "iconUrl": "",
  "id": 22,
  "menuText": "仓储管理",
  "menuUrl": "",
  "parentId": 0,
  "status": 1,
  "subMenuList": [
    {
      "iconUrl": "",
      "id": 23,
      "menuText": "店铺管理",
      "menuUrl": "",
      "parentId": 22,
      "status": 1,
      "subMenuList": [
        {
          "iconUrl": "",
          "id": 24,
          "menuText": "新增店铺",
          "menuUrl": "/storage/shop/add",
          "parentId": 23,
          "status": 1,
          "subMenuList": []
        },
        {
          "iconUrl": "",
          "id": 25,
          "menuText": "店铺列表",
          "menuUrl": "/storage/shop/list",
          "parentId": 23,
          "status": 1,
          "subMenuList": []
        }
      ]
    },
    {
      "iconUrl": "",
      "id": 26,
      "menuText": "货物管理",
      "menuUrl": "",
      "parentId": 22,
      "status": 1,
      "subMenuList": [
        {
          "iconUrl": "",
          "id": 27,
          "menuText": "新增货物",
          "menuUrl": "/storage/goods/add",
          "parentId": 26,
          "status": 1,
          "subMenuList": []
        },
        {
          "iconUrl": "",
          "id": 28,
          "menuText": "货物列表",
          "menuUrl": "/storage/goods/list",
          "parentId": 26,
          "status": 1,
          "subMenuList": []
        }
      ]
    },
    {
      "iconUrl": "",
      "id": 29,
      "menuText": "仓库管理",
      "menuUrl": "",
      "parentId": 22,
      "status": 1,
      "subMenuList": [
        {
          "iconUrl": "",
          "id": 31,
          "menuText": "仓库列表",
          "menuUrl": "/storage/store/list",
          "parentId": 29,
          "status": 1,
          "subMenuList": []
        },
        {
          "iconUrl": "",
          "id": 32,
          "menuText": "仓货管理",
          "menuUrl": "/storage/store/manage",
          "parentId": 29,
          "status": 1,
          "subMenuList": []
        }
      ]
    },
    {
      "iconUrl": "",
      "id": 33,
      "menuText": "出入库记录",
      "menuUrl": "",
      "parentId": 22,
      "status": 1,
      "subMenuList": [
        {
          "iconUrl": "",
          "id": 34,
          "menuText": "入库记录",
          "menuUrl": "/storage/reports/in",
          "parentId": 33,
          "status": 1,
          "subMenuList": []
        },
        {
          "iconUrl": "",
          "id": 35,
          "menuText": "出库记录",
          "menuUrl": "/storage/reports/out",
          "parentId": 33,
          "status": 1,
          "subMenuList": []
        }
      ]
    },
    {
      "iconUrl": "",
      "id": 36,
      "menuText": "出入库审批",
      "menuUrl": "",
      "parentId": 22,
      "status": 1,
      "subMenuList": [
        {
          "iconUrl": "",
          "id": 37,
          "menuText": "入库审批",
          "menuUrl": "/storage/approval/in",
          "parentId": 36,
          "status": 1,
          "subMenuList": []
        },
        {
          "iconUrl": "",
          "id": 38,
          "menuText": "出库审批",
          "menuUrl": "/storage/approval/out",
          "parentId": 36,
          "status": 1,
          "subMenuList": []
        }
      ]
    }
  ]
}]