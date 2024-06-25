/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Switch, Route } from "react-router-dom";
import { AnErrorOccurred } from "@strapi/helper-plugin";
import pluginId from "../../pluginId";
import HomePage from "../HomePage";
import CreateToken from "../CreateToken";
import { DesignSystemProvider, lightTheme } from "@strapi/design-system";

const App = () => {
  return (
    <DesignSystemProvider locale="en-GB" theme={lightTheme}>
      <div>
        <Switch>
          <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
          <Route
            path={`/plugins/${pluginId}/create-token`}
            component={CreateToken}
            exact
          />
          <Route component={AnErrorOccurred} />
        </Switch>
      </div>
    </DesignSystemProvider>
  );
};

export default App;
