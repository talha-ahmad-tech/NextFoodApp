module.exports = (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) => {
  plop.setGenerator('Page', {
    description: 'Create a Page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your page name?',
        validate: function (value) {
          if (value.trim().length > 0) {
            return true;
          } else {
            return console.error(`Name can't be empty`);
          }
        },
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../hq-app/containers/{{titleCase name}}/index.tsx',
        templateFile: 'plop-templates/Containers/Component.List.tsx.hbs',
      },
      {
        type: 'add',
        path: '../hq-app/containers/{{titleCase name}}/Add/index.tsx',
        templateFile: 'plop-templates/Containers/Component.Create.tsx.hbs',
      },
      {
        type: 'add',
        path: '../hq-app/containers/{{titleCase name}}/Add/Steps/general.tsx',
        templateFile: 'plop-templates/Containers/Steps/General.tsx.hbs',
      },
      {
        type: 'add',
        path: '../hq-app/containers/{{titleCase name}}/Add/Steps/index.tsx',
        templateFile: 'plop-templates/Containers/Steps/index.tsx.hbs',
      },
      {
        type: 'add',
        path: '../hq-app/containers/{{titleCase name}}/Add/FormConfig/formModel.ts',
        templateFile: 'plop-templates/Containers/FormConfig/FormModel.ts.hbs',
      },
      {
        type: 'add',
        path: '../hq-app/containers/{{titleCase name}}/Add/FormConfig/validationSchema.ts',
        templateFile:
          'plop-templates/Containers/FormConfig/ValidationSchema.ts.hbs',
      },
      {
        type: 'add',
        path: '../hq-app/containers/{{titleCase name}}/Add/FormEnhancer.tsx',
        templateFile: 'plop-templates/Containers/FormEnhancer.tsx.hbs',
      },
      {
        type: 'add',
        path: '../hq-app/containers/{{titleCase name}}/View/index.tsx',
        templateFile: 'plop-templates/Containers/Component.View.tsx.hbs',
      },
      {
        type: 'add',
        path: '../hq-app/containers/{{titleCase name}}/config.tsx',
        templateFile: 'plop-templates/Containers/Config.tsx.hbs',
      },
      {
        type: 'add',
        path: '../hq-app/containers/{{titleCase name}}/types.ts',
        templateFile: 'plop-templates/Containers/Types.ts.hbs',
      },
      {
        type: 'add',
        path: '../hq-app/services/modules/{{camelCase name}}.api.ts',
        templateFile: 'plop-templates/Api/Api.ts.hbs',
      },
      {
        type: 'add',
        path: '../hq-app/containers/{{titleCase name}}/{{camelCase name}}.slice.ts',
        templateFile: 'plop-templates/Containers/Slice.ts.hbs',
      },
      {
        type: 'add',
        path: '../hq-app/pages/{{camelCase name}}/[id].tsx',
        templateFile: 'plop-templates/Pages/View.tsx.hbs',
      },
      {
        type: 'add',
        path: '../hq-app/pages/{{camelCase name}}/index.tsx',
        templateFile: 'plop-templates/Pages/List.tsx.hbs',
      },
      {
        type: 'add',
        path: '../hq-app/pages/{{camelCase name}}/add/index.tsx',
        templateFile: 'plop-templates/Pages/Create.tsx.hbs',
      },
      {
        type: 'add',
        path: '../hq-app/pages/{{camelCase name}}/edit/[id].tsx',
        templateFile: 'plop-templates/Pages/Update.tsx.hbs',
      },
      {
        type: 'append',
        path: '../hq-app/lib/store.ts',
        pattern: /(\/\/addReducersImportsHere\s)/g,
        template:
          "import { {{camelCase name}}Reducer } from 'containers/{{titleCase name}}/{{camelCase name}}.slice';\n import { {{camelCase name}}Api } from 'services/modules/{{camelCase name}}.api';\n",
      },
      {
        type: 'append',
        path: '../hq-app/lib/store.ts',
        pattern: /(\/\/addReducersHere\s)/g,
        template:
          '{{camelCase name}}Reducer,\n [{{camelCase name}}Api.reducerPath]: {{camelCase name}}Api.reducer,\n',
      },
      {
        type: 'append',
        path: '../hq-app/lib/store.ts',
        pattern: /(\/\/addMiddlewareHere\s)/g,
        template: '{{camelCase name}}Api.middleware,\n',
      },
    ],
  });
};
