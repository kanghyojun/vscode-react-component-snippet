export const indexTs = (componentName: string): string => {
  return `import { default } from './${componentName}';`;
};

export const componentTs = (componentName: string): string => {
  return `import { ReactElement, memo } from 'react';

export interface ${componentName}Props {
  props?: unknown;
}

function ${componentName}(props: ${componentName}Props): ReactElement {
  return <div>hello world</div>;
}

export default memo(${componentName});
`;
};

export const componentStoriesTs = (componentName: string): string => {
  return `import { Meta, Story } from '@storybook/react/types-6-0';

  import ${componentName}, { ${componentName}Props } from './${componentName}';
  
  export default {
    title: 'components/${componentName}',
    component: ${componentName},
  } as Meta;
  
  const Template: Story<${componentName}Props> = (args) => {
    return <${componentName} {...args} />;
  };
  
  export const Plain = Template.bind({});
  Plain.args = {};
  `;
};

export const componentTestTs = (componentName: string): string => {
  return `import { render } from '@testing-library/react';

import ${componentName} from './${componentName}';

describe('<${componentName} />', () => {
  it('should render', () => {
    const { getByText } = render(<${componentName} />);

    expect(getByText('hello world')).toBeInTheDocument();
  });
});
`;
};
