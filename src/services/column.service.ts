import {columnObj, Columns} from "../data/columns";

export class ColumnService {
    getColumns() {
        return Columns;
    }

    getColumnByID(_id: string, columns: columnObj[]) {
        return columns.find(c => c.id === _id)
    }
}