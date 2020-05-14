import React, { useState } from 'react';
import { emptyGlobalState, useApi } from '../../utils'

const PageLogin = () => {
    const [formData, setFormData] = useState(emptyGlobalState);
    const { updateGlobalState } = useApi();

    return (
      <div>
          <input
              type="text"
              value={formData.userHost}
              onChange={(e) => setFormData({ ...formData, userHost: e.target.value })}
          />
          <input
              type="text"
              value={formData.userUsername}
              onChange={(e) => setFormData({ ...formData, userUsername: e.target.value })}
          />
          <input
              type="password"
              value={formData.userPassword}
              onChange={(e) => setFormData({ ...formData, userPassword: e.target.value })}
          />
          {/*<input type="submit" value="submit"/>*/}
          <button onClick={() => updateGlobalState(formData)}>kek</button>
      </div>
    );
};

export default PageLogin;
