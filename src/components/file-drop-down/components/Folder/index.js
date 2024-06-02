import React, { useState } from 'react';
import styles from './styles.module.css';

function Folder({ fileMap = {}, handleAddNode = () => { } }) {

    const [showChildren, setShowChildren] = useState(false);
    const [showInputBox, setShowInputBox] = useState({
        visible: false,
        folder: true,
    });

    const handleAddItem = (event, addSrc) => {
        event.stopPropagation();
        setShowChildren(true);
        setShowInputBox({
            visible: true,
            folder: addSrc === 'folder' ? true : false,
        });
    };

    const addItemHandler = (event) => {
        if (event.keyCode === 13 && event.target.value) {
            handleAddNode(fileMap.id, event.target.value, showInputBox.folder);
            setShowInputBox((prev) => ({ ...prev, visible: false }));
        }
    };


    return (
        <div className={styles.container}>
            {fileMap.isFolder && <div className={styles.folder} onClick={() => setShowChildren((prev) => !prev)}>
                <span>📁 {fileMap.name}</span>

                <div>
                    <button onClick={(event) => handleAddItem(event, 'folder')}>Folder + </button>
                    <button onClick={(event) => handleAddItem(event, 'file')}>File + </button>
                </div>
            </div>}

            {!fileMap.isFolder && <div className={styles.file}>
                <span>📄 {fileMap.name}</span>
            </div>}

            <div className={styles.child_container}>
                {showInputBox.visible && (
                    <div className={styles.input_container}>
                        {showInputBox.folder ? "📁" : "📄"}
                        <input
                            type="text"
                            autoFocus
                            onKeyDown={addItemHandler}
                            onBlur={(prev) => setShowInputBox({ ...prev, visible: false })}
                            placeholder={`Enter ${showInputBox.folder ? "folder" : 'file'} name`}
                        />
                    </div>
                )}
                {showChildren &&
                    fileMap?.items?.map((file) => (
                        <div>
                            <Folder fileMap={file} handleAddNode={handleAddNode} key={file.id} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Folder;