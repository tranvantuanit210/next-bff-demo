"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/atoms/button";
import { Checkbox } from "@/components/atoms/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/molecules/dropdown-menu";
import { Input } from "@/components/atoms/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/molecules/table";
import { User } from "@/types/user.type";
import { MouseEvent, useState } from "react";
import UserDialog from "./user-dialog";
import UserDialogConfirm from "./user-dialog-confirm";
import { clientToken } from "@/utils/http";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row }) => <div>{row.getValue("firstName")}</div>,
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => <div>{row.getValue("lastName")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => <div>{row.getValue("isActive") ? "Active" : "Unactive"}</div>,
  },
];

export function UserList({ data }: { data: User[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [openDialogUser, setOpenDialogUser] = useState<boolean>(false);
  const [openDialogUserConfirm, setOpenDialogUserConfirm] = useState<boolean>(false);
  const [userSelected, setUserSelected] = useState<User | undefined>(undefined);
  const router = useRouter();

  const handleMutationUser = (event: MouseEvent<HTMLElement, globalThis.MouseEvent>, user?: User) => {
    event.stopPropagation();
    if (user) {
      setUserSelected(user);
    } else {
      setUserSelected(undefined);
    }
    setOpenDialogUser(true);
  };

  const handleDeleteUser = (event: MouseEvent<HTMLElement, globalThis.MouseEvent>, user: User) => {
    event.stopPropagation();
    if (user) {
      setUserSelected(user);
    } else {
      setUserSelected(undefined);
    }
    setOpenDialogUserConfirm(true);
  };

  const newColumns: ColumnDef<User>[] = [...columns];
  newColumns.push({
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <ul className="flex items-center gap-4 justify-end">
          <li className="cursor-pointer" onClick={(event) => handleMutationUser(event, row.original)}>
            <Pencil />
          </li>
          <li className="cursor-pointer" onClick={(event) => handleDeleteUser(event, row.original)}>
            <Trash2 />
          </li>
        </ul>
      );
    },
  });

  const table = useReactTable({
    data,
    columns: newColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleSeenDetails = (id: string) => {
    router.push(`/users/${id}`);
  };

  return (
    <div className="w-full">
      <UserDialog open={openDialogUser} setOpen={setOpenDialogUser} user={userSelected} />
      <UserDialogConfirm open={openDialogUserConfirm} setOpen={setOpenDialogUserConfirm} userId={userSelected?.id as string} />
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />

        <div className="flex gap-4 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={(event) => handleMutationUser(event)}>Create</Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="last:text-right">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} onClick={() => handleSeenDetails(row.original.id)}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={newColumns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
