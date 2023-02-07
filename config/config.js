// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'hash',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: false,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: false,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/goods/management',
            },
            {
              path: '/goods',
              name: 'goods',
              icon: 'dashboard',
              routes: [
                {
                  name: 'management',
                  path: '/goods/management',
                  icon: 'smile',
                  component: './goods/management',
                },
                {
                  name: 'edit',
                  path: '/goods/edit',
                  icon: 'smile',
                  component: './goods/edit',
                },
              ],
            },
            {
              path: '/product',
              name: 'product',
              icon: 'form',
              routes: [
                {
                  name: 'management',
                  path: '/product/management',
                  icon: 'smile',
                  component: './product/management',
                },
                {
                  name: 'edit',
                  path: '/product/edit',
                  icon: 'smile',
                  component: './product/edit',
                },
              ],
            },
            {
              path: '/commonName',
              name: 'commonName',
              icon: 'table',
              routes: [
                {
                  name: 'management',
                  path: '/commonName/management',
                  icon: 'smile',
                  component: './commonName/management',
                },
                {
                  name: 'edit',
                  path: '/commonName/edit',
                  icon: 'smile',
                  component: './commonName/edit',
                },
              ],
            },
            {
              path: '/medicine',
              name: 'medicine',
              icon: 'database',
              routes: [
                {
                  name: 'management',
                  path: '/medicine/management',
                  icon: 'smile',
                  component: './medicine/management',
                },
                {
                  name: 'edit',
                  path: '/medicine/edit',
                  icon: 'smile',
                  component: './medicine/edit',
                },
              ],
            },
            {
              path: '/material',
              name: 'material',
              icon: 'checkCircle',
              routes: [
                {
                  name: 'management',
                  path: '/material/management',
                  icon: 'smile',
                  component: './material/management',
                },
                {
                  name: 'edit',
                  path: '/material/edit',
                  icon: 'smile',
                  component: './material/edit',
                },
              ],
            },
            {
              path: '/basicData',
              name: 'basicData',
              icon: 'audit',
              routes: [
                {
                  name: 'adverseReaction',
                  path: '/basicData/adverseReaction',
                  icon: 'smile',
                  routes: [
                    {
                      path: '/basicData/adverseReaction/template',
                      name: 'template',
                      icon: 'smile',
                      component: './basicData/adverseReaction/template',
                    },
                    {
                      path: '/basicData/adverseReaction/templateEdit',
                      name: 'templateEdit',
                      icon: 'smile',
                      hideInMenu: true,
                      component: './basicData/adverseReaction/templateEdit',
                    },
                  ],
                },
                {
                  name: 'indication',
                  path: '/basicData/indication',
                  icon: 'smile',
                  routes: [
                    {
                      path: '/basicData/indication/template',
                      name: 'template',
                      icon: 'smile',
                      component: './basicData/indication/template',
                    },
                    {
                      path: '/basicData/indication/templateEdit',
                      name: 'templateEdit',
                      icon: 'smile',
                      hideInMenu: true,
                      component: './basicData/indication/templateEdit',
                    },
                  ],
                },
                {
                  name: 'tag',
                  path: '/basicData/tag',
                  icon: 'smile',
                  routes: [
                    {
                      path: '/basicData/tag/management',
                      name: 'management',
                      icon: 'smile',
                      component: './basicData/tag/management',
                    },
                    {
                      path: '/basicData/tag/edit',
                      name: 'edit',
                      icon: 'smile',
                      hideInMenu: true,
                      component: './basicData/tag/edit',
                    },
                  ],
                },
                {
                  name: 'accessory',
                  path: '/basicData/accessory',
                  icon: 'smile',
                  routes: [
                    {
                      path: '/basicData/accessory/management',
                      name: 'management',
                      icon: 'smile',
                      component: './basicData/accessory/management',
                    },
                    {
                      path: '/basicData/accessory/edit',
                      name: 'edit',
                      icon: 'smile',
                      hideInMenu: true,
                      component: './basicData/accessory/edit',
                    },
                  ],
                },
                {
                  name: 'color',
                  path: '/basicData/color',
                  icon: 'smile',
                  routes: [
                    {
                      path: '/basicData/color/management',
                      name: 'management',
                      icon: 'smile',
                      component: './basicData/color/management',
                    },
                    {
                      path: '/basicData/color/edit',
                      name: 'edit',
                      icon: 'smile',
                      hideInMenu: true,
                      component: './basicData/color/edit',
                    },
                  ],
                },
                {
                  name: 'taste',
                  path: '/basicData/taste',
                  icon: 'smile',
                  routes: [
                    {
                      path: '/basicData/taste/management',
                      name: 'management',
                      icon: 'smile',
                      component: './basicData/taste/management',
                    },
                    {
                      path: '/basicData/taste/edit',
                      name: 'edit',
                      icon: 'smile',
                      hideInMenu: true,
                      component: './basicData/taste/edit',
                    },
                  ],
                },
              ],
            },
            {
              path: '/insuranceCode',
              name: 'insuranceCode',
              icon: 'idcard',
              routes: [
                {
                  name: 'management',
                  path: '/insuranceCode/management',
                  icon: 'smile',
                  component: './insuranceCode/management',
                },
                {
                  name: 'edit',
                  path: '/insuranceCode/edit',
                  icon: 'smile',
                  component: './insuranceCode/edit',
                },
              ],
            },
            {
              path: '/literature',
              name: 'literature',
              icon: 'fileMarkdown',
              routes: [
                {
                  name: 'management',
                  path: '/literature/management',
                  icon: 'smile',
                  component: './literature/management',
                },
                {
                  name: 'scanManagement',
                  path: '/literature/scanManagement',
                  icon: 'smile',
                  component: './literature/scan/management',
                },
                {
                  name: 'structured',
                  path: '/literature/structured',
                  icon: 'smile',
                  component: './literature/structured/management',
                },
                {
                  name: 'edit',
                  path: '/literature/edit',
                  icon: 'smile',
                  hideInMenu: true,
                  component: './literature/edit',
                },
                {
                  name: 'scan.upload',
                  path: '/literature/scan/upload',
                  icon: 'smile',
                  hideInMenu: true,
                  component: './literature/scan/upload',
                },
                {
                  name: 'structured.edit',
                  path: '/literature/structured/edit',
                  icon: 'smile',
                  component: './literature/structured/edit',
                  hideInMenu: true,
                },
                {
                  name: 'pack',
                  path: '/literature/structured/pack',
                  icon: 'smile',
                  component: './literature/structured/pack',
                  hideInMenu: true,
                },
                {
                  name: 'character',
                  path: '/literature/structured/character',
                  icon: 'smile',
                  component: './literature/structured/character',
                  hideInMenu: true,
                },
                {
                  name: 'keep',
                  path: '/literature/structured/keep',
                  icon: 'smile',
                  component: './literature/structured/keep',
                  hideInMenu: true,
                },
                {
                  name: 'adverseReaction',
                  path: '/literature/structured/adverseReaction',
                  icon: 'smile',
                  component: './literature/structured/adverseReaction',
                  hideInMenu: true,
                },
                {
                  name: 'indication',
                  path: '/literature/structured/indication',
                  icon: 'smile',
                  component: './literature/structured/indication',
                  hideInMenu: true,
                },
                {
                  name: 'noIndication',
                  path: '/literature/structured/noIndication',
                  icon: 'smile',
                  component: './literature/structured/noIndication',
                  hideInMenu: true,
                },
                {
                  name: 'taboo',
                  path: '/literature/structured/taboo',
                  icon: 'smile',
                  component: './literature/structured/taboo',
                  hideInMenu: true,
                },
                {
                  name: 'usageDosage',
                  path: '/literature/structured/usageDosage',
                  icon: 'smile',
                  component: './literature/structured/usageDosage',
                  hideInMenu: true,
                },
                {
                  name: 'chapter.management',
                  path: '/literature/chapter/management',
                  icon: 'smile',
                  component: './literature/chapter/management',
                  hideInMenu: true,
                },
                {
                  name: 'chapter.edit',
                  path: '/literature/chapter/edit',
                  icon: 'smile',
                  component: './literature/chapter/edit',
                  hideInMenu: true,
                },
                {
                  name: 'management.scan.upload',
                  path: '/literature/management/scan/upload',
                  icon: 'smile',
                  component: './literature/management/scan/upload',
                  hideInMenu: true,
                },
              ],
            },
            {
              path: '/incompatibility',
              name: 'incompatibility',
              icon: 'experiment',
              routes: [
                {
                  name: 'management',
                  path: '/incompatibility/management',
                  icon: 'smile',
                  component: './incompatibility/management',
                },
                {
                  name: 'edit',
                  path: '/incompatibility/edit',
                  icon: 'smile',
                  component: './incompatibility/edit',
                },
              ],
            },
            {
              path: '/interaction',
              name: 'interaction',
              icon: 'expandAlt',
              routes: [
                {
                  name: 'management',
                  path: '/interaction/management',
                  icon: 'smile',
                  component: './interaction/management',
                },
                {
                  name: 'edit',
                  path: '/interaction/edit',
                  icon: 'smile',
                  component: './interaction/edit',
                },
              ],
            },
            {
              path: '/solvent',
              name: 'solvent',
              icon: 'hourglass',
              routes: [
                {
                  name: 'management',
                  path: '/solvent/management',
                  icon: 'smile',
                  component: './solvent/management',
                },
                {
                  name: 'edit',
                  path: '/solvent/edit',
                  icon: 'smile',
                  component: './solvent/edit',
                },
              ],
            },
            {
              path: '/company',
              name: 'company',
              icon: 'bank',
              routes: [
                {
                  name: 'management',
                  path: '/company/management',
                  icon: 'smile',
                  component: './company/management',
                },
                {
                  name: 'edit',
                  path: '/company/edit',
                  icon: 'smile',
                  component: './company/edit',
                },
              ],
            },
            {
              path: '/hospital',
              name: 'hospital',
              icon: 'home',
              routes: [
                {
                  name: 'management',
                  path: '/hospital/management',
                  icon: 'smile',
                  component: './hospital/management',
                },
                {
                  name: 'edit',
                  path: '/hospital/edit',
                  icon: 'smile',
                  component: './hospital/edit',
                },
              ],
            },
            {
              path: '/import',
              name: 'import',
              icon: 'import',
              routes: [
                {
                  name: 'management',
                  path: '/import/management',
                  icon: 'smile',
                  component: './import/management',
                },
                {
                  name: 'edit',
                  path: '/import/edit',
                  icon: 'smile',
                  component: './import/edit',
                },
              ],
            },
            {
              path: '/drug',
              name: 'drug',
              icon: 'database',
              routes: [
                {
                  name: 'management',
                  path: '/drug/management',
                  icon: 'smile',
                  component: './drug/management',
                },
                {
                  name: 'edit',
                  path: '/drug/edit',
                  icon: 'smile',
                  hideInMenu: true,
                  component: './drug/edit',
                },
              ],
            },
            {
              path: '/drugChange',
              name: 'drugChange',
              icon: 'dashboard',
              routes: [
                {
                  name: 'add',
                  path: '/drugChange/add',
                  icon: 'smile',
                  routes: [
                    {
                      name: 'management',
                      path: '/drugChange/add/management',
                      icon: 'smile',
                      component: './drugChange/add/management',
                    },
                    {
                      name: 'edit',
                      path: '/drugChange/add/edit',
                      icon: 'smile',
                      hideInMenu: true,
                      component: './drugChange/add/edit',
                    },
                    {
                      name: 'query',
                      path: '/drugChange/add/query',
                      icon: 'smile',
                      component: './drugChange/add/query',
                    },
                  ],
                },
                {
                  name: 'management',
                  path: '/drugChange/management',
                  icon: 'smile',
                  routes: [
                    {
                      name: 'management',
                      path: '/drugChange/management/management',
                      icon: 'smile',
                      component: './drugChange/management/management',
                    },
                    {
                      name: 'edit',
                      path: '/drugChange/management/edit',
                      icon: 'smile',
                      hideInMenu: true,
                      component: './drugChange/management/edit',
                    },
                  ],
                },
              ],
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
});
