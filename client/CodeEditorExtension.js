// eslint-disable-next-line no-unused-vars
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'camunda-modeler-plugin-helpers/react';

import JavaScriptCodeEditor from './components/JavaScriptCodeEditor';
import Modal from './components/Modal';
import useModeler from './hooks/useModeler';
import { OPEN_CODE_EDITOR, CLOSE_CODE_EDITOR } from './utils/events';

/**
 * The component props include everything the Application offers plugins,
 * which includes:
 * - config: save and retrieve information to the local configuration
 * - subscribe: hook into application events, like <tab.saved>, <app.activeTabChanged> ...
 * - triggerAction: execute editor actions, like <save>, <open-diagram> ...
 * - log: log information into the Log panel
 * - displayNotification: show notifications inside the application
 */
export default ({ subscribe }) => {
  const [ isCodeEditorOpen, setCodeEditorOpen ] = useState(false);
  const [ codeText, setCodeText ] = useState('');

  const [ modeler ] = useModeler({ subscribe });
  const eventBus = useMemo(() => {
    if (!modeler) {
      return null;
    }
    return modeler.get ? modeler.get('eventBus') : modeler._eventBus;
  }, [ modeler ]);

  useEffect(() => {
    if (eventBus) {
      eventBus.on(OPEN_CODE_EDITOR, (evt) => {
        if ('JavaScript' === evt.language) {
          evt.stopPropagation();
          setCodeText(evt.value);
          setCodeEditorOpen(true);
        }
      });
    }
  }, [ eventBus, setCodeEditorOpen, setCodeText ]);

  const handleEditorChange = useCallback(({ value }) => {
    setCodeText(value);
  }, [ setCodeText ]);

  const handleClose = useCallback(() => {
    setCodeEditorOpen(false);
    eventBus.fire(CLOSE_CODE_EDITOR, {
      value: codeText,
    });
  }, [ eventBus, codeText, setCodeEditorOpen ]);

  return <Fragment>
    {
      isCodeEditorOpen && (
        <Modal title="Code Editor" onClose={ handleClose }>
          <JavaScriptCodeEditor value={ codeText } onChange={ handleEditorChange } />
        </Modal>
      )
    }
  </Fragment>;
};
