import Vue from 'vue';
import './filter';
// import { 
//   Button,
//   Menu,
//   Submenu,
//   MenuItem,
//   MenuItemGroup,

//   Message,
// } from 'element-ui';

import MyTitle from '@/components/MyTitle.vue'

// Vue.use(Menu);
// Vue.use(Submenu);
// Vue.use(MenuItem);
// Vue.use(MenuItemGroup);
// Vue.use(Button);

// Vue.prototype.$message = Message;
// Vue.prototype.$msg = {}
// Vue.prototype.$msg.success = (message) => Message({ type: 'success', message });
// Vue.prototype.$msg.error = (message) => Message({ type: 'error', message });

Vue.component(MyTitle.name, MyTitle);
