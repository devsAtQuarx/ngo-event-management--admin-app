import Vue from 'vue'
import Router from 'vue-router'

//import Auth from '@/components/Auth'
//import AuthSuccess from '@/components/AuthSuccess'
//import createEvent from '@/components/createEvent'
//import events from '@/components/events'
//import specEvent from '@/components/specEvent'
//import feedback from '@/components/feedback'
//import qrcode from '@/components/qrcode'
//import manageRegisteredUsers from '@/components/manageRegisteredUsers'
//import specUserMemDetail from '@/components/specUserMemDetail'
//import genExcelSheetOfUsers from '@/components/genExcelSheetOfUsers'
//import excelSheetSpecEvent from '@/components/excelSheetSpecEvent'
//import managePeopleInSpecEvent from '@/components/managePeopleInSpecEvent'
//import sendPushNot from '@/components/sendPushNot'

Vue.use(Router)

//lazy laoding
const Auth = resolve => {
  require.ensure(['@/components/Auth'],()=>{
    resolve(require('@/components/Auth'));
  });
};
const AuthSuccess = resolve => {
  require.ensure(['@/components/AuthSuccess'],()=>{
    resolve(require('@/components/AuthSuccess'));
  });
};
const createEvent = resolve => {
  require.ensure(['@/components/createEvent'],()=>{
    resolve(require('@/components/createEvent'));
  });
};
const events = resolve => {
  require.ensure(['@/components/events'],()=>{
    resolve(require('@/components/events'));
  });
};
const specEvent = resolve => {
  require.ensure(['@/components/specEvent'],()=>{
    resolve(require('@/components/specEvent'));
  });
};
const feedback = resolve => {
  require.ensure(['@/components/feedback'],()=>{
    resolve(require('@/components/feedback'));
  });
};
const qrcode = resolve => {
  require.ensure(['@/components/qrcode'],()=>{
    resolve(require('@/components/qrcode'));
  });
};
const manageRegisteredUsers = resolve => {
  require.ensure(['@/components/manageRegisteredUsers'],()=>{
    resolve(require('@/components/manageRegisteredUsers'));
  });
};

const specUserMemDetail = resolve => {
  require.ensure(['@/components/specUserMemDetail'],()=>{
    resolve(require('@/components/specUserMemDetail'));
  });
};
const genExcelSheetOfUsers = resolve => {
  require.ensure(['@/components/genExcelSheetOfUsers'],()=>{
    resolve(require('@/components/genExcelSheetOfUsers'));
  });
};
const excelSheetSpecEvent = resolve => {
  require.ensure(['@/components/excelSheetSpecEvent'],()=>{
    resolve(require('@/components/excelSheetSpecEvent'));
  });
};
const managePeopleInSpecEvent = resolve => {
  require.ensure(['@/components/managePeopleInSpecEvent'],()=>{
    resolve(require('@/components/managePeopleInSpecEvent'));
  });
};
const sendPushNot = resolve => {
  require.ensure(['@/components/sendPushNot'],()=>{
    resolve(require('@/components/sendPushNot'));
  });
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Auth
    },
    {
      path: '/success',
      component: AuthSuccess ,
      children:[
        {
          path:'',
          component : events
        },
        {
          path:'createEvent',
          component : createEvent
        },
        {
          path:'/specEvent/:id',
          component: specEvent
        },
        {
          path:'/feedback/:id',
          component : feedback
        },
        {
          path:'/qrcode/:id',
          component : qrcode
        },
        {
          path:'/manageRegisteredUsers',
          component: manageRegisteredUsers
        },
        {
          path:'/specUserMemDetail/:id',
          component:specUserMemDetail
        },
        {
          path:'/genExcelSheetOfUsers',
          component : genExcelSheetOfUsers
        },
        {
          path:'/managePeopleInSpecEvent/:id',
          component : managePeopleInSpecEvent
        },
        {
          path : '/excelSheetSpecEvent/:id',
          component : excelSheetSpecEvent
        },
        {
          path: '/sendPushNot2',
          component : sendPushNot
        }
      ]
    }
  ]
})
