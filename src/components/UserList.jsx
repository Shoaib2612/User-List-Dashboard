"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/redux/UserSlice";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const UserList = () => {
    const dispatch = useDispatch();
    const { users, status } = useSelector((state) => state.users);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchUsers());
        }
    }, [dispatch, status]);

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center">
            
            <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
                User List Dashboard  
                <span className="block text-xl text-gray-600">
                    Using React.js, Tailwind CSS, ShadCN UI, and Redux Toolkit
                </span>
            </h1>

            <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-6 p-3 border border-gray-300 rounded-lg w-full max-w-md 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            />
            {status === "loading" ? (
                <div className="space-y-4 w-full max-w-3xl">
                    {[...Array(5)].map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-8 w-full rounded-lg bg-gray-300 animate-pulse"
                        />
                    ))}
                </div>
            ) : (
                <div className="overflow-x-auto w-full max-w-4xl">
                    <Table className="w-full border border-gray-200 bg-white shadow-lg rounded-lg">
                        <TableCaption className="text-gray-600">A list of users</TableCaption>
                        <TableHeader className="bg-yellow-100 text-gray-800">
                            <TableRow>
                                <TableHead className="p-4">Name</TableHead>
                                <TableHead>Username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Website</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Address</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id} className="hover:bg-gray-100">
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.username}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.website}</TableCell>
                                        <TableCell>{user.phone}</TableCell>
                                        <TableCell>{user.company.name}</TableCell>
                                        <TableCell>{user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</TableCell>

                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="6" className="text-center py-4 text-gray-500">
                                        No users found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default UserList;