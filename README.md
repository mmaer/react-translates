# Welcome to react translate

## Instalation

Install with npm:
```npm
$ npm install react-translates --save
```

## Getting started

To make the translations available in `<Translate>` you have to wrap your main component with `<TranslationsProvider>`

```jsx
import { TranslationsProvider } from 'react-translates';

<TranslationsProvider translations={sampletranslations}>
    <Component />
</TranslationsProvider>
```

That's all, now you can using react-translates

## Components

To translate translations you just need to import Translate component from `react-translates`

```jsx
import Translate from 'react-translates';

{
     'hello-world': 'Hello World',
     'hello-world_plural': 'Hello Worlds',
     'hello-world_2': 'Hello two Worlds',
     variable: `Hello {variable}`,
     'multiple-variable': `Hello {variable1} and {variable2}`,
     'component-variable': `Hello {component}`
};

const Component = () => (<span>Component</span>);

const TranslateComponent = () => (
    <div>
        <Translate value="hello-world" />
        <Translate value="hello-world" count={3} />
        <Translate value="hello-world" count={2} />
        <Translate value="hello-world" count={1} />
        <Translate value="variable" variable="Variable" />
        <Translate value="multiple-variable" variable1="Variable1" variable2="Variable2" />
        <Translate value="component-variable" component={<Component />} />
    </div>
);
```

## Api

`value (string)`: The translation key to translate

`className (string)`: Optional CSS class name

`style (object)`: Optional inline styling

`count (number)`: Optional set number when translate should be plural. For example:

This code:

```jsx
{
    'hello-world': 'Hello World',
    'hello-world_plural': 'Hello Worlds',
    'hello-world_2': 'Hello two Worlds'
};

<div>
    <Translate value="hello-world" count={3} />
    <br />
    <Translate value="hello-world" count={2} />
    <br />
    <Translate value="hello-world" count={1} />
    <br />
    <Translate value="hello-world" count={1} />
</div>
```

will print:

```
Hello Worlds
Hello two Worlds
Hello World
Hello World
```

Other props (string, number or component): All other props will be used as replacements for the translation.
