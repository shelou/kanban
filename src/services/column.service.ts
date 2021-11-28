import {columnObj, Columns} from "../data/columns";

export class ColumnService {
    getColumns() {
        return Columns;
    }

    getColumnByID(_id: string, columns: columnObj[]) {
        if (_id === "column_1")
            console.log("bi aleb l service",columns)
        return columns.find(c => c.id === _id)
    }
}