import { useCallback, useEffect, useState } from 'camunda-modeler-plugin-helpers/react';

export default ({ subscribe }) => {
  const [ activeModeler, setActiveModeler ] = useState();
  const [ tabModelers, setTabModelers ] = useState([]);

  const initModeler = useCallback(({ modeler, tab }) => {
    setActiveModeler(modeler);
    setTabModelers(prevTabModeler => ({
      ...prevTabModeler,
      [tab.id]: modeler,
    }));
  }, []);

  useEffect(() => {
    subscribe('bpmn.modeler.created', ({ modeler, tab }) => {
      initModeler({ modeler, tab });
    });

    subscribe('dmn.modeler.created', ({ modeler, tab }) => {
      initModeler({ modeler, tab });
    });

    subscribe('app.activeTabChanged', tab => {
      const activeTabId = tab.activeTab.id;
      const activeTabModeler = tabModelers[activeTabId];
      if (activeTabModeler) {
        setActiveModeler(activeTabModeler);
      }
    });
  }, []);

  return [ activeModeler ];
};
