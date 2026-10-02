'use client';
import {
    GridColDef,
    DataGrid,
    GridValidRowModel,
    DataGridProps,
} from '@mui/x-data-grid';
import styles from "./BaseGrid.module.css";

interface IBaseGrid<T extends GridValidRowModel> extends DataGridProps<T> {
    // Custom props goes here
}

export function BaseGrid<T extends GridValidRowModel>({
    columns,
    rows,
    getRowClassName,
    //dataSource,
    ...restProps
}: IBaseGrid<T>) {
    return (
        <DataGrid
            columns={columns}
            rows={rows}
            getRowClassName={getRowClassName}
            sx={{
                boxShadow: 1,
            }}
            //dataSource={dataSource}
            {...restProps}
        />
    );
}
