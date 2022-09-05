import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { ExactBuilderElement } from '../types';

interface EditBoxInspectorProps {
  element: ExactBuilderElement<'SHORT_TEXT'>;
}

export const EditBoxInspector = () => {
  return (
    <Tabs isFitted>
      <TabList>
        <Tab>General</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Text>not implemented yet.</Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
