import { useMsFormTableContext } from './useMsFormTableContext';
import { useMsTableContext } from './useMsTableContext';

/**
 * MsTable 和 MsFormTable 组件下，选择器的挂载点不能是父元素
 */
function useFieldPopupContainer() {
  const formTableContext = useMsFormTableContext();
  const tableContext = useMsTableContext();

  function getPopupContainer(triggerNode: HTMLElement): HTMLElement {
    let popupElement;
    if (formTableContext.inContext) {
      popupElement = formTableContext.popupMountRef?.current;
    }

    if (tableContext.inContext) {
      popupElement = tableContext.popupMountRef?.current;
    }

    return popupElement ?? triggerNode.parentElement ?? document.body;
  }

  return { getPopupContainer };
}

export default useFieldPopupContainer;
