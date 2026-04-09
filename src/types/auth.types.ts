export interface User {
    id: string;
    email: string;
    name?: string;
    // TODO:Add other fields if needed (roles, type, etc.)
    type: 'ADMIN' | 'MANAGER' | 'EMPLOYEE' | null;
}
