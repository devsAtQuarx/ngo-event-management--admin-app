import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import AuthSuccess from '@/components/AuthSuccess'
import createEvent from '@/components/createEvent'
import events from '@/components/events'
import specEvent from '@/components/specEvent'
import trackEvent from '@/components/trackEvent'
import feedback from '@/components/feedback'
import qrcode from '@/components/qrcode'
import manageRegisteredUsers from '@/components/manageRegisteredUsers'
import specUserMemDetail from '@/components/specUserMemDetail'
import genExcelSheetOfUsers from '@/components/genExcelSheetOfUsers'
import excelSheetSpecEvent from '@/components/excelSheetSpecEvent'
import managePeopleInSpecEvent from '@/components/managePeopleInSpecEvent'
import sendPushNot from '@/components/sendPushNot'

Vue.use(Router)

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
          path:'/trackEvent/:id',
          component: trackEvent
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
