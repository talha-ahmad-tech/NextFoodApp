module.exports = plop => {
    plop.setGenerator('component', {
        description: 'Create a reusable component',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'What is your component name?',
            validate: function (value) {
                if (value.trim().length > 0) {
                    return true
                } else {
                    return console.error(`Name can't be empty`)
                }
            }
        }, ],
        actions: [{
                type: 'add',
                // Plop will create directories for us if they do not exist
                // so it's okay to add files in nested locations.
                path: 'src/{{pascalCase name}}/{{pascalCase name}}.tsx',
                templateFile: 'plop-templates/Component/Component.tsx.hbs',
            },
            {
                type: 'add',
                path: 'src/{{pascalCase name}}/{{pascalCase name}}.scss',
                templateFile: 'plop-templates/Component/Component.scss.hbs',
            },

            {
                // Adds an index.js file if it does not already exist
                type: 'add',
                path: 'src/index.tsx',
                templateFile: 'plop-templates/injectable-index.tsx.hbs',
                // If index.js already exists in this location, skip this action
                skipIfExists: true,
            },
            {
                // Action type 'append' injects a template into an existing file
                type: 'append',
                path: 'src/index.tsx',
                // Pattern tells plop where in the file to inject the template
                pattern: `/* PLOP_INJECT_IMPORT */`,
                template: `import {{pascalCase name}} from './{{pascalCase name}}/{{pascalCase name}}';`,
            },
            {
                type: 'append',
                path: 'src/index.tsx',
                pattern: `/* PLOP_INJECT_EXPORT */`,
                template: `{{pascalCase name}},`,
            },
        ],
    })
}