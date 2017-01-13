import React, { PropTypes } from 'react';

const infoStyle = {
  borderStyle: 'solid',
  borderColor: 'black',
};

const divStyle = {
  textAlign: 'left',
  margin: '0 1em 0 1em',
}

const Info = ({ username, id, nodeVersion, appPath, dateAndTime }) => {
  const renderBackendDetails = () => (
    <div>
      <h2>Backend Details</h2>
      <p><b>Node Version:</b> {nodeVersion}</p>
      <p><b>Path of App:</b> {appPath}</p>
      <p><b>Date and Time:</b> {dateAndTime}</p>
    </div>
  );

  return (
    <div style={infoStyle}>
      <div style={divStyle}>
        <h2>User Info</h2>
        <p><b>Username:</b> {username}</p>
        <p><b>ID:</b> {id}</p>
        {nodeVersion && renderBackendDetails()}
      </div>
    </div>
  );
};

Info.propTypes = {
  username: PropTypes.string,
  id: PropTypes.string,
  nodeVersion: PropTypes.string,
  appPath: PropTypes.string,
  dateAndTime: PropTypes.string,
};

export default Info;
