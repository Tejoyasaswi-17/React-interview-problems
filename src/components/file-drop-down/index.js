import React, { useState } from 'react';
import folderStructure from './data/folderStructure';
import Folder from './components/Folder';
import styles from './styles.module.css';
import useAddItem from './hooks/useAddItem';

function FileDropDown() {
  const [fileMap, setFileMap] = useState(folderStructure);

  const { insertNode = () => { } } = useAddItem();

  const handleAddNode = (folderId, item, isFolder) => {
    const finalFileMap = insertNode(fileMap, folderId, item, isFolder);
    setFileMap(finalFileMap);
  };
  return (
    <div>
      <Folder
        fileMap={fileMap}
        handleAddNode={handleAddNode}
      />
    </div>
  );
};

export default FileDropDown;