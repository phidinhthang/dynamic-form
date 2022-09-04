import React from 'react';
import {
  hideColumn as hideColumnAction,
  showColumn as showColumnAction,
  ShowOrHideColumnPayload,
} from './tableActions';
import { useTableContext } from './TableContext';

export const showOrHideColumnApi = (
  formId: string,
  body: ShowOrHideColumnPayload
): Promise<boolean> => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/form/${formId}/column/${body.columnId}/toggle-visibility`,
    {
      method: 'PATCH',
      body: JSON.stringify({ isHidden: body.isHidden }),
    }
  ).then((res) => {
    const data = res.json();

    if (res.status >= 400) {
      throw data;
    }
    return data;
  });
};

export const useShowOrHideColumn = (formId: string) => {
  const [, tableDispatch] = useTableContext();
  const [isLoading, setLoading] = React.useState(false);

  const showOrHideColumn = React.useCallback(
    (payload: ShowOrHideColumnPayload) => {
      console.log('payload ', payload);
      const showColumn = () =>
        tableDispatch(showColumnAction(payload.columnId));
      const hideColumn = () =>
        tableDispatch(hideColumnAction(payload.columnId));
      setLoading(true);
      if (payload.isHidden) {
        hideColumn();
      } else {
        showColumn();
      }

      showOrHideColumnApi(formId, payload)
        .then(() => {})
        .catch((err) => {
          console.log('error ', err);
          // reset column visibility when call api fail
          if (payload.isHidden) {
            showColumn();
          } else {
            hideColumn();
          }
        })
        .finally(() => setLoading(false));
    },
    [formId]
  );

  return [showOrHideColumn, { isLoading }] as const;
};
