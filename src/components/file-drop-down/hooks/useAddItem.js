const useAddItem = () => {
    function insertNode(tree, folderId, item, isFolder) {
        // Base condition
        if (tree.id === folderId && tree.isFolder) {
            tree.items.unshift({
                id: new Date(),
                name: item,
                isFolder,
                items: []
            });
            return tree;
        }

        return {
            ...tree,
            items: tree?.items?.map((it) => {
                return insertNode(it, folderId, item, isFolder);
            })
        };
    }

    return { insertNode };
};

export default useAddItem;