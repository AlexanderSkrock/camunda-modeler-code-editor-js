// eslint-disable-next-line no-unused-vars
import React from 'camunda-modeler-plugin-helpers/react';

import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-searchbox';

export default ({ value, onChange }) => (
  <AceEditor
    name="java-script-code-editor"
    mode="javascript"
    theme="github"
    value={ value }
    onChange={ onChange }
  />
);