import { WaitForFormData } from '../../../builder/components/WaitForFormData';
import { SettingPage as SettingPageInner } from '../../../builder/SettingPage';
import { FormProvider } from '../../../features/form/FormContext';

export default function SettingPage() {
  return (
    <FormProvider>
      <WaitForFormData>
        <SettingPageInner />
      </WaitForFormData>
    </FormProvider>
  );
}
