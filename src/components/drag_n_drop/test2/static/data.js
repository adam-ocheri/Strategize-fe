export const initialData = {
    tasks: {
        "task-1": { id: "task-1", content: "aaaaaa" },
        "task-2": { id: "task-2", content: "bbbbbb" },
        "task-3": { id: "task-3", content: "cccccc" },
        "task-4": { id: "task-4", content: "dddddd" }
    },
    columns: {
        "column-1": {
            id: "column-1",
            title: "to do",
            taskIds: ["task-1", "task-2", "task-3"]
        },
        "column-2": {
            id: "column-2",
            title: "doing...",
            taskIds: ["task-4"]
        },
        "column-3": {
            id: "column-3",
            title: "done",
            taskIds: []
        }
    },
    columnOrder: ["column-1", "column-2", "column-3"]
};
